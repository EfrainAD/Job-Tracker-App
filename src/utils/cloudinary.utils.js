import { toast } from 'react-toastify'

const isImgTypeValide = (image) =>
   image?.type === 'image/jpeg' ||
   image?.type === 'image/jpg' ||
   image?.type === 'image/png'

const getCloudinaryCredentials = async (fetch) => {
   const { data: signatureObt, error: getSignatureError } = await fetch()

   if (getSignatureError) {
      throw new Error(getSignatureError.data.message)
   }

   const { timestamp, signature, api_key, folder } = signatureObt
   return { timestamp, signature, api_key, folder }
}
const createPostBody = ({
   file,
   api_key,
   signature,
   timestamp,
   folder,
   public_id,
}) => {
   const formData = new FormData()
   formData.append('file', file)
   formData.append('api_key', api_key)
   formData.append('signature', signature)
   formData.append('timestamp', timestamp)
   formData.append('folder', folder)
   formData.append('public_id', public_id)
   return formData
}

const postToCloudinary = async (post, body) => {
   const { data, error } = await post(body)
   if (error) {
      throw new Error(error.data.error.message)
   }
   return data
}

export const createCloudinaryImg = async ({
   image,
   fetchCredentials,
   postImage,
   imageName,
}) => {
   if (isImgTypeValide(image)) {
      try {
         const { timestamp, signature, api_key, folder } =
            await getCloudinaryCredentials(fetchCredentials)

         const body = createPostBody({
            file: image,
            api_key: api_key,
            signature: signature,
            timestamp: timestamp,
            folder: folder,
            public_id: imageName,
         })

         // Post to Cloudinary
         const cloudinaryImg = await postToCloudinary(postImage, body)

         return cloudinaryImg
      } catch (error) {
         console.log('error:', error)
         toast.error('Something went wrong with uploading the image')
      }
   } else {
      toast.error('Wrong image type')
      console.log('Wrong image type')
   }
}
