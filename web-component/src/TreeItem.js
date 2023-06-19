const template = document.createElement('template');

template.innerHTML = `
  <style>
  .tree-item {
    display: none;
  }
  .tree-item.visible {
    display: block;
  }
  .toggle{
    color: #444;
    padding: 18px;
    width: 100%;
    border-radius: 5px;
    text-align: left;
    outline: none;
    font-size: 15px;
    transition: 0.4s;
  }
  </style>
    <div class="toggle"></div>
    <div class="tree-item">
    <slot></slot>
  </div>
`;

/**
 * Componente de menu desplegable.
 *
 * @slot - Slot para elementos hijos
 * @attr {string} type - Contenido o item del menu
 *
 */

export class TreeItem extends HTMLElement {

  static get observedAttributes() {
    return ["type"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "type") {
      this.type = newValue;
    }
  }

  constructor() {
    super();
    this.expanded = false;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.$toggle = this.shadowRoot.querySelector('.toggle');
    this.$children = this.shadowRoot.querySelector('.tree-item');
    this.type = "item";
  }

  connectedCallback() {
    setTimeout(() => {
      let childNodes = Array.from(this.childNodes);
      let textNode = childNodes.find(node => node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== '');
      if (textNode) {
          this.label = textNode.nodeValue.trim();
          this.removeChild(textNode);
      } else {
        this.label = '';
      }
      if (this.type === "item") {
        this.$toggle.addEventListener("click", () => this.toggle());
      }
      this.render();
    });
  }


  toggle() {
    this.expanded = !this.expanded;
    this.render();
  }

  render() {

    if (this.type == "item") {
      this.$toggle.textContent = (this.expanded ? "- " : "+ ") + this.label;
      this.$toggle.style.backgroundColor = "#eee";
      this.$children.style.backgroundColor = "#eee";
      this.$children.style.display = this.expanded ? "block" : "none";
    } else {
      this.$toggle.textContent = this.label;
      this.$toggle.style.backgroundColor = "white";
      this.$children.style.backgroundColor = "white";
    }
  }
}

window.customElements.define("tree-item", TreeItem);
