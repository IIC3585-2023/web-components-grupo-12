const template = document.createElement('template');

template.innerHTML = `
  <style>
    :host {
      font-family: Arial, sans-serif;
    }
    .toggle {
      cursor: pointer;
      padding: 5px;
      background-color: #DFE9FF;
      margin-bottom: 5px;
      border-radius: 5px;
    }
    .toggle:hover {
      background-color: #BFD3FF;
    }
    .tree-item {
      margin-left: 30px;
    }
  </style>
  <div class="toggle"></div>
  <div class="tree-item">
  <slot></slot>
  </div>
`;

export class TreeItem extends HTMLElement {
  constructor() {
    super();
    this.expanded = false;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.$toggle = this.shadowRoot.querySelector('.toggle');
    this.$children = this.shadowRoot.querySelector('.tree-item');
  }

  connectedCallback() {
    setTimeout(() => {
      this.label = this.getLabel();
      this.$toggle.addEventListener('click', () => this.toggle());
      this.render();
    });
  }

  getLabel() {
    let childNodes = Array.from(this.childNodes);
    let node = childNodes.find(node => node.nodeType === Node.TEXT_NODE && node.nodeValue !== '');
    let label = node.nodeValue.trim();
    this.removeChild(node);
    return label;
  }

  toggle() {
    this.expanded = !this.expanded;
    this.render();
  }

  render() {
    this.$toggle.textContent = this.getIcon() + this.label;
    this.$children.style.display = this.expanded ? 'block' : 'none';
  }

  getIcon() {
    if (this.hasChildren()) {
      if (this.expanded) {
        return '▼ ';
      } else {
        return '► ';
      }
    } else {
      return ' ';
    }
  }

  hasChildren() {
    let childNodes = Array.from(this.childNodes);
    return childNodes.some(node => node.nodeType != Node.TEXT_NODE);
  }
}

window.customElements.define('tree-item', TreeItem);
