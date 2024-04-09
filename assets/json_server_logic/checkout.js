fetch('http://localhost:3000/carts')
    .then(response => response.json())
    .then(carts => {
        console.log(carts);
        let total_amount = 0;

        // Mảng chứa tất cả các promise từ các lời gọi fetch
        const fetchPromises = carts.map(cart => {
            return fetch(`http://localhost:3000/products/${cart.product_id}`)
                .then(response => response.json())
                .then(product => {
                    total_amount += product.price * cart.quantity;
                });
        });

        // Đợi cho tất cả các promise hoàn thành
        Promise.all(fetchPromises)
            .then(() => {
                document.getElementById('subtotal').innerText =  total_amount + 'VND'
                document.getElementById('total_amount').innerText =  total_amount + 'VND'
                console.log(total_amount);
            });


        carts.forEach((cart, index) => {
            fetch(`http://localhost:3000/products/${cart.product_id}`)
                .then(response => response.json())
                .then(products => {
                    const container = document.getElementById('cart_lists');
                    const tr = document.createElement('tr');
                    tr.classList.add('position-relative');
                    tr.innerHTML = `
            <div class="d-flex w-100 mb-7">
              <div class="me-6">
                  <img src="${products.image}" data-src="../assets/images/others/single-product-03.jpg" class="loaded" width="60" height="80" alt="Natural Coconut Cleansing Oil" loading="lazy" data-ll-status="loaded">
              </div>
              <div class="d-flex flex-grow-1">
                  <div class="pe-6">
                      <a href="#" class="">${products.name}<span class="text-body">
                              x${cart.quantity}</span></a>
                      
                  </div>
                  <div class="ms-auto">
                      <p class="fs-14px text-body-emphasis mb-0 fw-bold">${products.price} VND</p>
                  </div>
              </div>
            </div>
          `;

                    // Chèn tr vào container
                    container.appendChild(tr);
                });
        });
    });

const checkout = async (event) => {
    event.preventDefault();
   await Swal.fire({
      title: 'Success!',
      text: 'Thanh toán thành công',
      icon: 'success',
      confirmButtonText: 'Tiếp tục'
    }, 4000)
    let firstname = document.getElementById('first-name').value
    let lastname = document.getElementById('last-name').value
    let address = document.getElementById('street-address').value
    let email = document.getElementById('email').value
    let phone_num = document.getElementById('phone').value
    let total_amount = document.getElementById('total_amount').innerText  
        total_amount = total_amount.replace('$', '');

    fetch(`http://localhost:3000/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstname,
            lastname,
            address,
            email,
            phone_num,
            total_amount,
            status: "đang chờ xác nhận"
        })

    })
        .then(response => response.json())
        .then(orders => {
     
            console.log(orders)
        })

     // Lấy danh sách tất cả giỏ hàng
fetch('http://localhost:3000/carts')
.then(response => response.json())
.then(carts => {
  // Duyệt qua từng giỏ hàng và gửi yêu cầu xóa
  carts.forEach(cart => {
    const cartId = cart._id;

    fetch(`http://localhost:3000/carts/${cartId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          console.log(`Cart with ID ${cartId} deleted successfully`);
        } else {
          console.log(`Failed to delete cart with ID ${cartId}`);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });
})
.catch(error => {
  console.error('Error:', error);
});

}