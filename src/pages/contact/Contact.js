import React, { useState } from 'react'
import Card from '../../components/card/card'
import { FaEnvelope, FaLinkedin } from 'react-icons/fa'
import { toast } from 'react-toastify'
import './contact.scss'
import InputField from '../../components/form/inputField/InputField'

const Contact = () => {
   const [subject, setSubject] = useState('')
   const [message, setMessage] = useState('')
   const data = {
      subject,
      message,
   }

   const sendEmail = async (e) => {
      e.preventDefault()
      // Validation
      if (!subject || !message)
         return toast.error('You need a subject and a message to go with it.')

      // sendContactEmail(data)
      setSubject('')
      setMessage('')
   }

   return (
      <div className="contact">
         <h3 className="--mt">Contact Us</h3>
         <div className="section">
            <form onSubmit={sendEmail}>
               <Card cardClass="card">
                  <InputField
                     label={'Subject'}
                     type="text"
                     name="subject"
                     placeholder="Subject"
                     required
                     value={subject}
                     onChange={(e) => setSubject(e.target.value)}
                  />
                  <InputField
                     label={'Message'}
                     type={'textarea'}
                     cols="30"
                     rows="10"
                     name="message"
                     required
                     value={message}
                     onChange={(e) => setMessage(e.target.value)}
                  />
                  <button className="--btn --btn-primary">Send Message</button>
               </Card>
            </form>

            <div className="details">
               <Card cardClass={'card2'}>
                  <h3>Our Contact Information</h3>
                  <p>
                     If you have any bugs to report, please use the form. You
                     can also connect through LinkedIn.
                  </p>

                  <div className="icons">
                     <span>
                        <FaEnvelope />
                        <p>Use form on the right</p>
                     </span>
                     <span>
                        <FaLinkedin />
                        <a
                           href="https://www.linkedin.com/in/efraindavila/"
                           target="_blank"
                           rel="noreferrer"
                        >
                           https://www.linkedin.com/in/efraindavila/
                        </a>
                     </span>
                  </div>
               </Card>
            </div>
         </div>
      </div>
   )
}

export default Contact
