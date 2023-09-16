import { confirmAlert } from 'react-confirm-alert'

// This is used when DB returns a date
export const formatDate = (date) => date.slice(0, 10)

export const getTodaysDate = () => {
   const date = new Date(Date.now())

   const year = date.getFullYear()
   const month = String(date.getMonth() + 1).padStart(2, '0')
   const day = String(date.getDate()).padStart(2, '0')

   return `${year}-${month}-${day}`
}

export const comfirmAndDelete = ({ title, deleteFunc, id }) => {
   confirmAlert({
      title: title,
      message: 'Are you sure to do this?',
      buttons: [
         {
            label: 'Cancel',
         },
         {
            label: 'Delete',
            onClick: () => deleteFunc(id),
         },
      ],
   })
}

export const getUrlHost = (urlStr) => {
   try {
      const url = new URL(urlStr).hostname
      const parts = url.split('.')
      const domain = parts[parts.length - 2]
      return domain
   } catch (_) {}
   // NOTE: exmaple.com/co will return bad data, web browser should hide those when people copy form there broswer
}
