const template = document.createElement('template');

template.innerHTML = `
  <style>
    .tree-item {
      margin-left: 15px;
      display: none;
    }
    .tree-item.visible {
      display: block;
    }
    .toggle {
      cursor: pointer;
    }
  </style>
  <div class="toggle"></div>
  <div class="tree-item">
  <slot></slot>
  </div>
`;


class TreeItem extends HTMLElement {
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
      let childNodes = Array.from(this.childNodes);
      let textNode = childNodes.find(node => node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== '');
      if (textNode) {
          this.label = textNode.nodeValue.trim();
          this.removeChild(textNode);
      } else {
        this.label = '';
      }
      this.$toggle.addEventListener('click', () => this.toggle());
      this.render();
    });
  }

  toggle() {
    this.expanded = !this.expanded;
    this.render();
  }

  render() {
    this.$toggle.textContent = (this.expanded ? '▼ ' : '► ') + this.label;
    this.$children.style.display = this.expanded ? 'block' : 'none';
  }
}

window.customElements.define('tree-item', TreeItem);
