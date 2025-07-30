import React from 'react'
import { Link } from 'react-router-dom'
import { BsEnvelopeFill, BsFacebook, BsGeoAltFill, BsInstagram, BsLinkedin, BsTelephoneFill, BsTwitterX } from 'react-icons/bs'

const Footer = () => {
    return (
        <footer className='max-padd-container mt-10'>
            <div className='max-padd-container bg-primary text-primaryLight py-10 rounded-tr-3xl rounded-tl-3xl'>
                <div className='container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8'>
                    <div>
                        <Link to={'/'}>
                            <h4 className='h4 bold-28 text-tertiary'>Stylike</h4>
                        </Link>
                        <p className='text-primaryLight mt-5 text-[12px]'>
                            Aimez votre style, Vivez votre mode
                        </p>
                        <p className='mt-4 text-primaryLight text-[12px]'>
                            © Stylike 2025 - Tous droits réservés
                        </p>
                    </div>
                    <div>
                        <h5 className='h5 mb-4'>Accès rapide</h5>
                        <ul className='space-y-2 regular-15'>
                            <li className='text-gray-10'>
                                <a href="/about">À propos de nous</a>
                            </li>
                            <li className='text-gray-10'>
                                <a href="/about">Nouveautés</a>
                            </li>
                            <li className='text-gray-10'>
                                <a href="/contact">Contact</a>
                            </li>
                            <li className='text-gray-10'>
                                <a href="/services">Services</a>
                            </li>
                            <li className='text-gray-10'>
                                <a href="/privacy-policy">Politique de confidentialité</a>
                            </li>
                        </ul>
                    </div>
                    <div className='flex flex-col'>
                        <h5 className='h5 mb-4'>Contactez-nous</h5>
                        <a className='text-gray-10 mb-2'>
                            <BsTelephoneFill className='inline-block mr-2' />+216 54 121 578
                        </a>
                        <a className='text-gray-10 mb-2'>
                            <BsEnvelopeFill className='inline-block mr-2' />{''}support@stylike.com
                        </a>
                    </div>
                    <div>
                        <h5 className='h5 mb-4'>Suivez-nous</h5>
                        <div className='flex space-x-6 '>
                            <a href=""><BsFacebook /></a>
                            <a href=""><BsTwitterX /></a>
                            <a href=""><BsInstagram /></a>
                            <a href=""><BsLinkedin /> </a>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    )
}

export default Footer
