const urlParams = new URLSearchParams(window.location.search);
const del_id = urlParams.get('del_id');
if (del_id) {
    fetch(`http://localhost:3000/carts/${del_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(products => {
            // const urlParams = new URLSearchParams(window.location.search);

            // const id = urlParams.get('id');
            // result = products.find(product => product.id == id)
            // var productNameElement = document.getElementById("product_name");
            // var priceElement = document.getElementById("price");

            // productNameElement.innerHTML = result.name;


            // priceElement.innerHTML = '$' + result.price;
            // // Lấy phần tử có id "product_image"
            // var productImageElement = document.getElementById("product_image");

            // // Thay đổi đường dẫn của hình ảnh
            // var newImageSrc = "./assets/products/" + result.image;
            // productImageElement.src = newImageSrc;
          



        });
        history.back()
        location.reload()
        
}







fetch('http://localhost:3000/carts')
    .then(response => response.json())
    .then(carts => {
        console.log(carts)
        carts.forEach((cart, index) => {
          console.log('fawefa,', cart)
            fetch(`http://localhost:3000/products/${cart.product_id}`)
                .then(response => response.json())
                .then(products => {
                    const urlParams = new URLSearchParams(window.location.search);
                    const p_id = urlParams.get('id');
                    const container = document.getElementById('cart_lists');
                    const tr = document.createElement('tr');
                    tr.classList.add('position-relative');
                    tr.innerHTML = `
        <td class="align-middle text-center">
          <a href="${window.location.pathname}${window.location.search}${p_id ?'&' : '?'}del_id=${cart._id}" class="d-block clear-product">
            <i class="far fa-times"></i>
          </a>
        </td>
        <td class="shop-product">
          <div class="d-flex align-items-center">
            <div class="me-6">
              <img src="${products.image}" width="60" height="80" alt="natural coconut cleansing oil">
            </div>
            <div>
              <p class="card-text mb-1">
             
                <span class="fs-15px fw-bold text-body-emphasis">${products.price} VND</span>
              </p>
              <p class="fw-500 text-body-emphasis">${products.name}</p>
            </div>
          </div>
        </td>
        <td class="align-middle p-0">
          <div class="input-group position-relative shop-quantity">
            <a href="#" class="shop-down position-absolute z-index-2"><i class="far fa-minus"></i></a>
            <input name="number[]" type="number" class="form-control form-control-sm px-6 py-4 fs-6 text-center border-0" value="${cart.quantity}" required>
            <a href="#" class="shop-up position-absolute z-index-2"><i class="far fa-plus"></i></a>
          </div>
        </td>
      `;
                    console.log(tr)
                    container.appendChild(tr);
                })
        });
    });
