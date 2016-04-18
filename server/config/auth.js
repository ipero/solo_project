/** Google Cloud API credentials that allows the application to
  * make calls to a Google API.
  */
  var authConfigs = {
    googleAuth: {
      clientId: '231236268580-kr4p4cuj9jbfpiu60iqv0u4e7c4r1pth.apps.googleusercontent.com',
      clientSecret: 'FOWMaHUYMP7rR3tj7uhAVWIu',
      callbackUrl: 'http://localhost:5000/auth/google/callback',
    },

    sessionVars: {
      secret: 'dsfwerwf34234ewrwdsfs64wqedsfsd',
    },
  };

module.exports = authConfigs;
