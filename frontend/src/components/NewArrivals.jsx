import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Item from './Item';
import Title from './Title';

const NewArrivals = () => {
    const [newArrivals, setNewArrivals] = useState([]);
    const { products } = useContext(ShopContext);

    useEffect(() => {
        const data = products.slice(0, 12);
        setNewArrivals(data);
    }, [products]
    )
    return (
        <section className='max-padd-container py-16 '>
            <Title title={'Nouveautés'} titlesStyles={"text-center"} />
            <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8'>
                {newArrivals.map((product) => (
                    <div key={product._id}>
                        <Item product={product} />
                    </div>   
                ))}
            </div>
        </section>
    )
}

export default NewArrivals
