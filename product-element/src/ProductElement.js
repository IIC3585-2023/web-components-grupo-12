import { html, css, LitElement } from 'lit';

export class ProductElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--product-element-text-color, #000);
      font-family: Arial;
    }
    .product-container {
      background-color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      width: 150px;
      min-height: 350px;
      max-height: fit-content;
      border-radius: 10px;
      padding: 10px;
      box-shadow: 0 0px 20px rgba(0,0,0,0.15);
      transition: box-shadow 0.3s ease-in-out;
    }
    .product-container:hover {
      box-shadow: 0 0px 40px rgba(0,0,0,0.3);
    }
    .product-image {
      width: 80%;
    }
    .star-info {
      color: gray;
      font-size: 13px;
      margin: 0;
    }
    .star-container {
      margin-top: 5px;
    }
    .star {
      color: gray;
      font-size: 17px;
      border: none;
      background: transparent;
      padding: 0;
      margin: 0;
    }
    .star-checked {
      color: gold;
    }
    .old-price {
      color: gray;
      text-decoration: line-through;
    }
    .price-container {
      display: flex;
      align-items: center;
      height: 20px;
    }
    .price {
      font-weight: bold;
      font-size: 20px;
    }
    .discount {
      margin-left: 10px;
      padding: 5px;
      background-color: crimson;
      color: white;
      border-radius: 5px;
      font-weight: bold;
    }

  `;

  static properties = {
    name: { type: String },
    price: { type: Number },
    starCount: { type: Number },
    imageSrc: { type: String },
    discount: { type: Number },
  };

  constructor() {
    super();
    this.name = 'iPhone 14';
    this.starCount = 3;
    this.price = 974990;
    this.imageSrc = "https://tiendaempresas.entel.cl/media/catalog/product/cache/e83b319fe15d087a014efa16f11c0f36/i/p/iphone_14_morad_ok_1.png";
  }

  __increment() {
    this.starCount += 1;
  }

  marked(idx) {
    if (idx <= this.starCount) {
      return "star-checked";
    } else {
      return ""
    }
  }

  __rate(e) {
    const newRate = parseInt(e.target.id.slice(-1));
    console.log(newRate);
    this.starCount = newRate;
  }

  getOriginalPrice() {
    if (this.discount) {
      return this.price;
    } else {
      return "";
    }
  }

  getPrice() {
    if (this.discount) {
      return this.price - (this.price * this.discount / 100);
    } else {
      return this.price;
    }
  }

  render() {
    return html`
      <div class="product-container">
        <img class="product-image" src="${this.imageSrc}"/>
        <div>
          <h2>${this.name}</h2>
          <div class="price-container">
            <p class="price">$${this.getPrice().toLocaleString('es-ES')}</p>
            <p class="discount" style="${this.getOriginalPrice() ? ("") : ("display: none;")}">${this.discount}%</p>
          </div>
          <p class="old-price" style="${this.getOriginalPrice() ? ("") : ("display: none;")}">$${this.getOriginalPrice().toLocaleString('es-ES')}</p>
        </div>
        <p class="star-info">Rate this product</p>
        <div class="star-container">
          <button class="star ${this.marked(1)}" @click=${this.__rate} id="star-1">★</button>
          <button class="star ${this.marked(2)}" @click=${this.__rate} id="star-2">★</button>
          <button class="star ${this.marked(3)}" @click=${this.__rate} id="star-3">★</button>
          <button class="star ${this.marked(4)}" @click=${this.__rate} id="star-4">★</button>
          <button class="star ${this.marked(5)}" @click=${this.__rate} id="star-5">★</button>
        </div>
      </div>
    `;
  }
}

customElements.define('product-element', ProductElement);
