const requestP = require('request-promise');

exports = module.exports = class SMSService {

    static async sendOtp(mobile, otp) {
        mobile = mobile || '';
        mobile = mobile.replace(/^\+/, '');
        if (mobile.length < 10 || mobile.length > 12) throw new Error('Invalid mobile number');
        if (mobile.length === 10) mobile = '91' + mobile;
        const resp = await requestP({
            url: 'https://control.msg91.com/api/v5/flow/',
            method: 'post',
            headers: {
                authkey: '393641AndILoTW6425303eP1',
                accept: 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                template_id: '64639049d6fc05183305abe2',
                sender: 'AKLUDO',
                short_url: '0',
                mobiles: mobile,
                var: otp
            })
        });
        console.log(resp);
        return resp;
    }
}
