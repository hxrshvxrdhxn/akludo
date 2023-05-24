import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <>
            <Header />
            <div className="home-container">
                <h3 className="home-item">GAMES</h3>
                <div className="home-item">
                    <button className='btn-exclamination'>Guide</button>
                </div>
            </div>
            <div className="home-card">
                <div className="home-card-item">
                    <a href='/ludo-classic'><img src='../images/classic-ludo.png' alt='Classic Ludo' /></a>
                </div>
                <div className="home-card-item comingsoon">
                    <div className='tag'>Coming Soon</div>
                    <img src='../images/ludo-super-start.png' alt='Classic Ludo' />
                </div>
                <div className="home-card-item comingsoon">
                    <div className='tag'>Coming Soon</div>
                    <img src='../images/ludo-club.png' alt='Classic Ludo' />
                </div>
                <div className="home-card-item comingsoon">
                    <div className='tag'>Coming Soon</div>
                    <img src='../images/ludo-plus.png' alt='Classic Ludo' />
                </div>

                <div className="home-card-item">
                    <Link to='/about' className='black-text'>About Us</Link>
                </div>
                <div className="home-card-item">
                    <Link to='/refund-policy' className='black-text'>Refund policy</Link>
                </div>
                <div className="home-card-item">
                    <Link to='/terms-condition' className='black-text'>Terms & Condition</Link>

                </div>
                <div className="home-card-item">
                    <Link to='/privacy-policy' className='black-text'>Privacy policy</Link>
                </div>

                <div className="home-card-item">
                    <Link to='/support' className='black-text'>Contact Us</Link>
                </div>

            </div>
        </>
    )
}

export default Home