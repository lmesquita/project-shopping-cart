const getSavedCartItems = () => {
  try {
    return JSON.parse(localStorage.getItem('cartItems'));
  } catch (error) {
    console.log(error.message);
  }
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
