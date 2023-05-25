import React from 'react'
import Header from '../components/Header'
import { connect } from 'react-redux';

function AboutUs() {
    return (
        <>
            <Header />
            <div className='card'>
                <div className='head-card'>
                    <h3>About Us</h3>
                </div>
                <div className='small-body mt10'>
                    <div className='font13 mt10'>AK Ludo is a real-money gaming product owned & operated by AK ENTERPRISES</div>
                    <div className='heading mt20'>Our Products</div>
                    <div className='font13 mt10'>We are an HTML5 game-publishing company and our mission is to make accessing games fast and easy.</div>
                    <div className='font13 mt10'>AK Ludo is a skill-based real-money gaming platform accessible only for our users in India. It is accessible on https://www.akludo.com. On AK Ludo, users can compete for real cash in Tournaments and Battles. They can encash their winnings via popular options such as Paytm Wallet, Amazon Pay, Bank Transfer, Mobile Recharges etc.</div>
                    <div className='heading mt20'>Our Games</div>
                    <div className='font13 mt10'>AK Ludo has a wide-variety of high-quality, premium HTML5 games. Our games are especially compressed and optimised to work on low-end devices, uncommon browsers, and patchy internet speeds.</div>
                </div>
            </div>

        </>
    )
}

const mapStateToProps = (state) => {
    return {
        phone: state.phone
    };
}

export default connect(mapStateToProps)(AboutUs);