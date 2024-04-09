fetch('http://localhost:3000/orders')
  .then(response => response.json())
  .then(orders => {
    const ordersListElement = document.getElementById('order_list_');

    orders.forEach(order => {
      const trElement = document.createElement('tr');

      // Thêm các thuộc tính của đơn hàng vào từng cell trong hàng (tr)
      trElement.innerHTML = `
        <td>${order._id}</td>
        <td><b>${order.firstname} ${order.lastname}</b></td>
        <td><a href="mailto:${order.email}" class="__cf_email__" data-cfemail="">${order.email}</a></td>
        <td>$${order.total_amount}</td>
        <td><span class="badge rounded-pill alert-warning">${order.status}</span></td>
        <td>${formatDate(order.created_at)}</td>
        <td class="text-end">
          <a href="#" class="btn btn-md rounded font-sm detailButton">Detail</a>
          <div class="dropdown">
            <a href="#" data-bs-toggle="dropdown" class="btn btn-light rounded btn-sm font-sm"> <i class="material-icons md-more_horiz"></i> </a>
            <div class="dropdown-menu">
              <a class="dropdown-item"  id="handleAccept"  href="#">Xác nhận</a>
              <a class="dropdown-item text-danger" href="#">Delete</a>
            </div>
          </div>
        </td>
      `;

      const handleAcceptButtons = trElement.querySelectorAll('#handleAccept');
      handleAcceptButtons.forEach(button => {
        button.addEventListener('click', () => {
          editOrder(order);
        });
      });
      
  
    
      // Thêm sự kiện cho nút Detail
      const detailButton = trElement.querySelector('.detailButton');
      detailButton.addEventListener('click', () => {
        showOrderDetails(order);
      });

      // Thêm hàng (tr) vào danh sách đơn hàng (tbody)
      ordersListElement.appendChild(trElement);
    });

 
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Hàm format ngày tháng
function formatDate(dateString) {
  const date = new Date(dateString);
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}


function showOrderDetails(order) {
  // Logic to show the detailed information of the order
  // Redirect to a detail page or perform any other necessary operations
}
function editOrder(order) {
  console.log(order)
  let orderData = {...order , status: 'đã giao'}
  // Logic to show the detailed information of the order
  // Redirect to a detail page or perform any other necessary operations
  fetch(`http://localhost:3000/orders/${order._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  })
    .then(response => {
      console.log(response.json())
    })
   
    .catch(error => {
      console.error('Error:', error);
      // Handle any errors that occur during the update process
    });
}