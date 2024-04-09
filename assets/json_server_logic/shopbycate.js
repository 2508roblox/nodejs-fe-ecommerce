fetch('http://localhost:3000/products')
    .then(response => response.json())
    .then(products => {
        const container = document.getElementById('product_list'); // Thay 'product-container' bằng ID của phần tử chứa danh sách sản phẩm

        const urlParams = new URLSearchParams(window.location.search);

        const id = urlParams.get('id');
        products = products.filter(product => product.category_id == id)
        products.forEach((product, index) => {

            const productCard = document.createElement('div');
            productCard.className = 'col-lg-4 col-xl-3 col-sm-6'; // Thêm class tương ứng với mẫu card sản phẩm

            productCard.innerHTML = `
          <div class="card card-product grid-1 bg-transparent border-0">
            <figure class="card-img-top position-relative mb-7 overflow-hidden">
              <a href="product-detail.html?id=${product._id}" class="hover-zoom-in d-block" title="${product.name}">
                <img src="${product.image}" data-src="${product.image}" class="img-fluid w-100 loaded" alt="${product.name}" width="330" height="440" loading="lazy" data-ll-status="loaded">
              </a>
              <div class="position-absolute product-flash z-index-2">
                <span class="badge badge-product-flash on-sale bg-primary">-25%</span>
              </div>
              <div class="position-absolute d-flex z-index-2 product-actions horizontal">
                <a class="text-body-emphasis bg-body bg-dark-hover text-light-hover rounded-circle square product-action shadow-sm add_to_cart" href="#" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add To Cart">
                  <svg class="icon icon-shopping-bag-open-light">
                    <use xlink:href="#icon-shopping-bag-open-light"></use>
                  </svg>
                </a>
                <a class="text-body-emphasis bg-body bg-dark-hover text-light-hover rounded-circle square product-action shadow-sm quick-view" href="#" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Quick View">
                  <span data-bs-toggle="modal" data-bs-target="#quickViewModal" class="d-flex align-items-center justify-content-center">
                    <svg class="icon icon-eye-light">
                      <use xlink:href="#icon-eye-light"></use>
                    </svg>
                  </span>
                </a>
                <a class="text-body-emphasis bg-body bg-dark-hover text-light-hover rounded-circle square product-action shadow-sm wishlist" href="#" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add To Wishlist">
                  <svg class="icon icon-star-light">
                    <use xlink:href="#icon-star-light"></use>
                  </svg>
                </a>
                <a class="text-body-emphasis bg-body bg-dark-hover text-light-hover rounded-circle square product-action shadow-sm compare" href="./shop/compare.html" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Compare">
                  <svg class="icon icon-arrows-left-right-light">
                    <use xlink:href="#icon-arrows-left-right-light"></use>
                  </svg>
                </a>
              </div>
            </figure>
            <div class="card-body text-center p-0">
              <span class="d-flex align-items-center price text-body-emphasis fw-bold justify-content-center mb-3 fs-6">
                <ins class="text-decoration-none">${product.price}</ins>
              </span>
              <h4 class="product-title card-title text-primary-hover text-body-emphasis fs-15px fw-500 mb-3">
                <a class="text-decoration-none text-reset" href="product-detail.html?id=${product._id}">${product.name}</a>
              </h4>
             
            </div>
          </div>
        `;

            container.appendChild(productCard);

        });
    })
    .catch(error => {
        console.error('Error:', error);
    });