import React from 'react'
import { confirmAlert } from 'react-confirm-alert'
import { useUpdateCompanyMutation } from '../../../api/apiSlice'

const ChangePeersOutreachBtn = ({ bool, companyId, jobId }) => {
   const [updateCompany] = useUpdateCompanyMutation()
   const newValue = !bool
   const newTextValue = bool ? 'No' : 'Yes'
   const currentTextValue = bool ? 'Yes' : 'No'

   return (
      <button
         className="--btn"
         onClick={() =>
            confirmAlert({
               title: `Change this to '${newTextValue}'`,
               message:
                  'This says if you have reached out on linkedIn to people of the same job field.',
               buttons: [
                  {
                     label: 'Cancel',
                  },
                  {
                     label: 'Change',
                     onClick: () =>
                        updateCompany({
                           id: companyId,
                           jobId,
                           body: { peersOutreach: newValue },
                        }),
                  },
               ],
            })
         }
      >
         {currentTextValue}
      </button>
   )
}

export default ChangePeersOutreachBtn
