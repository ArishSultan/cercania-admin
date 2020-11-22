import firebase from 'firebase'
import 'firebase/firestore'

firebase.initializeApp({
  apiKey: 'AIzaSyBrt_q_xLVW3KOmKmZyPzT6viAs7mGzYhg',
  authDomain: 'ecommerce-81153.firebaseapp.com',
  databaseURL: 'https://ecommerce-81153.firebaseio.com',
  projectId: 'ecommerce-81153',
  storageBucket: 'ecommerce-81153.appspot.com',
  messagingSenderId: '944146264677',
  appId: '1:944146264677:web:4e46ae9abafe7f0d620c8c',
  measurementId: 'G-B452EPRY0B'
})

export const firestore = firebase.firestore()
export const storage = firebase.storage()
