export class Product {
  /**
   *
   * @param {string} category
   * @param {string} detail
   * @param {boolean} disabled
   * @param {number} discount
   * @param {UploadedImage[]} images
   * @param {string} name
   * @param {number} price
   * @param {string} productType
   * @param {string} shopId
   */
  constructor({
    category,
    detail,
    disabled,
    discount,
    images,
    name,
    price,
    productType,
    shopId
  }) {
    this.category = category || ''
    this.disabled = disabled || false
    this.discount = discount || 0
    this.images = images || []
    this.detail = detail || ''
    this.name = name || ''
    this.price = price || 0
    this.productType = productType || productType
    this.shopId = shopId || ''
  }

  static categories = [
    'Productos cosméticos',
    'Accesorios',
    'Artesanía y artes'
  ]

  static productType = {
    'Productos cosméticos': [
      'Todos',
      'Maquillaje',
      'Facial',
      'Corporal-Capilar'
    ],

    Accesorios: [
      'Todos',
      'Anillos-Pulseras',
      'Aretes',
      'Billeteras y más',
      'Bolsos',
      'Kids',
      'Collares',
      'Relojes',
      'Lentes',
      'Mascotas',
      'Sombreros-Vinchas'
    ],

    'Artesanía y artes': [
      'Todos',
      'Cerámica',
      'Confecciones',
      'Creaciones',
      'Cuadros'
    ]
  }
}
