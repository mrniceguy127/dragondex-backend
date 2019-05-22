let googleStrat

const GoogleStrategy = require('passport-google-oauth2');

const dragondexLib = require('../../../../lib');
const UserModel = dragondexLib.db.models.User;
const Snowflake = dragondexLib.utils.Snowflake;

let sf = new Snowflake();

const passport = require('passport');

if (process.env.USE_AUTH === "true") {


  // User Sessions

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });

  googleStrat = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/login/callback'
  }, (accessToken, refreshToken, profile, verify) => {
    let query = {
      connectedAccounts: {
        google: profile.id
      }
    };

    UserModel.findOne(query)
    .then((userDocFound) => {
      if (userDocFound) {
        verify(undefined, userDocFound)
      } else {
        let docToCreateData = query;
        docToCreateData.username = profile.email.replace(/@.*/g, "");
        docToCreateData.id = sf.gen();

        UserModel.create(docToCreateData).then((newUserDoc) => {
          let userData = {
            id: newUserDoc.id,
            connectedAccounts: {
              google: newUserDoc.connectedAccounts.google
            }
          };

          verify(undefined, userData)
        });
      }
    })
    .catch((err) => verify(err, undefined));
  });
}

module.exports = {
  googleStrat: googleStrat,
  useStrat: () => {
    if (googleStrat) {
      passport.use(googleStrat)
    }
  }
};
