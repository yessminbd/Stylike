import React from 'react'
import aboutImg from '../assets/about.png'
import { RiDoubleQuotesL } from 'react-icons/ri'
import Footer from '../components/Footer';

const About = () => {
  const statistics = [
    {
      label: "Produits vendus en 2024",
      value: "9K"
    },
    {
      label: "Satisfaction client",
      value: "99K"
    },
    {
      label: "Clients fidélisés",
      value: "78K"
    }
  ];

  return (
    <>
      <section>
        <div className='max-padd-container '>
          <div className='max-padd-container py-10 my-6 flexCenter'>
            <div className='flex flex-col xl:flex-row gap-10'>
              <div className='flex-1 relative'>
                <div className='bg-primary rounded-full rounded-tr-[155px] max-w-[488px] relative'>
                  <img src={aboutImg} alt="About" />
                  <div className='bg-primaryLight absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 max-w-xs p-4 rounded-2xl flex items-center flex-col shadow-sm'>
                    <span className='relative -top-8 p-3 text-white h-12 w-12 flex items-center justify-center rounded-full bg-primary'>
                      <RiDoubleQuotesL className='text-2xl' />
                    </span>
                    <p className='text-center relative -top-3'>
                      Découvrez notre sélection de pièces exclusives pour votre garde-robe
                    </p>
                  </div>
                </div>
              </div>
              <div className='flex-1 flex justify-center flex-col pt-14'>
                <span className='medium-18 text-secondary'>Découvrez notre histoire</span>
                <h2 className='h2 max-w-[472px]'>L'excellence de la mode portée par une équipe dévouée à votre élégance</h2>
                <p className='py-5'>Stylike incarne l'équilibre parfait entre modernité et élégance. Chaque vêtement est choisi avec soin pour vous offrir bien plus qu'une simple pièce - c'est votre signature mode personnelle. Des matières premières jusqu'aux finitions, nous créons des collections où le raffinement rencontre l'originalité. Chez Stylike, nous voyons la mode comme votre moyen d'expression unique. Chaque pièce est conçue pour révéler votre style avec assurance. Découvrez une mode qui vous ressemble vraiment - l'alliance de l'excellence et l'authenticité</p>
                <div className='flex flex-wrap gap-4'>
                  {statistics.map((statistic, index) => (
                    <div key={index} className='text-primary p-4 rounded-lg'>
                      <div className='flex items-center gap-1'>
                        <h3 className='h3'>{statistic.value}</h3>
                        <h4 className='bold-22'>+</h4>
                      </div>
                      <p>{statistic.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </section>
    </>
  )
}

export default About