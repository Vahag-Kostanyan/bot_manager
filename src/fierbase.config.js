const admin = require('firebase-admin');
const key = require('./serviceAccountKey.json');

function init() {
  try{
    admin.initializeApp({
      credential: admin.credential.cert(key)
    });

    return admin.firestore()
  }catch(error) {
    console.log(error, 'error');
  }
}

module.exports = init();