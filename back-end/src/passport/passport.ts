import passport, { PassportStatic } from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from "bcryptjs";

import { User } from '../models/UserSchema';

const comparePassword = (p1: string, p2: string): boolean => {
  return bcrypt.compareSync(p1, p2);
} 

const PassportLocalStrategy = new LocalStrategy.Strategy({
  usernameField: 'user[login]',
  passwordField: 'user[password]',
}, (login, password, done) => {
  User.findOne({ login })
    .then((user) => {
      if (!user || !comparePassword(password, user.password)) {
        return done('login or password wrong', false)
      }

      return done(null, user)
    }).catch(done)
})

export default function (passport: PassportStatic) {
  return passport.use(PassportLocalStrategy)
}