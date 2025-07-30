import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const CartTotal = () => {
    const { currency, getCartAmount, delivery_charges } = useContext(ShopContext)
    const subtotal = getCartAmount()
    const deliveryFee = subtotal >= 200 ? 0 : delivery_charges
    const total = subtotal + deliveryFee

    return (
        <div className='w-full'>
            <div className='flexBetween pt-3'>
                <h4 className='h4'>Sous-total:</h4>
                <p className='bold-16 text-primary'>{subtotal} {currency}</p>
            </div>
            <hr className='mx-auto h-[1px] w-full bg-gray-900/10 my-1' />
            <div className='flexBetween pt-3'>
                <h4 className='h4'>Frais de livraison : </h4>
                <p className='bold-16 text-primary'>
                    {deliveryFee === 0 ? "Gratuit" : `${deliveryFee}.00 ${currency}`}
                </p>
            </div>
            <hr className='mx-auto h-[1px] w-full bg-gray-900/10 my-1' />
            <div className='flexBetween pt-3'>
                <h4 className='h4'>Montant total :</h4>
                <p className='bold-16 text-primary'>{total.toFixed(2)} {currency}</p>
            </div>
        </div>
    )
}

export default CartTotal
