import { firestore } from '@/firebase'

export class AuthService {
  /**
   *
   * @param {string} username
   * @param {string} password
   */
  static async signIn(username, password) {
    const shops = await firestore
      .collection('shops')
      .where('username', '==', username)
      .where('password', '==', password)
      .get()

    if (shops.docs.length > 0) {
      console.log(shops)
      const shop = { id: shops.docs[0].id, ...shops.docs[0].data() }

      if (shop.disabled) {
        return 'You are Blocked, Please Contact admin'
      }

      localStorage.setItem('user', JSON.stringify(shop))
      localStorage.setItem('isAdmin', (shop.isAdmin || false).toString())

      return true
    } else {
      return 'This user does not exists'
    }
  }

  static signOut() {
    localStorage.removeItem('user')
    localStorage.removeItem('isAdmin')
    return true
  }
}
