(() => {
  const searchResults = document.querySelectorAll('.search-result-gridview-item');
  const items = [...searchResults].map((searchResult) => {
    const link = searchResult.querySelector('a');
    const img = searchResult.querySelector('img');
    return {
      name: searchResult.querySelector('.product-title-link span:last-of-type').innerText,
      brand: searchResult.querySelector('.product-title-link span:first-of-type').innerText,
      price: searchResult.querySelector('.price-main-block').innerText.split(' - ')[0].replace(/\n\$\d*\.\d{2}/g, ''),
      retailer: 'Walmart',
      buyLink: link.href,
      imgLink: img.src,
    };
  });
  console.log(JSON.stringify(items, null, 2));
})();
