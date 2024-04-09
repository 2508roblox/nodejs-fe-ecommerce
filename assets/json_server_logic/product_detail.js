
// Get the value of the "id" parameter


fetch('http://127.0.0.1:3000/products')
    .then(response => response.json())
    .then(products => {
        const urlParams = new URLSearchParams(window.location.search);

        const id = urlParams.get('id');
        result = products.find(product => product._id == id)
        var productNameElement = document.getElementById("product_name");
        var priceElement = document.getElementById("price");

        productNameElement.innerHTML = result.name;


        priceElement.innerHTML = result.price + 'VND';
// Lấy phần tử có id "product_image"
var productImageElement = document.getElementById("product_image");

// Thay đổi đường dẫn của hình ảnh
var newImageSrc =   result.image;
productImageElement.src = newImageSrc;



    });

    function addToCart() {
      fetch('http://localhost:3000/carts')
        .then(response => response.json())
        .then(carts => {
          const urlParams = new URLSearchParams(window.location.search);
          const id = urlParams.get('id');
          const existingCart = carts.find(cart => cart.product_id == id);
          
          if (existingCart) {
            existingCart.quantity += 1;
            fetch(`http://localhost:3000/carts/${existingCart._id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(existingCart)
            })
              .then(response => response.json())
              .then(updatedCart => {
                location.reload()

              })
              .catch(error => {
                // Handle the error
              });
          } else {
            const newCart = {
              product_id: id,
              quantity: 1,
              user_id: localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user'))._id : null
            };
            fetch('http://127.0.0.1:3000/carts', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(newCart)
            })
              .then(response => response.json())
              .then(createdCart => {
              location.reload()
              })
              .catch(error => {
                // Handle the error
              });
          }
        })
        .catch(error => {
          // Handle the error
        });
    }