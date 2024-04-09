fetch('http://localhost:3000/products')
    .then(response => response.json())
    .then(products => {
        const container = document.getElementById('product-container'); // Thay 'product-container' bằng ID của phần tử chứa danh sách sản phẩm

        products.forEach((product, index) => {
            if (index >= 8) {
                return false
            }
            const productCard = document.createElement('div');
            productCard.className = 'col-lg-4 col-xl-3 col-sm-6'; // Thêm class tương ứng với mẫu card sản phẩm

            productCard.innerHTML = `
          <div class="card card-product grid-1 bg-transparent border-0">
            <figure class="card-img-top position-relative mb-7 overflow-hidden">
              <a href="./product-detail.html?id=${product._id}" class="hover-zoom-in d-block" title="${product.name}">
                <img src="${product.image}" data-src="${product.image}" class="img-fluid w-100 loaded" alt="${product.name}" width="330" height="440" loading="lazy" data-ll-status="loaded">
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
                <a class="text-decoration-none text-reset" href="./shop/product-details-v1.html">${product.name}</a>
              </h4>
              <div class="d-flex align-items-center fs-12px justify-content-center">
                <div class="rating">
                  <div class="empty-stars">
                    <span class="star">
                      <svg class="icon star-o">
                        <use xlink:href="#star-o"></use>
                      </svg>
                    </span>
                    <span class="star">
                      <svg class="icon star-o">
                        <use xlink:href="#star-o"></use>
                      </svg>
                    </span>
                    <span class="star">
                      <svg class="icon star-o">
                        <use xlink:href="#star-o"></use>
                      </svg>
                    </span>
                    <span class="star">
                      <svg class="icon star-o">
                        <use xlink:href="#star-o"></use>
                      </svg>
                    </span>
                    <span class="star">
                      <svg class="icon star-o">
                        <use xlink:href="#star-o"></use>
                      </svg>
                    </span>
                  </div>
                    <span class="star">
                      <svg class="icon star text-primary">
                        <use xlink:href="#star"></use>
                      </svg>
                    </span>
                    <span class="star">
                      <svg class="icon star text-primary">
                        <use xlink:href="#star"></use>
                      </svg>
                    </span>
                    <span class="star">
                      <svg class="icon star text-primary">
                        <use xlink:href="#star"></use>
                      </svg>
                    </span>
                    <span class="star">
                      <svg class="icon star text-primary">
                        <use xlink:href="#star"></use>
                      </svg>
                    </span>
                    <span class="star">
                      <svg class="icon star text-primary">
                        <use xlink:href="#star"></use>
                      </svg>
                    </span>
                  </div>
                </div>
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

fetch('http://localhost:3000/categories')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('category-container'); // Thay 'category-container' bằng ID của phần tử chứa danh sách

        data.forEach(category => {
            // Tạo phần tử div chứa danh mục và áp dụng các lớp CSS
            const colDiv = document.createElement('div');
            colDiv.className = 'col-lg-2 col-md-4 col-sm-6 mt-lg-0 mt-10';

            // Tạo phần tử div bên trong colDiv chứa card
            const card = document.createElement('div');
            card.className = 'card border-0 fw-semibold';

            // Tạo phần tử a cho hình ảnh
            const link = document.createElement('a');
            link.href = 'shopbycate.html?id=' + category._id;
            link.className = 'rounded-circle mx-auto hover-zoom-in w-100 image-box-1';

            // Tạo phần tử img cho hình ảnh
            const img = document.createElement('img');
            img.className = 'dark-mode-img img-fluid card-img loaded';
            img.src =   category.image; // Thay 'category.image' bằng đường dẫn hình ảnh tương ứng
            img.alt = category.name;

            // Thêm img vào phần tử a
            link.appendChild(img);

            // Tạo phần tử div chứa nội dung card-body
            const cardBody = document.createElement('div');
            cardBody.className = 'card-body pt-9 pb-0 d-flex justify-content-center px-0';

            // Tạo phần tử h4 cho tên danh mục
            const heading = document.createElement('h4');
            heading.className = 'fs-5 text-center position-relative';

            // Tạo phần tử a cho tên danh mục
            const categoryLink = document.createElement('a');
            categoryLink.href = '#';
            categoryLink.className = 'text-decoration-none';
            categoryLink.textContent = category.name;

            // Tạo phần tử span cho số lượng
            const countSpan = document.createElement('span');
            countSpan.className = 'fw-bold fs-14px position-absolute top-0 me-n6 mt-n3 end-0 top-50 translate-middle-y';
            countSpan.textContent = category.count; // Thay 'category.count' bằng số lượng tương ứng

            // Thêm categoryLink và countSpan vào heading
            heading.appendChild(categoryLink);
            heading.appendChild(countSpan);

            // Thêm heading vào cardBody
            cardBody.appendChild(heading);

            // Thêm link và cardBody vào card
            card.appendChild(link);
            card.appendChild(cardBody);

            // Thêm card vào colDiv
            colDiv.appendChild(card);

            // Thêm colDiv vào container
            container.appendChild(colDiv);
        });
    })
    .catch(error => {
        console.error(error);
    });