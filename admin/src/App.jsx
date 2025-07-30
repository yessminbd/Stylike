import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import AddProduct from "./pages/AddProduct"
import ListProducts from "./pages/ListProducts"
import Orders from "./pages/Orders"
import Login from "./components/Login"
import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const backend_url = import.meta.env.VITE_BACKEND_URL


function App() {
  const [token, setToken] = useState(localStorage.getItem('token') ?
    localStorage.getItem('token') : ''
  )
  // Mettre à jour la valeur du token dans le localStorage.
  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])
  return (
    <main>
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <div className=" bg-primaryLight text-primary">
          <Header />
          <div className="mx-auto max-w-[1440px] flex flex-col sm:flex-row mt-8 sm:mt-4">
            <Sidebar token={token} setToken={setToken} />
            <Routes>
              <Route path="/" element={<AddProduct token={token} />} />
              <Route path="/list" element={<ListProducts token={token} />} />
              <Route path="/orders" element={<Orders token={token} />} />
            </Routes>
          </div>
        </div>
      )}
    </main>
  )
}

export default App
