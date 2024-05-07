import {
  createHashRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";

import RootLayout from "../components/RootLayout";
import Home from "../pages/Home";
import About from "../components/About";
import Collections from "../components/Collections";
import ContactUs from "../components/ContactUs";
import Product from "../pages/Product";
import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import Payment from "../pages/Payment";
import Success from "../pages/Success";
import Error404 from "../pages/404";
const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="#about" element={<About />} />
      <Route path="#collections" element={<Collections />} />
      <Route path="product/:id" element={<Product />} />
      <Route path="#contact" element={<ContactUs />} />
      <Route path="cart" element={<Cart />} />
      <Route path="wishlist" element={<Wishlist />} />
      <Route path="payment" element={<Payment />} />
      <Route path="success" element={<Success />} />
      <Route path="*" element={<Error404 />} />
    </Route>,
  ),
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
