import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import WalletService from '../services/wallet.service';
import { ToastContainer, toast } from 'react-toastify';

function Cash(props) {
    const navigate = useNavigate()
    const [wallet, setWallet] = useState();
    useEffect(() => {
        async function getWallet() {
            try {
                const wallt = await WalletService.getWallet();
                const walletBal = wallt[0].bal
                setWallet(walletBal);
            }
            catch (c) {
                console.log(c);
                toast.error(c.message);
                throw new Error(c)
            }
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

