fetch('http://localhost:3000/products')
  .then(response => response.json())
  .then(products => {
const container = document.getElementById('product-container'); // Thay 'product-container' bằng ID của phần tử chứa danh sách sản phẩm

    products.forEach((product, index) => {
      
        const productCard = document.createElement('div');
        productCard.className = 'col-lg-4 col-xl-3 col-sm-6'; // Thêm class tương ứng với mẫu card sản phẩm
  
        productCard.innerHTML = `
          <div class="card card-product grid-1 bg-transparent border-0">
            <figure class="card-img-top position-relative mb-7 overflow-hidden">
              <a href="product-detail.html?id=${product._id}" class="hover-zoom-in d-block" title="${product.name}">
                <img src=" ${product.image}" data-src="${product.image}" class="img-fluid w-100 loaded" alt="${product.name}" width="330" height="440" loading="lazy" data-ll-status="loaded">
              </a>
              <div class="position-absolute product-flash z-index-2">
                <span class="badge badge-product-flash on-sale bg-primary">-25%</span>
              </div>
               
            </figure>
            <div class="card-body text-center p-0">
              <span class="d-flex align-items-center price text-body-emphasis fw-bold justify-content-center mb-3 fs-6">
                <ins class="text-decoration-none">${product.price} VND</ins>
              </span>
              <h4 class="product-title card-title text-primary-hover text-body-emphasis fs-15px fw-500 mb-3">
                <a class="text-decoration-none text-reset" href="product-detail.html?id=${product._id}">${product.name}</a>
              </h4>
              <div class="d-flex align-items-center fs-12px justify-content-center">
               
              </div>
            </div>
          </div>
        `;
  
        container.appendChild(productCard);
  
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });