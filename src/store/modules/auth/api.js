import { api } from '../../../services/api'
import Cookies from 'universal-cookie';
 
const cookies = new Cookies();

//Mock option data for option component when data is not coming from api
export const getLoginToken = data => {return new Promise(async(resolve, reject) => {
        if (data.type === 'google') {
            api.post(`api/authentication/register_user/`, data, {})
            .then((response) => {
              
              return resolve(response);
            })
            .catch((error) => {
              console.log(33333)
              console.log(error.message)
              console.log(error)
              return reject(error);
            });
        } else {
            api.post(`api/authentication/authenticate_mpin/`, data, {})
            .then((response) => {
              //console.log("hit log in",response.data.data)
              cookies.set('token', data.data?.token);
              return resolve(response);
            })
            .catch((error) => {
              return reject(error);
            });
        }
      });
    }