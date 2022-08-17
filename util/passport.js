
import { ScretKeys } from '../config/config'
import { findUserInfo } from '../api/User/user'
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = ScretKeys;


module.exports = passport => {
    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        const _USER_ = await findUserInfo(jwt_payload)
        console.log('_USER_', _USER_);
        if (_USER_) {
            done(null, _USER_)
        } else {
            done(null, false)
        }
    }));
}
