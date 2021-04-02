import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
      projectId: process.env.FIREBASE_PROJECT_ID,
      apiKey: "AIzaSyAATEW0bGxlCRWjMatijMpfE8Pbv42Fao0",
      authDomain: "cloud-vision-24d73.firebaseapp.com",
      projectId: "cloud-vision-24d73",
      storageBucket: "cloud-vision-24d73.appspot.com",
      messagingSenderId: "324343967564",
      appId: "1:324343967564:web:c52b56c745642776cae9e9",
      measurementId: "G-CCCCPFNV7V"
    }
  )
}

export default firebase
