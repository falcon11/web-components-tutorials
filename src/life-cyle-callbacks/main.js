class Square extends HTMLElement {
  // Specify observed attributes so that
  // attributeChangedCallback will work
  static get observedAttributes() {
    return ['c', 'l'];
  }

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    const div = document.createElement('div');
    const style = document.createElement('style');
    shadow.appendChild(style);
    shadow.appendChild(div);
  }

  connectedCallback() {
    console.log('Custom square element added to page.');
    updateStyle(this);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log('Custom square element attributes changed.');
    updateStyle(this);
  }

  disconnectedCallback() {
    console.log('Custom square element removed from page.');
  }

  adoptedCallback() {
    console.log('Custom square element moved to new page.');
  }
}

customElements.define('custom-square', Square);

function updateStyle(elem) {
  const l = elem.getAttribute('l');
  const c = elem.getAttribute('c');

  const shadow = elem.shadowRoot;
  shadow.querySelector('style').textContent = `
    div {
      width: ${l}px;
      height: ${l}px;
      background-color: ${c};
    }
  `;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const add = document.querySelector('.add');
const update = document.querySelector('.update');
const remove = document.querySelector('.remove');

update.disabled = true;
remove.disabled = true;

let square;

add.onclick = function () {
  square = document.createElement('custom-square');
  square.setAttribute('l', '100');
  square.setAttribute('c', 'red');

  document.body.appendChild(square);
  add.disabled = true;
  update.disabled = false;
  remove.disabled = false;
};

update.onclick = function () {
  square.setAttribute('l', random(50, 200));
  square.setAttribute(
    'c',
    `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`
  );
};

remove.onclick = function () {
  document.body.removeChild(square);

  add.disabled = false;
  update.disabled = true;
  remove.disabled = true;
};
