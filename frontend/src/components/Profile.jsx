import React from 'react'
import { Link } from "react-router-dom";


function Profile() {
    return (
        <>
            <Link to="/user-profile"><img className='profile-box' src='../images/profile.png' alt='Profile' /></Link>
        </>
    )
}
export default Profile
