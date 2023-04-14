const HealthResolver = require('./resolvers/HealthResolver');
const UserService = require("../services/UserService");
const WithAuthResolver = require('./resolvers/WithAuthResolver');
const MutationWithAuthResolver = require('./resolvers/MutationWithAuthResolver');


/**
 * The resolver root class
 * */
exports = module.exports = class ResolverRoot {

    async health() {
        return new HealthResolver();
    }

    async withAuth({token}, ctx) {
        const user = await UserService.authenticate(token, ctx.user);
        if (!user) {
            ctx.forceResponseCode = 401;
            throw new Error('Invalid Auth Provided. Token not valid.');
        }
        return new WithAuthResolver(user, token);
    }

    async mutationWithAuth({token}, ctx) {
        const user = await UserService.authenticate(token, ctx.user);
        if (!user) {
            ctx.forceResponseCode = 401;
            throw new Error('Invalid Auth Provided. Token not Valid.');
        }
        return new MutationWithAuthResolver(user, token);
    }

    async constant({value}) {
        return value;
    }

    async enumOptions({name}) {
        try {
            const enm = require('../util/enums/' + name);
            return enm.values.map(v => ({
                key: v,
                val: v
            }));
        } catch (c) {
            log.error(c);
            throw new Error('Unknown or bad Enum');
        }
    }

    async login({username, password}, req) {
        // todo change
        if (!username) throw new Error('username is required');
        if (!password) throw new Error('password is required');
        // const resp = await UserService.list({email: username.toLowerCase(), naiveAuthPass: password.trim()});
        if (username === 'ankush@ankush.com') {
            // const user = resp.docs.shift();
            // log.debug(user);
            req.loginUser({
                _id: '640a3dcfe6b88e001fc76984',
                id: '640a3dcfe6b88e001fc76984',
                email: username,
                ts: +new Date()
            });
            return {
                id: '640a3dcfe6b88e001fc76984',
                success: true,
                token: req.token
            }
        } else throw new Error('Username or password invalid.');
    }

    async logout({}, req) {
        req.logout();
        return {
            id: 'logged out',
            success: true,
            token: null
        };
    }

    static get bean() {
        if (!ResolverRoot.instance) {
            ResolverRoot.instance = new ResolverRoot();
        }
        return ResolverRoot.instance;
    }
};
