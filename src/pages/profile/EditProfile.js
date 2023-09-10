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
   // Submit Profile Update
   const handleSubmit = async (e) => {
      e.preventDefault()
      // Upload image to cloudinary
      setIsLoading(true)
      let imageURL = null
      if (userPhoto) {
         if (
            userPhoto &&
            (userPhoto.type === 'image/jpeg' ||
               userPhoto.type === 'image/jpg' ||
               userPhoto.type === 'image/png')
         ) {
            try {
               // Get needed auth/signature for Cludinary.
               const { data: signatureObt, error: getSignatureError } =
                  await getCloudinarySignature()

               if (getSignatureError) {
                  throw new Error(getSignatureError.data.message)
               }

               const { timestamp, signature, api_key, folder } = signatureObt

               // Set up Form Data for the image and auth
               const formData = new FormData()
               formData.append('file', userPhoto)
               formData.append('api_key', api_key)
               formData.append('signature', signature)
               formData.append('timestamp', timestamp)
               formData.append('folder', folder)
               formData.append('public_id', userForm._id)

               // Post to Cloudinary
               const { data: cloudinaryImg, error: uploadImgError } =
                  await uploadImage(formData)
               if (uploadImgError) {
                  throw new Error(uploadImgError.data.error.message)
               }

               // Get URL for the new image uploaded to Cloudinary
               imageURL = cloudinaryImg.url
            } catch (error) {
               console.log('error:', error)
               toast.error('Something went wrong with uploading the image')
            }
         } else {
            toast.error('Wrong image type')
         }
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
