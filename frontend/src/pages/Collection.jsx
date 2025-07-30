import React, { useContext, useEffect } from 'react'
import Title from '../components/Title'
import { useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Item from '../components/Item'
import ShowSearch from '../components/ShowSearch'

const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext)
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [type, setType] = useState("relevant")
  const [filteredProducts, setFilteredProducts] = useState([])

  const toggleFilter = (value, setState) => {
    setState((prev) => prev.includes(value) ?
      prev.filter((item) => item !== value) : [...prev, value]
    )
  }

  const applyFilters = () => {
    let filtered = [...products];
    if (search && showSearch) {
      filtered = filtered.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))
    }
    if (category.length) {
      filtered = filtered.filter((product) =>
        category.includes(product.category)
      )
    }
    if (subCategory.length) {
      filtered = filtered.filter((product) =>
        subCategory.includes(product.subCategory)
      )
    }
    return filtered
  }

  const applySorting = (productsList) => {
    switch (type) {
      case 'low':
        return productsList.sort((a, b) => a.price - b.price);
      case 'high':
        return productsList.sort((a, b) => b.price - a.price);
      default:
        return productsList;
    }
  }

  useEffect(() => {
    let filtered = applyFilters();
    let sorted = applySorting(filtered);
    setFilteredProducts(sorted);
  }, [category, subCategory, type, products, search, showSearch])

  return (
    <section className='max-padd-container'>
      <div className='flex flex-col sm:flex-row gap-8 mt-8 xl:mt-6'>
        {/* filter options */}
        <div className=' min-w-60 p-4 rounded-full'>
          {/* search box */}
          <ShowSearch />
          {/* category filter */}
          <div className='border border-primary ring-1 ring-primary pl-5 py-3 mt-6 rounded-xl'>
            <h5 className='h5 mb-4'>Catégories</h5>
            <div className='flex flex-col gap-2 text-[12px] font-light'>
              {["Hommes", "Femmes", "Enfants"].map((cat) => (
                <label key={cat} className='flex gap-2 medium-14 text-gray-30'>
                  <input onChange={(e) => toggleFilter(e.target.value, setCategory)} type='checkbox' value={cat} className='w-3' />
                  {cat}
                </label>
              ))}
            </div>
          </div>
          {/* type filter */}
          <div className='border border-primary ring-1 ring-primary pl-5 py-3 mt-6 rounded-xl'>
            <h5 className='h5 mb-4'>Types</h5>
            <div className='flex flex-col gap-2 text-[12px] font-light'>
              {["Haut", "Bas", "Chaussures", "Combinaisons", "Accessoires"].map((subCat) => (
                <label key={subCat} className='flex gap-2 medium-14 text-gray-30'>
                  <input onChange={(e) => toggleFilter(e.target.value, setSubCategory)} type='checkbox' value={subCat} className='w-3' />
                  {subCat}
                </label>
              ))}
            </div>
          </div>
          {/* Sort by  */}
          <select onChange={(e) => setType(e.target.value)} className='medium-14 h-8 bg-primaryLight w-full border border-primary ring-1 ring-primary text-[12px] text-gray-30 rounded-lg px-2 outline-none mt-6'>
            <option value="relevant" className='font-medium text-[12px]'>Trier par pertinence</option>
            <option value="low" className='font-medium text-[12px]'>Trier par prix croissant</option>
            <option value="high" className='font-medium text-[12px]'>Trier par prix décroissant</option>
          </select>
        </div>
        {/* right side */}
        <div className='p-4 mt-3'>
          <Title title={"Notre Collection"} />
          {/* product container */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-6'>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Item product={product} key={product._id} />
              ))
            ) : (
              <p>Aucun produit trouvé pour le filtre sélectionné</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Collection