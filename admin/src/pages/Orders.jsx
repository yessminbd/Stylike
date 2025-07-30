import { useState, useEffect } from 'react';
import axios from 'axios';
import { backend_url } from '../App';
import { toast } from 'react-toastify';
import { TfiPackage } from 'react-icons/tfi';

export default function Orders({ token }) {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        backend_url + '/api/order/list',
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(backend_url + '/api/order/status', { orderId, status: e.target.value }, { headers: { token } })
      if (response.data.success) {
        await fetchAllOrders()
        toast.success(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

  }

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="px-4 sm:px-8 sm:pt-14">
      <h4 className="h4 mb-6">Liste des commandes</h4>
      <div className="flex flex-col gap-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="p-4 rounded-lg border border-gray-200 bg-primaryLight shadow-lg hover:shadow-2xl"  >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1 ">
                <div className="flex items-center gap-2 mb-2 text-primary">
                  <TfiPackage className="text-xl text-tertiary" />
                  <span className="bold-15">N° Commande  #{order._id}</span>
                </div>
              </div>
              <hr className=" border-t border-gray-300  block md:hidden  lg:hidden" />
              <div className="flex-1 space-y-2 text-sm mt-4 lg:mt-0">
                {order.items.map((item, index) => (
                  <p key={index} className="medium-14 text-primary">
                    <span className="bold-15">Produit :</span> {item.name} x {item.quantity}<br />
                    Taille : <span>{item.size}</span>, Couleur : <span>{item.color}</span>
                  </p>
                ))}
                <p className="text-primary medium-14"><span className="bold-15">Paiement :</span> {order.paymentMethod === "COD" ? "Paiement à la livraison" : "Paiement en ligne"}</p>
                <p className="bold-15  text-primary">Total: {order.amount} TND </p>
              </div>
              <hr className=" border-t border-gray-300  block md:hidden  lg:hidden" />
              <div className="flex-1 space-y-2 text-sm mt-4 lg:mt-0">
                <p className="text-primary medium-14"><span className="bold-15">Nom :</span> {order.address.firstName} {order.address.lastName}</p>
                <p className="text-primary medium-14"><span className="bold-15">Adresse :</span> {order.address.zipcode}, {order.address.street}, {order.address.city}, Tunisie</p>
                <p className="text-primary medium-14"><span className="bold-15">Téléphone :</span> {order.address.phone}</p>
                <p className="text-primary medium-14"><span className="bold-15">Date :</span> {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <div className='flex flex-col gap-4'>
                <div></div>
                <select
                  onChange={(e) => statusHandler(e, order._id)}
                  value={order.status}
                  className="flex-1 mt-4 lg:mt-0 max-w-80 bg-primaryLight   py-2 text-gray-700 ring-slate-300 ring-1 px-2 rounded-sm outline-none h-9" >
                  <option value="En attente d'emballage">En attente d'emballage</option>
                  <option value="Emballée">Emballée</option>
                  <option value="Arrivée à l'entrepôt de transport">Arrivée à l'entrepôt de transport</option>
                  <option value="En chemin">En chemin</option>
                  <option value="Livrée">Livrée</option>
                  <option value="Annulée">Annulée</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}