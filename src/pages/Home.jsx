import React from 'react'
import Header from '../components/Header'

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
                <div className="home-card-item">
                    <img src='../images/ludo-super-start.png' alt='Classic Ludo' />
                </div>
                <div className="home-card-item">
                    <img src='../images/ludo-club.png' alt='Classic Ludo' />
                </div>
                <div className="home-card-item">
                    <img src='../images/ludo-plus.png' alt='Classic Ludo' />
                </div>
                <div className="home-card-item">
                    <img src='../images/ludo-superstar.png' alt='Classic Ludo' />
                </div>
            </div>
        </>
    )
}

export default Home