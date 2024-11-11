import { app } from "../../app.mjs";
import { adminGuard, authGuard, getUser, guard } from "../../guard.mjs";
import { User } from "./users.model.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserLogin, UserSignup } from "./users.joi.mjs";
import { Product } from "../products/products.model.mjs";

// register user
app.post("/users", async (req, res) => {
  const {
    name,
    phone,
    email,
    password,
    businessName,
    isBusiness,
    image = {},
    address = {},
  } = req.body;

  const { url, alt } = image;
  const { postcode, street, optionalText, city, country } = address;

  // const validate = UserSignup.validate(req.body, { allowUnknown: true });

  const validate = UserSignup.validate(req.body, {
    context: { isNewUser: true },
    allowUnknown: true,
  });

  if (validate.error) {
    return res.status(403).send(validate.error.details[0].message);
  }

  if (await User.findOne({ email })) {
    return res.status(409).send("Email already exists");
  }

  const user = new User({
    name,
    phone,
    email,
    password: await bcrypt.hash(password, 10),
    businessName,
    address: {
      postcode,
      street,
      optionalText,
      city,
      country,
    },
    image: {
      url,
      alt,
    },
    isBusiness,
  });
  const newUser = await user.save();
  res.send(newUser);
});

// login
app.post("/users/login", async (req, res) => {
  const { email, password } = req.body;
  const validate = UserLogin.validate({ email, password });

  if (validate.error) {
    return res.status(403).send(validate.error.details[0].message);
  }

  const user = await User.findOne({ email, isDeleted: { $ne: true } });
  if (!user) return res.status(404).send("Invalid email or password");
  if (!user.password || !(await bcrypt.compare(password, user.password)))
    return res.status(404).send("Invalid email or password");

  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      businessName: user.businessName,
      isBusiness: user.isBusiness,
      isAdmin: user.isAdmin,
      iat: new Date().getTime() / 1000,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.send(token);
});

// Get all users
app.get("/users", guard, adminGuard, async (req, res) => {
  res.send(await User.find({ isDeleted: { $ne: true } }));
});

// Get user
app.get("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    // שליפת פרטי העסק
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // שליפת המוצרים של העסק
    const products = await Product.find({ user_id: user._id });

    res.json({ user, products });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Edit user
app.put("/users/:id", guard, async (req, res) => {
  const userId = req.params.id;
  const {
    name,
    phone,
    email,
    businessName,
    isBusiness,
    image,
    address,
    oldPassword,
    newPassword,
  } = req.body;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).send("User not found");
  }

  const currentUser = getUser(req);

  if (user._id.equals(currentUser._id) || currentUser.isAdmin) {
    const validate = UserSignup.validate(req.body, {
      context: { isNewUser: false },
      allowUnknown: true,
    });

    if (validate.error) {
      return res.status(403).send(validate.error.details[0].message);
    }

    if (email !== undefined && email !== user.email) {
      if (await User.findOne({ email })) {
        return res.status(403).send("Email already exists");
      }
    }

    try {
      // עדכון פרטי המשתמש
      if (name !== undefined) user.name = name;
      if (phone !== undefined) user.phone = phone;
      if (email !== undefined) user.email = email;
      if (businessName !== undefined) user.businessName = businessName;
      if (isBusiness !== undefined) user.isBusiness = isBusiness;

      // עדכון כתובת אם היא קיימת בבקשה
      if (address) {
        user.address = {
          postcode: address.postcode || user.address.postcode,
          street: address.street || user.address.street,
          optionalText: address.optionalText || user.address.optionalText,
          city: address.city || user.address.city,
          country: address.country || user.address.country,
        };
      }

      // עדכון תמונה אם היא קיימת בבקשה
      if (image) {
        user.image = {
          url: image.url || user.image.url,
          alt: image.alt || user.image.alt,
        };
      }

      // עדכון סיסמה אם oldPassword ו-newPassword קיימים
      if (oldPassword && newPassword) {
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) return res.status(400).send("Incorrect old password");

        user.password = await bcrypt.hash(newPassword, 10);
      }

      await user.save();
      res.send(user);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).send("Failed to update user");
    }
  } else {
    res.status(401).send("User is not authorized");
  }
});

// Check-old-password
app.post("/users/:id/check-old-password", async (req, res) => {
  const userId = req.params.id;
  const { oldPassword } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    res.send({ isValid: isMatch }); // מחזירים true/false
  } catch (error) {
    console.error("Error checking old password:", error);
    res.status(500).send("Failed to check old password");
  }
});

app.patch("/users/:id", guard, async (req, res) => {
  try {
    const userId = req.params.id;
    const { address } = req.body;
    const user = await User.findById(userId);
    const currentUser = getUser(req);

    if (!user) {
      return res.status(403).send({ message: "User not found" });
    }

    if (user._id.equals(currentUser._id) || currentUser.isAdmin) {
      if (address) {
        user.address = {
          postcode: address.postcode || user.address.postcode,
          street: address.street || user.address.street,
          optionalText: address.optionalText || user.address.optionalText,
          city: address.city || user.address.city,
          country: address.country || user.address.country,
        };
      }
      await user.save();
      res.send(user);
    } else {
      res.status(401).send("User is not authorized");
    }
  } catch (error) {
    console.error("Error updating user address:", error);
    res.status(500).send("Failed to update user address");
  }
});

// Delete user
app.delete("/users/:id", guard, async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  if (getUser(req).isAdmin || user._id == getUser(req)._id) {
    await User.findByIdAndUpdate(userId, { isDeleted: true });
    res.send({ message: "User deleted successfully" });
    res.end();
  } else {
    res.status(401).send("User is not authorized");
  }
});
