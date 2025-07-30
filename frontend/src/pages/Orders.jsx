import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Footer from '../components/Footer'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

const Orders = () => {
  const { currency, backend_url, token } = useContext(ShopContext)
  const [orderData, setOrderData] = useState([])

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(backend_url + '/api/order/user-orders', {}, { headers: { token } });
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['date'] = order.date;
            item['paymentMethod'] = order.paymentMethod;
            item['amount'] = order.amount;

            allOrdersItem.push(item);
          });
        });

        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    loadOrderData()
  }, [token])

  return (
    <section >
      <div className='max-padd-container pb-72'>
        <div className='max-padd-container py-10 rounded-xl my-6 max-xl:mt-8'>
          <div className=''>
            <h3 className='h3'>Liste des <span className='text-secondary'>Commandes</span></h3>
          </div>
          {orderData.map((item, i) => (
            <div key={i}>
              <div className='py-4  flex-col gap-4'>
                <div className='flex gap-x-3 w-full'>
                  <div className='flex gap-6'>
                    <img src={item.image[0]} className='w-[77px] rounded-lg' />
                  </div>
                  <div className='block w-full'>
                    <h5 className='h5 capitalize line-clamp-1 text-secondary'>{item.name}</h5>
                    <div className='flexBetween '>
                      <div>
                        <div className='flex items-center gap-x-2 sm:gap-x-3'>
                          <div className='flexCenter gap-x-2 '>
                            <h5 className='bold-14 '>Total</h5>
                            <p className=' font-semibold text-[13px]'>{item.amount} {currency}</p>
                          </div>
                          <div className='flexCenter gap-x-2'>
                            <h5 className='bold-15'>Quantité</h5>
                            <p className='font-semibold text-[13px]'>{item.quantity} </p>
                          </div>
                          {item.size ? <div className='flexCenter gap-x-2'>
                            <h5 className='bold-14'>Taille</h5>
                            <p className='font-semibold text-[13px]'>{item.size}</p>                         </div>
                            : ""}
                        </div>
                        <div className='flex items-center gap-x-2'>
                          <h5 className='bold-14'>Date :</h5>
                          <p className='font-semibold text-[13px]'>{new Date(item.date).toDateString()}</p>
                        </div>
                        <div>
                          <p className=' font-semibold text-[13px]'>{item.paymentMethod === "COD" ? "Paiement à la livraison" : "Paiement en ligne"} </p>
                        </div>
                      </div>
                      <div className='flex flex-col xl:flex-row gap-4'>
                        <div className='flex items-center gap-2'>
                          <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                          <p className='bold-14 text-[13px] '>{item.status}</p>
                        </div>
                        <button onClick={loadOrderData} className='btn-dark p-1.5 text-sm w-48'>Suivre</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr className='mx-auto h-[1px] w-4/5 bg-gray-900 mt-2' />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </section>
  )
}

export default Orders
