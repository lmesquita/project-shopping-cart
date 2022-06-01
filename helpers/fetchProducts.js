const fetchProducts = async (QUERY) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`;
  try {
    const product = await fetch(url);
    const data = await product.json();
    return data;
  } catch (error) {
    return new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
