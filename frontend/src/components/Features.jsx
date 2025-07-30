import React from 'react'
import Title from './Title'
import { TbArrowBackUp, TbPercentage, TbTruckDelivery } from 'react-icons/tb'
import { VscPercentage } from 'react-icons/vsc'

const Features = () => {
  return (
    <section className='max-padd-container py-16'>
      <Title title={"Nos atouts"} titlesStyles={"text-center"} />
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 bg-primaryLight rounded-full'>
        <div className='p-4 rounded-3xl'>
          <TbTruckDelivery className='bold-32 mb-3 text-blue-700' />
          <h4 className='h4 capitalize'>Livraison rapide</h4>
          <p>Profitez d’une livraison rapide en 24h pour recevoir vos articles sans attendre.</p>
        </div>
        <div className='p-4 rounded-3xl'>
          <VscPercentage className='bold-32 mb-3 text-red-600' />
          <h4 className='h4 capitalize'>Livraison Offerte dès 200DT</h4>
          <p>Profitez de la livraison gratuite pour toute commande supérieure à 200DT !</p>
        </div>
         <div className='p-4 rounded-3xl'>
          <TbArrowBackUp className='bold-32 mb-3 text-yellow-400' />
          <h4 className='h4 capitalize'>Retours acceptés</h4>
          <p>Si l’article ne vous convient pas, vous pouvez le retourner facilement sous 2 jours.</p>
        </div>
      </div>
    </section>
  )
}

export default Features
