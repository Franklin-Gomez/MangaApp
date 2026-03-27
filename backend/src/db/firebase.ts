// import admin from "firebase-admin"

// const serviceAccount = JSON.parse(
//     process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
// )

// if( !admin.apps.length ) { 
//     admin.initializeApp ({
//         credential: admin.credential.cert( serviceAccount )
//     })
// }

// export const db = admin.firestore()

import admin from "firebase-admin"
// import serviceAccount from "./serviceAccountKey.json"
import serviceAccount = require("../../serviceAccountKey.json")

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
  })
}

export const db = admin.firestore()