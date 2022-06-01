let listLocalStorage = [];
listLocalStorage.push(getSavedCartItems());

async function sumSubtotal() {
  let sum = 0;
  const receiverList = document.querySelectorAll('.cart__item');
  receiverList.forEach((item) => {
    const arrayItems = ((item.innerText).split(' | '));
    const receiverPrice = parseFloat((arrayItems[2].split('PRICE: $'))[1]);
    sum += receiverPrice;    
  });
  const receiverSpan = document.querySelector('.total-price');
  receiverSpan.innerText = `${sum}`;
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  
  return section;
}

const insertItens = (async (itemQuery) => {
  const receiverItens = await (fetchProducts(itemQuery));
  const receiverSection = document.querySelector('.items');
  (receiverItens.results).forEach((item) => {
    const sku = item.id;
    const name = item.title;
    const image = item.thumbnail;
    receiverSection.appendChild(createProductItemElement({ sku, name, image }));
  });
});

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  listLocalStorage = listLocalStorage.filter((item) => item !== (event.target.innerText));
  saveCartItems(listLocalStorage);
  event.target.remove();
  sumSubtotal();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}
const receiverOl = document.querySelector('.cart__items');

async function insertItensInCart() {
  const receiver = document.querySelectorAll('.item__add');
  receiver.forEach((butaum) => {
    const insert = async (chosen) => {
      const aux = chosen.target.parentNode;
      const itemSku = aux.firstChild.innerText;
      const receiverItens = await (fetchItem(itemSku));
      const sku = receiverItens.id;
      const name = receiverItens.title;
      const salePrice = receiverItens.price;
      const receiverLi = createCartItemElement({ sku, name, salePrice });
      receiverOl.appendChild(receiverLi);
      listLocalStorage.push(receiverLi.innerHTML);
      saveCartItems(listLocalStorage);
      sumSubtotal();
    };
    butaum.addEventListener('click', insert);
  });
}

async function keepItems() {
  try {
      for (let index = 1; index < listLocalStorage[0].length; index += 1) {
        const arrayItems = ((listLocalStorage[0][index]).split(' | '));
        const receiverSku = (arrayItems[0].split('SKU: '))[1];
        const receiverName = (arrayItems[1].split('NAME: '))[1];
        const receiverPrice = parseFloat((arrayItems[2].split('PRICE: $'))[1]);
        receiverOl.appendChild(createCartItemElement({
          sku: receiverSku,
          name: receiverName,
          salePrice: receiverPrice,
        }));
      }
  } catch (error) {
    console.log(error);
  } 
}

function emptyCart() {
  const receiverButton = document.querySelector('.empty-cart');
  const empty = () => {
    while (receiverOl.firstChild) {
      receiverOl.removeChild(receiverOl.firstChild);
    }
    listLocalStorage = [];
    localStorage.clear();
    sumSubtotal();
  };
  receiverButton.addEventListener('click', empty);
}
emptyCart();

window.onload = () => {
  insertItens('guitarra')
  .then(() => insertItensInCart());
  keepItems();
  sumSubtotal();
};
