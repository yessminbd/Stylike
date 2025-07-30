import { useState } from "react"
import loginImg from "../assets/imgLog.jpg"
import axios from "axios"
import { backend_url } from "../App"
import { toast } from "react-toastify"

const Login = ({ setToken }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onSubmitHundler = async (e) => {
        try {
            e.preventDefault()

            const response = await axios.post(backend_url + "/api/user/admin", { email, password })
            if (response.data.success) {
                setToken(response.data.token)
            }
            else {
                toast.error(response.data.message)
            }
        }
        catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    return (
        <section className=' absolute top-0 left-0 h-full w-full z-50 bg-primaryLight '>
            <div className='flex h-full w-full'>
                <div className='flex w-full sm:w-1/2 items-center justify-center'>
                    <form onSubmit={onSubmitHundler} className='flex flex-col items-center w-[90%] sm:max-w-md m-auto gap-y-5 text-gray-800' >
                        <div className='w-full mb-4'>
                            <h3 className='h3 bold-28 text-primary text-center'>Espace Administrateur</h3>
                        </div>
                        <div className='w-full'>
                            <label htmlFor="email" className='medium-15 text-primary' >Email</label>
                            <input
                                onChange={(e) => (setEmail(e.target.value))}
                                value={email}
                                type='email'
                                placeholder='Entrez votre adresse email'
                                required
                                className='w-full px-3  rounded  mt-1 h-9 ring-1 ring-gray-10 focus:outline-none '
                            />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="password" className='medium-15 text-primary'>Mot de passe</label>
                            <input
                                onChange={(e) => (setPassword(e.target.value))}
                                value={password}
                                type='password'
                                placeholder='Entrez votre mot de passe'
                                required
                                className='w-full px-3  rounded h-9 ring-1 ring-gray-10  focus:outline-none  mt-1'
                            />
                        </div>
                        <button type="submit" className='btn-dark w-full mt-5 py-[9px]'>Se connecter</button>
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
