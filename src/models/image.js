export class UploadedImage {
  /**
   *
   * @param {string} name
   * @param {string} url
   */
  constructor({ name, url }) {
    this.name = name || ''
    this.url = url || ''
  }
}
