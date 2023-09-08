import { FaTh, FaRegChartBar, FaCommentAlt } from 'react-icons/fa'
import { BiImageAdd } from 'react-icons/bi'

const menu = [
   {
      title: 'Dashboard',
      icon: <FaTh />,
      path: '/dashboard',
   },
   {
      title: 'Add Job',
      icon: <BiImageAdd />,
      path: '/dashboard/add-job',
   },
   {
      title: 'Account',
      icon: <FaRegChartBar />,
      childrens: [
         {
            title: 'Profile',
            path: '/dashboard/profile',
         },
         {
            title: 'Edit Profile',
            path: '/dashboard/profile-update',
         },
      ],
   },
   {
      title: 'Report Bug',
      icon: <FaCommentAlt />,
      path: '/dashboard/contact-us',
   },
]

export default menu
