import { html, css, LitElement } from 'lit';

export class ProductElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--product-element-text-color, #000);
    }
    .product-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      width: 150px;
      height: 300px;
      border: solid 2px;
    }
    .product-image {
      width: 80%;
    }
    .star-container {
      margin:10px;
    }
    .star {
      color: gray;
      font-size: 15px;
      border: none;
      background: transparent;
      padding: 0;
      margin: 0;
    }
    .star-checked {
      color: gold;
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
    this.discount = 10;
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

  __getDiscountPrice() {
    return this.price - (this.price * this.discount / 100)
  }

  render() {
    return html`
      <div class="product-container">
        <img class="product-image" src="${this.imageSrc}"/>
        <div>
          <h2>${this.name}</h2>
          <p>$${this.price}</p>
        </div>
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
