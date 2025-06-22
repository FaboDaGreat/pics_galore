import { useSelector } from "react-redux";
import './ProfilePage.css'

const ProfilePage = () => {
    const user = useSelector((state) => state.session.user);
    if (!user) {
        return <h1>Please log in to view your profile.</h1>
    }

    else return (
        <>
            
            <h1>{`Welcome back ${user.firstName} ${user.lastName}!`}</h1>
        </>
    )
}



export default ProfilePage