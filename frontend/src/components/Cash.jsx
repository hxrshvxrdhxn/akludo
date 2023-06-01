import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import WalletService from '../services/wallet.service';

function Cash(props) {
    const navigate = useNavigate()
    const [wallet, setWallet] = useState();
    useEffect(() => {
        async function getWallet() {
            const wallt = await WalletService.getWallet();
            const walletBal = wallt[0].bal
            setWallet(walletBal);
        }
        getWallet();
    }, []);

    const addChips = () => {
        navigate('/chips', { replace: true });
    }

    return <div className="cash-box" onClick={addChips} ><div className='wallet-txt'> {props.wallet === 0 ? 0 : props.wallet || wallet}</div></div>
}

const mapStateToProps = (state) => {
    return {
        wallet: state.wallet
    };
}

export default connect(mapStateToProps)(Cash);

