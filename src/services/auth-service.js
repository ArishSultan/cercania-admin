import { firestore } from '@/firebase'
import { Shop } from '@/models/shop'

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
      const shop = new Shop({ id: shops.docs[0].id, ...shops.docs[0].data() })

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
