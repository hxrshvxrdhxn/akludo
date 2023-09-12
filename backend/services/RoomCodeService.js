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
                url: 'https://ludo-king-api-room-code.p.rapidapi.com/roomCode/',
                headers: {
                  'X-RapidAPI-Key': _config.rapid_api_key,
                  'X-RapidAPI-Host': 'ludo-king-api-room-code.p.rapidapi.com'
                }
            });
            try {
                resp = JSON.parse(resp);
            } catch (c) {
                // ignore
                console.log("unable to get response")
            }
            return resp.roomcode;
        } catch (c) {
            log.error(c);
            throw new Error('Unable to generate. ' + c.message);
        }
    }
}

exports = module.exports = RoomCodeService;
