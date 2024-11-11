import React from "react";
import { Route, Routes } from "react-router-dom";
import Signin from "./auth/users/Signin";
import Home from "./pages/Home";
import Signup from "./auth/users/Signup";
import BusinessForm from "./auth/business/BusinessForm";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductPage from "./pages/ProductPage";
import BusinessPage from "./pages/BusinessPage";
import CategoryPage from "./pages/CategoryPage";
import ProductForm from "./auth/business/ProductForm";
import BusinessCategoryPage from "./pages/BusinessCategoryPage";
import Cart from "./pages/Cart";
import Dashboard from "./auth/admin/Dashboard";
import AdminPage from "./auth/admin/AdminPage";
import Products from "./pages/Products";
import BusinessDashboard from "./components/BusinessDashboard";
import BusinessMain from "./auth/business/BusinessMain";
import PaymentPage from "./pages/PaymentPage";

export default function Router() {
  return (
    <Routes>
      {/* נתיבים בסיסיים: */}
      <Route path="/" element={<Home />} />
      <Route path="users/sign-in" element={<Signin />} />
      <Route path="users/form/:id" element={<Signup />} />

      <Route path="/payment-page" element={<PaymentPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/cart" element={<Cart />} />
      {/* <Route path="/see-more" element={<Products />} /> */}

      {/* נתיבי עסק: */}
      <Route path="/business/form/:businessId" element={<BusinessForm />} />
      <Route path="/business/:businessId" element={<BusinessPage />} />
      <Route path="/business/:businessId/Main" element={<BusinessMain />} />
      <Route
        path="/business/:businessId/Dashboard"
        element={<BusinessDashboard />}
      />
      <Route
        path="/business/:businessId/category/:category"
        element={<BusinessCategoryPage />}
      />

      <Route path="/products/form/:productId" element={<ProductForm />} />
      {/* <Route
        path="/business/:businessId/product/:productId"
        element={<ProductForm />}
      /> */}
      {/* <Route path="/business/create-business" element={<CreateBusiness />} /> */}
      {/* <Route path="/products/:category" element={<CategoryProducts />} /> */}
      {/* נתיבי קטגוריות: */}
      <Route path="/categories/:category" element={<CategoryPage />} />
      <Route path="/categories/:category/:subcategory" element={<Products />} />

      {/* נתיב מוצר פרטני: */}
      <Route path="/product/:productId" element={<ProductPage />} />
    </Routes>
  );
}
