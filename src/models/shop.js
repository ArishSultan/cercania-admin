import { UploadedImage } from '@/models/image'

export class Shop {
  /**
   * @param {string} address
   * @param {number} commission
   * @param {string} contact
   * @param {boolean} disabled
   * @param {string} email
   * @param {UploadedImage} image
   * @param {boolean} isForHandicapped
   * @param {string} name
   * @param {string} password
   * @param {string} tagLine
   * @param {string} username
   */
  constructor({
    address,
    commission,
    contact,
    disabled,
    email,
    image,
    isForHandicapped,
    name,
    password,
    tagLine,
    username
  }) {
    this.address = address || ''
    this.commission = commission || 0
    this.contact = contact || ''
    this.disabled = disabled || false
    this.email = email || ''
    this.image = image || new UploadedImage({ name: '', url: '' })
    this.isForHandicapped = isForHandicapped || false
    this.name = name || ''
    this.password = password || ''
    this.tagLine = tagLine || ''
    this.username = username || ''
  }
}
