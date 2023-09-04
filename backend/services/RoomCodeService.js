const requestP = require('request-promise');

/**
 * Gen roomcode
 *
 * */

class RoomCodeService {

    static async generateRoomCode() {
        try {
            let resp = await requestP({
                method: 'get',
                url: 'http://apnaludo.in.net/v2/crops'
            });
            try {
                resp = JSON.parse(resp);
            } catch (c) {
                // ignore
            }
            return resp.roomcode;
        } catch (c) {
            log.error(c);
            throw new Error('Unable to generate. ' + c.message);
        }
    }
}

exports = module.exports = RoomCodeService;
