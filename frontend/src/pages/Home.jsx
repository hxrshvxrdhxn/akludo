import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import GameService from '../services/game.service';
import { ToastContainer, toast } from 'react-toastify';

function Home() {
    const [games, setGames] = useState([]);
    //to do create a  slug field for redirection --------------------------====
    //to do when pushing to test change urls----------------p========
    useEffect(() => {
        // console.log(process.env.REACT_APP_DEVELOPMENT_URL_ADMIN);
        async function fetchGames() {
            try {
                let game = await GameService.listAllGames();
                console.log(game);
                setGames(game)
            } catch (c) {
                toast.error(c.message.split(':')[1])
            }
        };
        function isAuth() {
            let name = "_aklpsk";
            var match = document.cookie.split(';');
            match = match.filter(item => item.match(RegExp('(^| )' + name + '=([^;]+)'))).map(item => item.split('=')).flat();
            if (match.length && match[0].match('_aklpsk') && match[1]) {
                fetchGames();
            }
            return;
        };
        isAuth();
    }, []);

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
                {games && games.length ?
                    games.map((game) => {
                        if (game?.status == 'AVAILABLE') {
                            return (
                                <div className="home-card-item" key={game.id}>
                                    <a href='/ludo-classic'><img src={`http://localhost:8080/uploads/${game?.image?.name}`} alt={game?.name} /></a>
                                </div>
                            )
                        } else {
                            return (
                                <div className="home-card-item comingsoon" key={game.id}>
                                    <div className='tag'>Coming Soon</div>
                                    <img src={`http://localhost:8080/uploads/${game?.image?.name}`} alt={game?.name} />
                                </div>
                            )
                        }
                    }) : <>
                        <ToastContainer />
                        <div className="home-card-item">
                            <a href='/ludo-classic'><img src='../images/classic-ludo.png' alt='Classic Ludo ' /></a>
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
                    </>
                }
            </div>
        </>
    )
}

export default Home