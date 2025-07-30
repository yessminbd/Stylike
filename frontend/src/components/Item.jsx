import React from 'react'
import { Link } from 'react-router'

const Item = ({ product }) => {
    return (
        <div className='ring-1 ring-slate-900/5 bg-primaryLight overflow-hidden shadow-sm'>
            <Link to={`/product/${product._id}`} className='flexCenter relative'>
                <img src={product.image[0]} alt='productImg' className='h-80 w-full object-cover' />
            </Link>
            <div className='p-3'>
                <h4 className='h4 line-clamp-1 my-0'>{product.name}</h4>
                <div className='flexBetween pt-1'>
                    <p className='font-bold'>{product.category}</p>
                    <h5 className='h5 text-secondary pr-2'>{product.price} DT</h5>
                </div>
                <p className='line-clamp-1 py-2'>{product.description}</p>
            </div>
        </div>
    )
}

export default Item