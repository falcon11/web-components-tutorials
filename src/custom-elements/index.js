class WordCount extends HTMLParagraphElement {
  constructor() {
    super();
  }

  connectedCallback() {
    console.log('connected');
  }
}

customElements.define('word-count', WordCount, { extends: 'p' });

class PopUpInfo extends HTMLElement {
  constructor() {
    super();

    // 创建一个 shadow root
    const shadow = this.attachShadow({ mode: 'open' });

    // 创建一个 span
    const wrapper = document.createElement('span');
    wrapper.setAttribute('class', 'wrapper');
    const icon = document.createElement('span');
    icon.setAttribute('class', 'icon');
    icon.setAttribute('tabindex', 0);
    const info = document.createElement('span');
    info.setAttribute('class', 'info');

    const text = this.getAttribute('data-text');
    info.textContent = text;

    let imgUrl;
    if (this.hasAttribute('img')) {
      imgUrl = this.getAttribute('img');
    } else {
      imgUrl = 'img/default.png';
    }
    const img = document.createElement('img');
    img.src = imgUrl;
    icon.appendChild(img);

    const style = document.createElement('style');
    style.textContent = `
      .wrapper {
        position: relative;
      }
      .info {
        font-size: 0.8rem;
        width: 200px;
        display: inline-block;
        border: 1px solid black;
        padding: 10px;
        background: white;
        border-radius: 10px;
        opacity: 0;
        transition: 0.6s all;
        position: absolute;
        bottom: 20px;
        left: 10px;
        z-index: 3;
      }
      img {
        width: 1.2rem;
      }
      .icon:hover + .info, .icon:focus + .info {
        opacity: 1;
      }
    `;

    // 将创建的元素添加到 shadow dom
    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    wrapper.appendChild(icon);
    wrapper.appendChild(info);
  }
}

customElements.define('popup-info', PopUpInfo)