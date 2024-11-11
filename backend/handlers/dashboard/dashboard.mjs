import { app } from "../../app.mjs";
import { guard } from "../../guard.mjs";
import { Product } from "../products/products.model.mjs";
import { User } from "../users/users.model.mjs";

// route for admin dashboard statistics
app.get("/admin/dashboard", async (req, res) => {
  try {
    // Check if the logged-in user is an admin
    // if (!req.user.isAdmin) {
    //   return res.status(403).send("Access denied. Admins only.");
    // }

    // Fetch the necessary data for the dashboard
    const totalUsers = await User.countDocuments({ isDeleted: { $ne: true } });
    const totalBusinesses = await User.countDocuments({
      isBusiness: true,
      isDeleted: { $ne: true },
    });
    const totalProducts = await Product.countDocuments();
    // const totalOrders = await Order.countDocuments();
    // const pendingOrders = await Order.countDocuments({ status: "pending" });
    // const completedOrders = await Order.countDocuments({ status: "completed" });
    // const totalSales = await Order.aggregate([
    //   { $match: { status: "completed" } },
    //   { $group: { _id: null, total: { $sum: "$totalPrice" } } },
    // ]);
    const newUsersToday = await User.countDocuments({
      createdAt: { $gte: new Date().setHours(0, 0, 0, 0) },
    });

    const lowStockProducts = await Product.find({ quantity: { $lt: 10 } });
    const popularProducts = await Product.find()
      .sort({ salesCount: -1 })
      .limit(5);
    // const abandonedCarts = await Cart.find({ completed: false });
    const users = await User.find({ isDeleted: { $ne: true } });
    const products = await Product.find({ isDeleted: { $ne: true } });
    // You can add more data as needed (e.g., orders, sales, etc.)

    // Return the statistics as JSON
    res.json({
      totalUsers,
      totalBusinesses,
      totalProducts,
      newUsersToday,
      lowStockProducts,
      popularProducts,
      users,
      products,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});
