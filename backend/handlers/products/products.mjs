import mongoose from "mongoose";
import { app } from "../../app.mjs";
import { authGuard, getUser, guard } from "../../guard.mjs";
import { Product } from "./products.model.mjs";
import { ProductValid } from "./products.joi.mjs";
import { User } from "../users/users.model.mjs";

// All products
app.get("/products", async (req, res) => {
  const { category, subcategory } = req.query;

  try {
    const filters = { isDeleted: { $ne: true } };

    if (category) filters.category = category;
    if (subcategory) filters.subcategory = subcategory;

    const products = await Product.find(filters).lean();

    // Calculate the average rating for each product
    const productsWithAvgRating = products.map((product) => {
      const totalRatings = product.ratings.reduce(
        (sum, rating) => sum + rating.rating,
        0
      );

      const averageRating =
        product.ratings.length > 0 ? totalRatings / product.ratings.length : 0;
      return { ...product, averageRating };
    });

    // Sort products by average rating in descending order
    const sortedProducts = productsWithAvgRating.sort(
      (a, b) => b.averageRating - a.averageRating
    );

    res.json(sortedProducts);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get user products
app.get("/products/my-products", guard, async (req, res) => {
  const user = getUser(req);

  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (!mongoose.Types.ObjectId.isValid(user._id)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    // קבלת המוצרים של המשתמש
    const products = await Product.find({
      user_id: user._id,
      isDeleted: { $ne: true },
    });

    // קבלת פרטי העסק של המשתמש
    const business = await User.findById(user._id);

    // שליחת המידע במבנה אחיד
    res.json({ products, business });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get product
app.get("/products/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid product ID format" });
  }

  try {
    const product = await Product.findById(id).lean();
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add new product
app.post("/products", guard, authGuard, async (req, res) => {
  const user = getUser(req);
  const validate = ProductValid.validate(req.body, { allowUnknown: true });

  if (validate.error) {
    return res.status(403).send(validate.error.details[0].message);
  }

  const {
    title,
    content,
    price,
    quantity,
    category,
    subcategory,
    limitedTimeDeal,
    brand,
    brandName,
    voucher,
    voucherCode,
    discount,
    discountPercentage,
    promotionMessage,
    promotionMessageText,
    colors,
    size,
    sizes,
    weight,
    weightUnit,
    height,
    width,
    depth,
    tags,
  } = req.body;

  const { url, alt } = req.body.image || {};

  const product = new Product({
    title,
    content,
    image: {
      url,
      alt,
    },
    price,
    quantity,
    category,
    subcategory,
    limitedTimeDeal,
    brand,
    brandName,
    voucher,
    voucherCode,
    discount,
    discountPercentage,
    promotionMessage,
    promotionMessageText,
    tags,
    colors,
    size,
    sizes,
    weight,
    weightUnit,
    width,
    height,
    depth,
    user_id: getUser(req)?._id,
    businessName: user.businessName,
  });

  try {
    const newProduct = await product.save();
    // הוספת הקטגוריה למשתמש עסקי, תוך מניעת כפילויות
    await User.findByIdAndUpdate(
      user._id,
      {
        $addToSet: { categories: category }, // שימוש ב-$addToSet כדי למנוע כפילויות
      },
      { new: true }
    );

    res.status(201).send(newProduct);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Edit product
app.put("/products/:id", guard, async (req, res) => {
  const user = getUser(req);
  const productId = req.params.id;
  const item = req.body;

  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (
    getUser(req).isAdmin ||
    user._id.toString() === product.user_id.toString()
  ) {
    const validate = ProductValid.validate(req.body, { allowUnknown: true });

    if (validate.error) {
      return res.status(403).send(validate.error.details[0].message);
    }

    product.title = item.title || product.title;
    product.content = item.content || product.content;
    product.image.url = item.image.url || product.image.url;
    product.image.alt = item.image.alt || product.image.alt;
    product.price = item.price || product.price;
    product.quantity = item.quantity || product.quantity;
    product.category = item.category || product.category;
    product.subcategory = item.subcategory || product.subcategory;
    product.brandName = item.brandName;
    product.discountPercentage = item.discountPercentage;
    product.promotionMessageText = item.promotionMessageText;
    product.user_id = getUser(req)?._id || product.user_id;

    const updatedCard = await product.save();
    res.send(updatedCard);
  } else {
    res.status(401).json({ message: "Unauthorized to edit this product" });
  }
});

// Rate product
app.patch("/products/:id/rate", guard, async (req, res) => {
  const user = getUser(req);
  const userId = user._id;
  const userName = user.name;

  const { id } = req.params;
  const { rating, comment } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid product ID format" });
  }

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // בדיקה אם המשתמש כבר דירג את המוצר
    const existingRating = product.ratings.find(
      (rating) => rating.userId.toString() === userId.toString()
    );
    if (existingRating) {
      // אם המשתמש כבר דירג, נעדכן את הדירוג וההערה
      existingRating.rating = rating;
      existingRating.comment = comment;
    } else {
      // אם לא, נוסיף דירוג חדש
      product.ratings.push({ userId, user_name: userName, rating, comment });
    }

    // חישוב ממוצע דירוגים
    const totalRatings = product.ratings.length;
    const ratingSum = product.ratings.reduce((sum, r) => sum + r.rating, 0);
    product.averageRating = ratingSum / totalRatings;

    await product.save();
    res.json(product);
  } catch (err) {
    console.error("Error updating product rating:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add to cart
app.patch("/products/:id/cart", guard, async (req, res) => {
  const user = getUser(req);

  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid card ID");
  }

  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).send({ message: "Card not found" });
  }

  if (user._id && !product.carts.includes(user._id)) {
    product.carts.push(user._id);
  } else {
    product.carts = product.carts.filter(
      (id) => id.toString() !== user._id.toString()
    );
  }

  const updatedCard = await product.save();
  res.send(updatedCard);
});

// sales
app.patch("/products/:id/sales", guard, async (req, res) => {
  const user = getUser(req);
  const product = await Product.findById(req.params.id);
  console.log("User ID:", user._id);
  console.log("Product ID:", req.params.id);

  if (!product) {
    return res.status(404).send({ message: "Product not found" });
  }

  product.sales.push(user._id);

  product.salesCount = product.sales.length; // מעדכן את כמות המכירות לפי אורך המערך

  const updatedProduct = await product.save();
  res.send(updatedProduct);
});

// Business products
app.get("/products/business/:businessId", async (req, res) => {
  const { businessId } = req.params;

  try {
    // שליפת פרטי המשתמש/עסק לפי מזהה העסק
    const business = await User.findById(businessId);
    if (!business) {
      return res.status(404).json({ error: "Business not found" });
    }

    // שליפת המוצרים של העסק
    const products = await Product.find({
      user_id: business._id,
      isDeleted: { $ne: true },
    }).lean();

    // חישוב ממוצע דירוג לכל מוצר
    const productsWithAvgRating = products.map((product) => {
      const totalRatings = product.ratings.reduce(
        (sum, rating) => sum + rating.rating,
        0
      );

      const averageRating =
        product.ratings.length > 0 ? totalRatings / product.ratings.length : 0;
      return { ...product, averageRating };
    });

    res.json(productsWithAvgRating);
  } catch (err) {
    console.error("Error fetching products for business:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete product
app.delete("/products/:id", guard, async (req, res) => {
  const user = getUser(req);
  const productId = req.params.id;

  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  if (
    getUser(req).isAdmin ||
    user._id.toString() === product.user_id.toString()
  ) {
    await Product.findByIdAndUpdate(productId, { isDeleted: true });
    res.send({ message: "Product deleted successfully" });
    res.end();
  } else {
    res.status(401).send("User is not authorized");
  }
});
