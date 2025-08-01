import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { ShopContext } from '../context/ShopContext'
import { FaStar } from 'react-icons/fa'
import { BiHeart } from 'react-icons/bi'
import { FaStarHalfStroke, FaTruckFast } from 'react-icons/fa6'
import Footer from '../components/Footer'
import RelatedProducts from '../components/RelatedProducts'
import { TbShoppingBagPlus } from 'react-icons/tb'

const Product = () => {

  const { productId } = useParams()
  const { products, currency, addToCart } = useContext(ShopContext)
  const [product, setProduct] = useState(null)
  const [image, setImage] = useState("")
  const [size, setSize] = useState("")
  const [color, setColor] = useState("")

  const fetchProductData = () => {
    products.forEach((item) => {
      if (item._id === productId) {
        setProduct(item)
        if (item.image && item.image.length > 0) {
          setImage(item.image[0])
        }
        return null;
      }
    })
  }

  useEffect(() => {
    fetchProductData()
  }, [productId, products])

  return (
    <section>
      <div className="max-padd-container mt-8 xl:mt-6">
        {product ? (
          <div className="max-padd-container flex gap-12 flex-col xl:flex-row py-16 rounded-2xl">
            {/* image */}
            <div className="flex flex-1 gap-x-2 xl:flex-1">
              <div className="flexCenter flex-col  gap-[7px] flex-wrap">
                {product.image && Array.isArray(product.image) &&
                  product.image.map((item, index) => (
                    <img
                      onClick={() => setImage(item)}
                      src={item}
                      key={index}
                      alt="Product thumbnail"
                      className="max-h-44 rounded-lg cursor-pointer w-32"
                    />
                  ))}
              </div>
              <div className="max-h-[443px] w-[320px] flex">
                {image && (
                  <img
                    src={image}
                    alt="Selected product"
                    className="rounded-xl w-full h-auto object-cover"
                  />
                )}
              </div>
            </div>
            {/* product info */}
            <div className='flex-[1.5] rounded-2xl px-3'>
              <h3 className='h3  my-2'>{product.name}</h3>
              <div className='flex items-baseline gap-x-5'>
                <h3 className='h3'>
                  {product.price} {currency}  </h3>
                <div className="flex items-center gap-x-2 mb-2 text-primary text-sm">
                  <div className="flex gap-x-2 text-yellow-400 text-xl">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStarHalfStroke />
                  </div>
                  <span >(200)</span>
                </div>
              </div>
              <p>{product.description}</p>
              <div className="flex flex-col gap-4 mb-5 my-4" >
                <div className='flex gap-2'>
                  {[...product.sizes]
                    .sort((a, b) => {
                      const order = ["S", "M", "L", "XL", "XXL"]
                      return order.indexOf(a) - order.indexOf(b)
                    })
                    .map((item, i) => (
                      <button
                        onClick={() => setSize(item)}
                        key={i}
                        className={`px-4 py-2 border rounded font-bold ${size === item ? "bg-tertiary text-primary " : "bg-white"
                          }`}  >{item}
                      </button>
                    ))}
                </div>
              </div>
              <div className='flex gap-2 mb-5'>
                {product.colors && product.colors.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setColor(c)}
                    className={`px-4 py-2 border rounded font-bold ${color === c ? "bg-tertiary text-primary" : "bg-white"}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <div className='flex items-center gap-x-4'>
                <button onClick={() => addToCart(product._id, size, color)} className='btn-dark sm:w-1/2 lg:w-1/2  flexCenter gap-x-3 '>Ajouter au panier <TbShoppingBagPlus /></button>
                <button className='btn-light '><BiHeart size={15} /> </button>
              </div>
              <div className='flex items-center gap-x-2 mt-2'>
                <FaTruckFast className='text-lg' />
                <span className='medium-14'>Livraison gratuite à partir de 200 DT</span>
              </div>
              <hr className='my-4 w-2/3' />
              <div className='mt-2 flex flex-col gap-1'>
                <p>Pour un style qui vous distingue</p>
                <p>Profitez du paiement à la livraison</p>
                <p> Facilité de retour ou d’échange sous un délai de 48h</p>
              </div>
            </div>
          </div>

        ) : (
          <p className="text-center py-12">Chargement du produit...</p>
        )}
        {product && <RelatedProducts category={product.category} subCategory={product.subCategory} />
        }
      </div>
      <Footer />
    </section>
  )
}

export default Product
