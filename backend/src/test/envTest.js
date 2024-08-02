require("dotenv").config();
console.log("Informações do Firebase:\n")
console.log("Firebase Project ID:" + process.env.FIREBASE_PROJECT_ID)
console.log("Firebase Key ID:" + process.env.FIREBASE_KEY_ID)
console.log("Firebase Private Key:" + process.env.FIREBASE_PRIVATE_KEY)
console.log("Firebase Private Key Formatado:" + process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'))
console.log("Firebase Client Email:" + process.env.FIREBASE_CLIENT_EMAIL)
console.log("Firebase Client ID:" + process.env.FIREBASE_CLIENT_ID)
console.log("Firebase Client CERT URL:" + process.env.FIREBASE_CLIENT_CERT_URL)
console.log("---------------------------------------------------------\nInformações do Sheets:\n")
console.log("Sheet Project ID:" + process.env.SHEET_PROJECT_ID)
console.log("Sheet Private Key ID:" + process.env.SHEET_PRIVATE_KEY_ID)
console.log("Sheet Private Key:" + process.env.SHEET_PRIVATE_KEY)
console.log("Sheet Private Key Formatado:" + process.env.SHEET_PRIVATE_KEY.replace(/\\n/g, '\n'))
console.log("Sheet Client Email:" + process.env.SHEET_CLIENT_EMAIL)
console.log("Sheet Client ID:" + process.env.SHEET_CLIENT_ID)
console.log("Sheet Client CERT URL:" + process.env.SHEET_CLIENT_CERT_URL)