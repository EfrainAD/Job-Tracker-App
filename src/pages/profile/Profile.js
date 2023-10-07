import { Link } from 'react-router-dom'
import Card from '../../components/card/card'
import { SpinningImg } from '../../components/loader/loader'
import { useGetUserQuery } from '../../api/apiSlice'
import './profile.scss'

const Profile = () => {
   const { data: profile, isLoading } = useGetUserQuery()

   return (
      <div className="profile --my2">
         {isLoading && <SpinningImg />}
         {!isLoading && !profile ? (
            <p>Something went wrong, please reload the page...</p>
         ) : (
            <Card cardClass={'card --flex-dir-column'}>
               <span className="profile-photo">
                  <img src={profile?.photo} alt="profilepic" />
               </span>
               <div className="profile-card-body">
                  <span className="profile-data">
                     <p>
                        <b>Name: </b> {profile?.name}
                     </p>
                     <p>
                        <b>Email: </b> {profile?.email}
                     </p>
                     <p>
                        <b>Roles: </b> {profile?.roles.join(' ')}
                     </p>
                     <p>
                        <b>Phone: </b> {profile?.phone}
                     </p>
                     <p>
                        <b>Bio: </b> {profile?.bio}
                     </p>
                  </span>
                  <div className="btn-container">
                     <button className="--btn --btn-primary">
                        <Link to="/dashboard/profile-update">Edit Profile</Link>
                     </button>
                  </div>
               </div>
            </Card>
         )}
      </div>
   )
}

export default Profile
