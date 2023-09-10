import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Card from '../../components/card/card'
import Loader from '../../components/loader/loader'
import {
   useGetCloudinarySignatureMutation,
   useGetUserQuery,
   useUpdateUserMutation,
   useUploadToCloudinaryMutation,
} from '../../api/apiSlice'
import { createCloudinaryImg } from '../../utils/cloudinary.utils'

const EditProfile = () => {
   // APISlice
   const { data: user, isLoading: isUserLoading } = useGetUserQuery()
   const [updateProfile, { isSuccess, error }] = useUpdateUserMutation()
   const [getCloudinarySignature] = useGetCloudinarySignatureMutation()
   const [uploadImage] = useUploadToCloudinaryMutation()

   const navigate = useNavigate()
   const [userForm, setUserForm] = useState(user)
   const [userPhoto, setUserPhoto] = useState(null)
   const [isLoading, setIsLoading] = useState(false)

   useEffect(() => {
      setUserForm(user)
   }, [user])

   useEffect(() => {
      setIsLoading(isUserLoading)
   }, [isUserLoading])

   // useEffects for update users
   useEffect(() => {
      if (isSuccess) {
         toast.success('Update Successful')
         navigate('/dashboard/profile')
      }
   }, [isSuccess, navigate])
   useEffect(() => {
      if (error) {
         toast.error('Error while Updating your profile')
         console.log(`Error Message: ${error.data.message}`)
         setIsLoading(false)
         navigate('/dashboard/profile')
      }
   }, [error, navigate])

   const handleInputChange = (e) => {
      const { name, value } = e.target
      setUserForm({ ...userForm, [name]: value })
   }
   const handleImageChange = (e) => {
      setUserPhoto(e.target.files[0])
   }

   const handleSubmit = async (e) => {
      e.preventDefault()

      setIsLoading(true)
      let imageURL = null

      if (userPhoto) {
         const uploadedImg = await createCloudinaryImg({
            image: userPhoto,
            fetchCredentials: getCloudinarySignature,
            postImage: uploadImage,
            imageName: userForm._id,
         })

         imageURL = uploadedImg.url
      } else {
         imageURL = userForm.photo
      }

      await updateProfile({
         ...userForm,
         photo: imageURL,
      })
      setIsLoading(false)
   }

   return (
      <div className="profile --my2">
         {isLoading && <Loader />}

         <Card cardClass={'card --flex-dir-column'}>
            <span className="profile-photo">
               <img src={userForm?.photo} alt="profile pic" />
            </span>
            <form className="--form-control --m" onSubmit={handleSubmit}>
               <span className="profile-data">
                  <p>
                     <label>Name:</label>
                     <input
                        type="text"
                        name="name"
                        value={userForm?.name}
                        onChange={handleInputChange}
                        data-lpignore="true"
                     />
                  </p>
                  <p>
                     <label>Email:</label>
                     <input
                        type="text"
                        name="email"
                        value={userForm?.email}
                        disabled
                     />
                     <br />
                     <code>Email cannot be changed.</code>
                  </p>
                  <p>
                     <label>Phone:</label>
                     <input
                        type="text"
                        name="phone"
                        value={userForm?.phone}
                        onChange={handleInputChange}
                     />
                  </p>
                  <p>
                     <label>Bio:</label>
                     <textarea
                        name="bio"
                        value={userForm?.bio}
                        onChange={handleInputChange}
                        cols="30"
                        rows="10"
                     ></textarea>
                  </p>
                  <p>
                     <label>Photo:</label>
                     <input
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                     />
                  </p>
                  <div>
                     <button className="--btn --btn-primary">
                        Edit Profile
                     </button>
                  </div>
               </span>
            </form>
         </Card>
         <br />
         {/* <ChangePassword /> */}
      </div>
   )
}

export default EditProfile
