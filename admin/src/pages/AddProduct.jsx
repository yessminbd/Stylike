import React, { useState } from 'react'
import upload_icon from '../assets/upload_icon.png'
import axios from 'axios'
import { backend_url } from '../App'
import { toast } from 'react-toastify'

export default function AddProduct({ token }) {

  const [loading, setLoading] = useState(false)
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("Hommes")
  const [subCategory, setSubCategory] = useState("Haut")
  const [popular, setPopular] = useState(false)
  const [sizes, setSizes] = useState([])
  const [colors, setColors] = useState([])

  const onSubmitHundler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('description', description)
      formData.append('price', price)
      formData.append('category', category)
      formData.append('subCategory', subCategory)
      formData.append('popular', popular)
      formData.append('sizes', JSON.stringify(sizes))
      formData.append('colors', JSON.stringify(colors))

      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      const response = await axios.post(backend_url + '/api/product/add', formData, { headers: { token } })

      if (response.data.success) {
        toast.success(response.data.message)
        setName("")
        setDescription("")
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice("")
        setCategory("Hommes")
        setSubCategory("Haut")
        setPopular(false)
        setSizes([])
        setColors([])
      }
      else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="loader-spinner"></div>
        </div>
      )}
      <form onSubmit={onSubmitHundler} className=' pl-8 sm:pt-14 bg-primaryLight'>
        <div className='flex flex-col gap-y-2 medium-15'>
          <h5 className='h5'>Ajouter une image</h5>
          <div className='flex gap-2 py-3'>
            <label htmlFor='image1' >
              <img
                src={image1 ? URL.createObjectURL(image1) : upload_icon}
                className='w-16 h-16 aspect-square object-cover ing-1 ring-slate-300   outline-none cursor-pointer'
              />
              <input type='file' onChange={(e) => setImage1(e.target.files[0])}
                name="image" id='image1' hidden />
            </label>
            <label htmlFor='image2' >
              <img
                src={image2 ? URL.createObjectURL(image2) : upload_icon}
                className='w-16 h-16 aspect-square object-cover ing-1 ring-slate-300   outline-none  cursor-pointer'
              />
              <input type='file' onChange={(e) => setImage2(e.target.files[0])}
                name="image" id='image2' hidden />
            </label>
            <label htmlFor='image3' >
              <img
                src={image3 ? URL.createObjectURL(image3) : upload_icon}
                className='w-16 h-16 aspect-square object-cover ing-1 ring-slate-300   outline-none  cursor-pointer'
              />
              <input type='file' onChange={(e) => setImage3(e.target.files[0])}
                name="image" id='image3' hidden />
            </label>
            <label htmlFor='image4' >
              <img
                src={image4 ? URL.createObjectURL(image4) : upload_icon}
                className='w-16 h-16 aspect-square object-cover ing-1 ring-slate-300   outline-none  cursor-pointer'
              />
              <input type='file' onChange={(e) => setImage4(e.target.files[0])}
                name="image" id='image4' hidden />
            </label>
          </div>
          <div className='py-3'>
            <h5 className='h5'>Nom du produit</h5>
            <input type='text'
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder='Écrivez ici '
              className='ring-1 ring-slate-300 p-1 pl-2  rounded-sm  outline-none  bg-white  h-9 mt-1 w-[333px] sm:w-full'
            />
          </div>
          <div >
            <h5 className='h5 pb-2'>Description du produit</h5>
            <textarea type='text'
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder='Écrivez ici '
              rows={3}
              className='ring-1 ring-slate-300 p-1 pl-2  rounded-sm  outline-none  bg-white  mt-1 w-[333px] sm:w-full'
            />
          </div>
          <div className=''>
            <div className=' flex flex-col sm:flex-row gap-4'>
              <div className='flex flex-row gap-4 '>
                <div>
                  <h5 className='h5 pb-1'>Catégorie</h5>
                  <select className='m py-2 text-gray-30 ring-slate-300 ring-1 p-1 pl-2  rounded-sm  outline-none  bg-white  h-9 ' onChange={(e) => setCategory(e.target.value)}>
                    <option value="Hommes">Hommes</option>
                    <option value="Femmes">Femmes</option>
                    <option value="Enfants">Enfants</option>
                  </select>
                </div>
                <div>
                  <h5 className='h5 pb-1'>Types</h5>
                  <select className='max-w-auto py-2 text-gray-30 ring-slate-300 ring-1 p-1 pl-2  rounded-sm  outline-none  bg-white  h-9 ' onChange={(e) => setSubCategory(e.target.value)}>
                    <option value="Haut">Haut</option>
                    <option value="Bas">Bas</option>
                    <option value="Chaussures">Chaussures</option>
                    <option value="Combinaisons">Combinaisons</option>
                    <option value="Accessoires">Accessoires</option>
                  </select>
                </div>
              </div>
              <div className=''>
                <h5 className='h5'>Prix</h5>
                <div className='flex'>
                  <input required onChange={(e) => setPrice(e.target.value)} value={price} type="text"
                    placeholder='0.000'
                    className='ring-1 ring-slate-300 p-1 pl-2  rounded-sm  outline-none  bg-white  h-9 mt-1 w-[299px] sm:w-full' />
                  <input readOnly type='text' value={"TND"} className='ring-1 ring-slate-300 p-1 pl-2  rounded-r-sm  outline-none  bg-white  h-9 mt-1 w-[40px] ' />
                </div>
              </div>
            </div>
            <div className='flex items-center gap-10 mt-7 '>
              <h5 className='h5'>Tailles</h5>
              <div className='flex '>
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <div
                    key={size}
                    onClick={() =>
                      setSizes((prev) =>
                        prev.includes(size)
                          ? prev.filter((s) => s !== size)
                          : [...prev, size]
                      )}
                    className={`w-10 h-10 flex justify-center items-center rounded border text-sm font-medium mr-4 cursor-pointer 
                  ${sizes.includes(size) ? "bg-tertiary text-primary bold-15 " : "bg-gray-200 text-primary bold-15"}`}
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>
            <div className='flex flex-wrap items-center gap-4 mt-8 '>
              <h5 className='h5'>Couleurs</h5>
              {["Noir", "Gris", "Blanc", "Bleu", "Marron", "Rose", "Beige"].map((color) => (
                <div
                  key={color}
                  onClick={() =>
                    setColors((prev) =>
                      prev.includes(color)
                        ? prev.filter((c) => c !== color)
                        : [...prev, color])}
                  className={`w-12 h-10 flex justify-center items-center rounded  text-sm  mr-2 cursor-pointer px-8
                  ${colors.includes(color) ? "bg-tertiary text-primary bold-15   " : "bg-gray-200   text-primary bold-15"}`}
                >{color} </div>
              ))}
            </div>
          </div>
          <div className='flexStart gap-3 my-4'>
            <input type="checkbox" onChange={() => setPopular(prev => !prev)} style={{ accentColor: "#E8B4B8" }} />
            <label htmlFor="popular" className='cursor-pointer bold-15'>Marquer comme populaire</label>
          </div>
          <button type='submit' className='btn-dark mt-3 max-w-80 sm:w-full bold-15  '>Enregistrer le produit </button>
        </div>
      </form >
    </>

  )
}
