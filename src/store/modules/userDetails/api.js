import { api } from '../../../services/api'
import {postData} from '../../../services/api'
import Cookies from 'universal-cookie';
 
const cookies = new Cookies()

//Mock option data for option component when data is not coming from api
export const getUserData = data => new Promise(async (resolve, reject) => {
  api.get(`api/general_user_details/`, { headers: { 'Authorization': 'Token ' + data.token } })
    .then((response) => {
     
      return resolve(response);
    })
    .catch((error) => {
      
      if(error.response.status===401)
      {
        
        cookies.remove('token', { path: '/' })
    
      }
      return reject(error);
    });
});

export const getUserGeneralDetails = data => {return new Promise(async (resolve, reject) => {
  postData({endPoint:'api/general_input/', token:data.token, payload:data.payload}).then((response) => {
    return resolve(response)
  }).catch((error) => {
    return reject(error)
  })
})}
