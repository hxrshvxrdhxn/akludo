const requestP = require('request-promise');


(async function () {
    const resp = await requestP({
        url: 'https://control.msg91.com/api/v5/flow/',
        method: 'post',
        header: {
            authkey: '393641AndILoTW6425303eP1'
        },
        json: {
            template_id: '643510b0d6fc0554aa1ea8b2',
            sender: 'akludo',
            short_url: '0',
            mobiles: '9873333033',
            otp: '100100'
        }
    });
    console.log(resp);
})()
