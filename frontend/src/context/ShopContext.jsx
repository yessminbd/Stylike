import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import axios from "axios"

export const ShopContext = createContext()

const ShopContextProvider = (props) => {

    const backend_url = import.meta.env.VITE_BACKEND_URL
    const [token, setToken] = useState("")
    const currency = 'DT ';
    const delivery_charges = 7;
    const navigate = useNavigate();
    const [search, setSearch] = useState("")
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const [products, setProducts] = useState([])

    //Ajouter au panier
    const addToCart = async (itemId, size, color = "") => {
        const product = products.find(p => p._id === itemId);

        if (!product) {
            toast.error("Produit introuvable");
            return;
        }

        if (product.sizes && product.sizes.length > 0 && !size) {
            toast.error("Veuillez choisir une taille");
            return;
        }

        if (product.colors && product.colors.length > 0 && !color) {
            toast.error("Veuillez choisir une couleur");
            return;
        }

        let cartData = structuredClone(cartItems);

        if (!cartData[itemId]) cartData[itemId] = {};
        if (!cartData[itemId][size]) cartData[itemId][size] = {};

        cartData[itemId][size][color] = (cartData[itemId][size][color] || 0) + 1;

        setCartItems(cartData);
        if (token) {
            try {
                await axios.post(backend_url + '/api/cart/add', { itemId, size, color }, { headers: { token } })

            } catch (error) {
                console.log(error)
                toast.error(error.message)

            }
        }
    };


    const getCartCount = () => {
        let totalCount = 0;
        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
                for (const color in cartItems[itemId][size]) {
                    const qty = cartItems[itemId][size][color];
                    if (qty > 0) {
                        totalCount += qty;
                    }
                }
            }
        }
        return totalCount;
    };

    const updateQuantity = async (itemId, size, color = "", quantity) => {
        let cartData = structuredClone(cartItems);

        if (cartData[itemId] && cartData[itemId][size] && cartData[itemId][size][color] !== undefined) {
            cartData[itemId][size][color] = quantity;
            setCartItems(cartData);
        }
        if (token) {
            try {
                await axios.post(backend_url + '/api/cart/update', { itemId, size, color, quantity }, { headers: { token } })
            } catch (error) {
                console.log(error)
                toast.error(error.message)

            }
        }
    };

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backend_url + '/api/cart/get', {}, { headers: { token } })
            if (response.data.success) {
                setCartItems(response.data.cartData)
            } else {
                axios.error(response.error.message)
            }
        } catch (error) {

        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            let itemInfo = products.find((product) => product._id === itemId);
            if (!itemInfo) continue;
            for (const size in cartItems[itemId]) {
                for (const color in cartItems[itemId][size]) {
                    const qty = cartItems[itemId][size][color];
                    if (qty > 0) {
                        totalAmount += itemInfo.price * qty;
                    }
                }
            }
        }
        return parseFloat(totalAmount.toFixed(2));
    };

    const getProductsData = async () => {
        try {
            const response = await axios.get(backend_url + '/api/product/list')
            if (response.data.success) {
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.message)

        }
    }

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
        getProductsData();
    }, []);

    const contextValue = { products, currency, delivery_charges, search, setSearch, showSearch, setShowSearch, addToCart, getCartCount, cartItems, setCartItems, updateQuantity, getCartAmount, navigate, backend_url, setToken, token }

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;