import firebase from 'firebase'

firebase.initializeApp(
  {
    apiKey: 'AIzaSyCuDBM5umiaTJRiw73lRRZWGI5xGCzpMfU',
    authDomain: 'cercania-f8bfe.firebaseapp.com',
    databaseURL: 'https://cercania-f8bfe.firebaseio.com',
    projectId: 'proximity-f8bfe',
    storageBucket: 'cercania-f8bfe.appspot.com',
    messagingSenderId: '308131289617',
    appId: '1:308131289617:web:953c3d2521b8c3e203efb0',
    measurementId: 'G-GS7E1G6P6T'
  },
  'cercania'
)

export const firestore = firebase.firestore()
