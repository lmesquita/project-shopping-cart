const saveCartItems = (arg) => localStorage.setItem('cartItems', JSON.stringify(arg));

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
