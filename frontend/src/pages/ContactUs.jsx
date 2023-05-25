import React from 'react'
import Header from '../components/Header'
import { connect } from 'react-redux';
import Support from './Support';

function ContactUs() {
    return (
        <>
            <Support />
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        phone: state.phone
    };
}

export default connect(mapStateToProps)(ContactUs);