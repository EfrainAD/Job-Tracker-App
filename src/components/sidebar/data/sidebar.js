import { FaTh, FaRegChartBar, FaCommentAlt } from 'react-icons/fa'
import { BiImageAdd } from 'react-icons/bi'

const menu = [
   {
      title: 'Dashboard',
      icon: <FaTh />,
      path: '/dashboard',
   },
   {
      title: 'Recruiter Dashboard',
      icon: <FaTh />,
      path: '/dashboard/recruiter',
   },
   {
      title: 'Add Job',
      icon: <BiImageAdd />,
      path: '/dashboard/add-job',
   },
   {
      title: 'Add Recruiter',
      icon: <BiImageAdd />,
      path: '/dashboard/add-recruiter',
   },
   {
      title: 'Couch',
      icon: <BiImageAdd />,
      path: '/dashboard/couch',
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
