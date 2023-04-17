import React from 'react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';



function Profile() {
    return (
        <>
            <Link to="/user-profile"><img className='profile-box' src='../images/profile.png' alt='Profile' /></Link>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        phone: state.phone
    };
}

export default connect(mapStateToProps)(Profile);
