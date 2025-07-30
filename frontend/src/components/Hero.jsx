import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <>
            <section className='max-padd-container max-xl:mt-8 '>
                <div className='max-padd-container xl:bg-hero bg-cover bg-center bg-no-repeat h-[550px] w-full  mt-10'>
                    <div className='relative max-w-[777px] top-9'>
                        <h5 className='flex items-baseline gap-x-2 text-secondary bold-28 uppercase'>L'élégance moderne à votre portée</h5>
                        <h1 className='h1 capitalize max-w-[633px] '>Où le raffinement rencontre l'innovation, pour un style qui vous distingue</h1>
                        <p className='pl-2 max-w-lg  mb-8 border-l-4 border-l-primary'>Explorez notre collection exclusive où chaque pièce raconte une histoire de style et d'audace. Des créations soigneusement sélectionnées pour ceux qui osent se démarquer avec élégance.</p>
                        <div className='flex gap-2 sm:gap-6'>
                            <Link className='btn-dark max-sm:p-3'>Produits Populaires</Link>
                            <Link to={'/login'} className='btn-secondary max-sm:p-3'>Rejoignez notre communauté</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>)
}

export default Hero