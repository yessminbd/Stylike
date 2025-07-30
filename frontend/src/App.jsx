import Header from "./Components/Header";
import { Route, Router, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import PlaceOrder from "./pages/PlaceOrder";
import Verify from "./pages/Verify";
import About from "./pages/About";
import Product from "./pages/Product";
import { ToastContainer } from 'react-toastify';

export default function App() {

  return (
    <main className="overflow-hidden text-[#1B264F] bg-primaryLight">
      <ToastContainer/>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/product/:productId" element={<Product />} />
      </Routes>
    </main>
  )
}