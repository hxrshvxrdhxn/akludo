import ApiCoreService from "./api.core.service";


export default class Login extends ApiCoreService{

    static async sendOtp(mobile){
        try {
            return await this.graphCall('sendOtp', `
            {
                sendOtp(mobile:"${mobile}"){
                    success
                    ctx
                }
            }`,{});
        }catch(c){
            throw new Error(c);
        }
    }

    static async verifyOtp(otp,ctx){
        try {
            return await this.graphCall('verifyOtp', `
            {
                verifyOtp(otp:"${otp}",ctx:"${ctx}"){
                  success
                  id
                }
            }`,{});
        }catch(c){
            throw new Error(c);
        }
    }

    static async login(mobile,password){
        try {
            return await this.graphCall('login', `
            {
                login(username:"${mobile}",password:"${password}"){
                  success
                  token
                  id
                }
            }`,{});
        }catch(c){
            throw new Error(c);
        }
    }

}