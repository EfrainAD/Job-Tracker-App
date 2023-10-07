import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/card/card'
import Loader from '../../components/loader/loader'
import {
   useGetCloudinarySignatureMutation,
   useGetUserQuery,
   useUpdateUserMutation,
   useUploadToCloudinaryMutation,
} from '../../api/apiSlice'
import { createCloudinaryImg } from '../../utils/cloudinary.utils'
import InputField from '../../components/form/inputField/InputField'
import './profile.scss'
import ChangePassword from '../../components/changePassword/ChangePassword'

const initialState = {
   name: '',
   email: '',
   roles: [],
   phone: '',
   bio: '',
}

const EditProfile = () => {
   // APISlice
   const { data: user, isLoading: isUserLoading } = useGetUserQuery()
   const [updateProfile, { isSuccess, error }] = useUpdateUserMutation()
   const [getCloudinarySignature] = useGetCloudinarySignatureMutation()
   const [uploadImage] = useUploadToCloudinaryMutation()

   const navigate = useNavigate()
   const [userForm, setUserForm] = useState(initialState)
   const [userPhoto, setUserPhoto] = useState(null)
   const [isLoading, setIsLoading] = useState(false)

   useEffect(() => {
      if (user) {
         setUserForm(user)
      }
   }, [user])

   useEffect(() => {
      setIsLoading(isUserLoading)
   }, [isUserLoading])

   // useEffects for update users
   useEffect(() => {
      if (isSuccess) {
         navigate('/dashboard/profile')
      }
   }, [isSuccess, navigate])
   useEffect(() => {
      if (error) {
         setIsLoading(false)
         navigate('/dashboard/profile')
      }
   }, [error, navigate])

   const handleInputChange = (e) => {
      const { name, value, selectedOptions } = e.target

      const selectedValues = selectedOptions
         ? [...selectedOptions].map((option) => option.value)
         : null

      setUserForm({
         ...userForm,
         [name]: selectedValues ? selectedValues : value,
      })
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
               <div className="profile-card-body">
                  <span className="profile-data">
                     <InputField
                        label="Name"
                        type="text"
                        name="name"
                        value={userForm?.name ? userForm?.name : ''}
                        onChange={handleInputChange}
                        data-lpignore="true"
                     />
                     <InputField
                        label="Email"
                        type="email"
                        name="email"
                        value={userForm?.email}
                        disabled={true}
                     />
                     <InputField
                        label="Roles"
                        type="selectMulti"
                        name="roles"
                        value={userForm?.roles}
                        selectOptions={[
                           { value: 'couchee', text: 'Coachee' },
                           { value: 'couch', text: 'Coach' },
                        ]}
                        onChange={handleInputChange}
                     />
                     <InputField
                        label="Phone"
                        type="text"
                        name="phone"
                        value={userForm?.phone}
                        onChange={handleInputChange}
                     />
                     <InputField
                        label="Bio"
                        type="textarea"
                        name="bio"
                        value={userForm?.bio}
                        onChange={handleInputChange}
                        cols="30"
                        rows="10"
                     />
                     <InputField
                        label="Photo"
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                     />
                  </span>
                  <div className="btn-conainer">
                     <button className="--btn --btn-primary">
                        Edit Profile
                     </button>
                  </div>
               </div>
            </form>
         </Card>
         <br />
         <ChangePassword username={userForm?.email} />
      </div>
   )
}

export default EditProfile
