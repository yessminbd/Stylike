import React, { useContext, useEffect, useState } from 'react'
import loginImg from "../assets/imgLog.jpg"
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'


const Login = () => {

  const [currState, setCurrState] = useState("Login")
  const { token, setToken, backend_url, navigate } = useContext(ShopContext)
  const [name, setName] = useState("")
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      if (currState === "signup") {
        const response = await axios.post(backend_url + '/api/user/register', { name, email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }
      } else {
        const response = await axios.post(backend_url + '/api/user/login', { email, password })
        console.log(response.data)
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <section className=' absolute top-0 left-0 h-full w-full z-50 bg-primaryLight '>
      <div className='flex h-full w-full'>
        <div className='flex w-full sm:w-1/2 items-center justify-center'>
          <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-md m-auto gap-y-5 text-gray-800' >
            <div className='w-full mb-4'>
              <h3 className='h3 bold-28 text-primary text-center'>{currState === 'signup' ? 'Créer un compte' : 'Connexion'}</h3>
            </div>
            {currState === "signup" && (
              <div className='w-full'>
                <label htmlFor='name' className='medium-15  text-primary'> Nom</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder='Entrez votre nom'
                  className='w-full px-3 h-9  rounded  mt-1 ring-1 ring-gray-10 focus:outline-none  '
                  required />
              </div>
            )}
            <div className='w-full'>
              <label htmlFor="email" className='medium-15 text-primary' >Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type='email'
                placeholder='Entrez votre adresse email'
                required
                className='w-full px-3  rounded  mt-1 h-9 ring-1 ring-gray-10 focus:outline-none ' />
            </div>
            <div className='w-full'>
              <label htmlFor="password" className='medium-15 text-primary'>Mot de passe</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type='password'
                placeholder='Entrez votre mot de passe'
                required
                className='w-full px-3  rounded h-9 ring-1 ring-gray-10  focus:outline-none  mt-1' />
            </div>
            <button className='btn-dark w-full mt-5 py-[9px]'>{currState === 'signup' ? 'Je m’inscris ' : 'Se connecter'}</button>
            <div className=' w-full flex flex-col gap-y-3'>
              {currState === 'Login' ? (
                <div>
                  <div className='underline medium-15 cursor-pointer hover:text-gray-50'> Mot de passe oublié? </div>
                  <div className=' medium-15'>Vous n’avez pas de compte?
                    <span onClick={() => setCurrState("signup")} className=' underline cursor-pointer hover:text-gray-50'> Créez un compte</span>
                  </div>
                </div>
              ) : (
                <div className=' medium-15'> Vous avez déjà un compte ?
                  <span onClick={() => setCurrState("Login")} className='underline cursor-pointer hover:text-gray-50'>Connectez-vous ici</span>
                </div>
              )}
            </div>
          </form>
        </div>
        <div className='w-1/2 hidden sm:block'>
          <img src={loginImg} alt="Login visual" className='w-full h-full object-cover' />
        </div>
      </div>
    </section>
  )
}

export default Login
