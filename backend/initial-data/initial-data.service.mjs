import { Product } from "../handlers/products/products.model.mjs";
import { User } from "../handlers/users/users.model.mjs";
import { initialData as data } from "./initial-data.mjs";
import bcrypt from "bcrypt";

(async () => {
  const userAmount = await User.find().countDocuments();

  if (!userAmount) {
    const userIds = [];

    // יצירת משתמשים ושמירתם בבסיס נתונים
    for (const u of data.users) {
      const user = new User(u);
      user.password = await bcrypt.hash(user.password, 10);
      const savedUser = await user.save();

      if (savedUser.isBusiness) {
        userIds.push(savedUser);
      }
    }

    // חיבור בין המוצרים למשתמשים לפי businessName
    for (const p of data.products) {
      const businessUser = userIds.find(
        (user) => user.businessName === p.businessName
      );

      if (businessUser) {
        const product = new Product(p);
        product.user_id = businessUser._id; // קישור בין המוצר למשתמש לפי businessName
        await product.save();
      } else {
        console.warn(
          `לא נמצא משתמש עם businessName: ${p.businessName} עבור המוצר ${p.title}`
        );
      }
    }
  }
})();
