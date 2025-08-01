import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Footer from '../components/Footer'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

const Orders = () => {
  const { currency, backend_url, token } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backend_url + '/api/order/user-orders',
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
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
    loadOrderData();
  }, [token]);

  return (
    <section>
      <div className='max-padd-container pb-72'>
        <div className='max-padd-container py-10 rounded-xl my-6 max-xl:mt-8'>
          <div>
            <h3 className='h3'>Liste des <span className='text-secondary'>Commandes</span></h3>
          </div>
          {orderData.map((item, i) => (
            <div key={i} className='w-full'>
              <div className='py-4 flex flex-col gap-4'>
                <div className='flex flex-col sm:flex-row gap-4 sm:gap-x-6 w-full'>
                  <div className='flex justify-center sm:block'>
                    <img src={item.image[0]} alt={item.name} className='w-[77px] h-[77px] object-cover rounded-lg' />
                  </div>
                  <div className='w-full'>
                    <h5 className='h5 capitalize line-clamp-1 text-secondary'>{item.name}</h5>
                    <div className='flex flex-col gap-4 xl:flex-row xl:justify-between'>
                      <div className='space-y-2'>
                        <div className='flex flex-wrap items-center gap-x-4 gap-y-2'>
                          <div className='flex items-center gap-x-2'>
                            <h5 className='bold-14'>Total</h5>
                            <p className='font-semibold text-[13px]'>{item.amount} {currency}</p>
                          </div>
                          <div className='flex items-center gap-x-2'>
                            <h5 className='bold-14'>Quantité</h5>
                            <p className='font-semibold text-[13px]'>{item.quantity}</p>
                          </div>
                          {item.size && (
                            <div className='flex items-center gap-x-2'>
                              <h5 className='bold-14'>Taille</h5>
                              <p className='font-semibold text-[13px]'>{item.size}</p>
                            </div>
                          )}
                        </div>
                        <div className='flex items-center gap-x-2'>
                          <h5 className='bold-14'>Date :</h5>
                          <p className='font-semibold text-[13px]'>{new Date(item.date).toDateString()}</p>
                        </div>
                        <p className='font-semibold text-[13px]'>
                          {item.paymentMethod === "COD" ? "Paiement à la livraison" : "Paiement en ligne"}
                        </p>
                      </div>
                      <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-4 xl:mt-0'>
                        <div className='flex items-center gap-2'>
                          <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                          <p className='bold-14 text-[13px]'>{item.status}</p>
                        </div>
                        <button
                          onClick={loadOrderData}
                          className='btn-dark p-1.5 text-sm w-full sm:w-48'
                        >
                          Suivre
                        </button>
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
  );
};

export default Orders;
