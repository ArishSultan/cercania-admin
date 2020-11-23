import firebase from 'firebase'
import 'firebase/firestore'

firebase.initializeApp({
  // apiKey: 'AIzaSyBrt_q_xLVW3KOmKmZyPzT6viAs7mGzYhg',
  // authDomain: 'ecommerce-81153.firebaseapp.com',
  // databaseURL: 'https://ecommerce-81153.firebaseio.com',
  // projectId: 'ecommerce-81153',
  // storageBucket: 'ecommerce-81153.appspot.com',
  // messagingSenderId: '944146264677',
  // appId: '1:944146264677:web:4e46ae9abafe7f0d620c8c',
  // measurementId: 'G-B452EPRY0B'
  apiKey: 'AIzaSyCuDBM5umiaTJRiw73lRRZWGI5xGCzpMfU',
  authDomain: 'cercania-f8bfe.firebaseapp.com',
  databaseURL: 'https://cercania-f8bfe.firebaseio.com',
  projectId: 'cercania-f8bfe',
  storageBucket: 'cercania-f8bfe.appspot.com',
  messagingSenderId: '308131289617',
  appId: '1:308131289617:web:953c3d2521b8c3e203efb0',
  measurementId: 'G-GS7E1G6P6T'
})

export const firestore = firebase.firestore()
export const storage = firebase.storage()
