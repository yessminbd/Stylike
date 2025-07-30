import { MdEmail, MdLocationOn, } from 'react-icons/md'
import Footer from '../components/Footer'
import ContactModal from '../components/contactModal'
import { useState } from 'react';

const Contact = () => {

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [reason, setReason] = useState("")
  const [lastName, setLastName] = useState("")
  const [firstName, setFirstName] = useState("")
  const [phone, setPhone] = useState("")
  const [description, setDescription] = useState("")
  const [email, setEmail] = useState("")
  const [order, setOrder] = useState("")

  const handleOpen = (e) => {
    e.preventDefault();
    if (
      lastName !== "" &&
      firstName !== "" &&
      email !== "" &&
      reason !== "" &&
      phone !== "" &&
      description !== "" &&
      order !== ""
    ) {
      setOpen(true);
    }
  }

  return (
    <section>
      <div className='max-padd-container pb-36'>
        <div className='max-padd-container pt-14 my-6 max-xl:mt-8'>
          <form action="" className='flex flex-col xl:flex-row gap-20 xl:gap-28'>
            <div className='flex flex-col gap-3 xl:w-[60%]'>
              <h4 className='h4 mb-9'>Nous contacter</h4>
              <div className='w-full'>
                <label htmlFor='reason' className='medium-15  text-primary'> Motif *</label>
                <input
                  onChange={(e) => setReason(e.target.value)}
                  value={reason}
                  type="text"
                  placeholder='Ex: Demande de contact ou de rétractation'
                  className='w-full px-3 h-9  rounded  mt-1 ring-1 ring-gray-10 focus:outline-none  '
                  required />
              </div>
              <div className='w-full'>
                <label htmlFor='firstName' className='medium-15  text-primary'> Nom *</label>
                <input
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  type="text"
                  className='w-full px-3 h-9  rounded  mt-1 ring-1 ring-gray-10 focus:outline-none  '
                  required />
              </div>
              <div className='w-full'>
                <label htmlFor='lastname' className='medium-15  text-primary'> Prénom *</label>
                <input
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                  type="text"
                  className='w-full px-3 h-9  rounded  mt-1 ring-1 ring-gray-10 focus:outline-none  '
                  required />
              </div>
              <div className='w-full'>
                <label htmlFor='email' className='medium-15  text-primary'> Email *</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="text"
                  className='w-full px-3 h-9  rounded  mt-1 ring-1 ring-gray-10 focus:outline-none  '
                  required />
              </div>
              <div className='w-full'>
                <label htmlFor='phone' className='medium-15  text-primary'> Téléphone *</label>
                <input
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  maxLength={8}
                  type="text"
                  className='w-full px-3 h-9  rounded  mt-1 ring-1 ring-gray-10 focus:outline-none  '
                  required />
              </div>
              <div className='w-full'>
                <label htmlFor='description' className='medium-15  text-primary'> Description</label>
                <textarea
                  rows={4}
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  type="note"
                  className='w-full px-3   rounded  mt-1 ring-1 ring-gray-10 focus:outline-none  '
                  required />
              </div>
              <div className='w-full'>
                <label htmlFor='order' className='medium-15  text-primary'> N° commande</label>
                <input
                  onChange={(e) => setOrder(e.target.value)}
                  value={order}
                  type="text"
                  className='w-full px-3 h-9  rounded  mt-1 ring-1 ring-gray-10 focus:outline-none  '
                  required />
              </div>
              <div className='flex flex-col'>
                <span className='bold-16'>* champs obligatoires</span>
                <span className='medium-15'>Les informations marqués d'un * sont nécessaires pour traiter au mieux votre demande.</span>
              </div>
              <div className=' '>
                <button onClick={handleOpen} className=' btn-dark  w-full  bold-16 xl:w-44 '>Valider</button>
                <ContactModal open={open} handleClose={handleClose} />
              </div>
            </div>
            <div className='flex flex-1 flex-col xl:pt-24 xl:w-[40%]'>
              <div className="flex items-start gap-4 mb-10">
                <div>
                  <div className='flex flex-row gap-3 items-center'>
                    <MdEmail size={21} />
                    <h3 className="font-bold">Par email</h3>
                  </div>
                  <div className='ml-8'>
                    <span className="mb-1 text-gray-50 medium-15 text-[13px]">
                      Si vous ne voyez pas le formulaire ci-dessus ou avez des difficultés, vous pouvez contacter le service client directement à{' '}
                      <span className="hover:text-primary underline cursor-pointer">
                        support@stylike.com
                      </span>.
                    </span>
                    <br />
                    <span className=' text-gray-50 medium-15 text-[13px]'>
                      Pensez à indiquer dans l'email vos coordonnées et toutes les informations utiles pour une résolution rapide de votre problème (exemples :
                      numéro de commande, lieu d'achat, contexte, etc.).
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4 mb-10">
                <div>
                  <div className='flex flex-row gap-2 items-center '>
                    <MdLocationOn size={21} />
                    <h3 className="font-bold">Par courrier</h3>
                  </div>
                  <div className='ml-8'>
                    <span className="mb-1 text-gray-50 medium-15 text-[13px]">
                      Si jamais la technologie vous lâche.
                    </span>
                    <br />
                    <span className=' text-gray-50 medium-15 text-[13px]'>
                      Stylike Service Client
                    </span><br />
                    <span className=' text-gray-50 medium-15 text-[13px]'>
                      8024 Tazarka Nabeul Tunisie
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div>
          </div>
        </div>
        <div>
        </div>
      </div>
      <Footer />
    </section>
  )
}

export default Contact