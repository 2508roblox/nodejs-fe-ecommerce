const accessToken = localStorage.getItem('accessToken'); // Lấy accessToken từ localStorage

fetch('http://localhost:3000/products')
  .then(response => response.json())
  .then(products => {
    const productsListElement = document.getElementById('productsList');

    products.forEach(product => {
      // Tạo một div col mới cho mỗi sản phẩm
      const colElement = document.createElement('div');
      colElement.classList.add('col'); // Thêm class 'col' cho bootstrap grid

      // Tạo card cho sản phẩm
      const cardElement = document.createElement('div');
      cardElement.classList.add('card', 'card-product-grid');
      colElement.appendChild(cardElement);

      // Tạo phần ảnh sản phẩm
      const imgWrapElement = document.createElement('a');
      imgWrapElement.classList.add('img-wrap');
      imgWrapElement.setAttribute('href', '#');
      cardElement.appendChild(imgWrapElement);

      const imgElement = document.createElement('img');
      imgElement.setAttribute('src', product.image);
      imgElement.setAttribute('alt', product.name);
      imgWrapElement.appendChild(imgElement);

      // Tạo phần thông tin sản phẩm
      const infoWrapElement = document.createElement('div');
      infoWrapElement.classList.add('info-wrap');
      cardElement.appendChild(infoWrapElement);

      // Tạo tiêu đề sản phẩm
      const titleElement = document.createElement('a');
      titleElement.classList.add('title', 'text-truncate');
      titleElement.setAttribute('href', '#');
      titleElement.textContent = product.name;
      infoWrapElement.appendChild(titleElement);

      // Tạo giá sản phẩm
      const priceElement = document.createElement('div');
      priceElement.classList.add('price', 'mb-2');
      priceElement.textContent = `$${product.price}`; // Giá sản phẩm
      infoWrapElement.appendChild(priceElement);

      // Tạo nút Edit
      const editButton = createButton_('Edit', 'btn-brand', () => {
        editProduct(product._id, product.name, product.price, product.image);
      });
      infoWrapElement.appendChild(editButton);

      // Tạo nút Delete
      const deleteButton = createButton_('Delete', 'btn-light', () => {
        deleteProduct(product._id);
      });
      infoWrapElement.appendChild(deleteButton);

      // Thêm sản phẩm vào danh sách
      productsListElement.appendChild(colElement);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Hàm tạo button tái sử dụng
function createButton_(text, className, onClickHandler) {
  const button = document.createElement('a');
  button.setAttribute('href', '#');
  button.classList.add('btn', 'btn-sm', 'font-sm', 'rounded', className);
  button.textContent = text;
  button.addEventListener('click', onClickHandler);
  return button;
}



  function editProduct(id,name, price, image ) {
    editImage = image
    openEditModal(id,name, price, image)
  // Logic to edit the product with the given productId
  // Redirect to an edit page or perform any other necessary operations
}
  function deleteProduct(productId) {
    fetch(`http://localhost:3000/products/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(response => response.json())
    .then(result => {
      console.log('Product deleted successfully');
      // Thực hiện các thao tác cần thiết sau khi xóa sản phẩm thành công
      location.reload()

    })
    .catch(error => {
      console.error('Error deleting product:', error);
      // Xử lý lỗi nếu có
    });
  }


// modal
const createButton = document.getElementById('createButton');
const modal = document.getElementById('modal');
const closeButton = document.getElementsByClassName('close')[0];
const productForm = document.getElementById('productForm');
const categorySelect = document.getElementById('category');
const productImageInput = document.getElementById('productImage');
let editImage = ''
createButton.addEventListener('click', () => {
  modal.style.display = 'block';
});

closeButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', event => {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
});
let fileUrl = '';

productForm.addEventListener('submit', event => {
    event.preventDefault();
    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;
    const productImage = document.getElementById('productImage').files[0];
    const category = categorySelect.value;
  
    let data = {
      name: productName,
      price: productPrice,
      image: fileUrl,
      category_id: category
    };
  
    fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error creating product');
        }
        console.log(response.json()) ;
        location.reload()

      })
     
      .catch(error => {
        console.error('Error:', error.message);
        // Handle the error appropriately
      });
  });
// Fetch categories from JSON file
fetch('http://localhost:3000/categories')
  .then(response => {
    if (!response.ok) {
      throw new Error('Error fetching categories');
    }
    return response.json();
  })
  .then(data => {
    // Create options for category select
    data.forEach(category => {
      const option = document.createElement('option');
      option.value = category._id;
      option.textContent = category.name;
      categorySelect.appendChild(option);
    });
  })
  .catch(error => {
    console.error('Error fetching categories:', error);
  });
  productImageInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'nte7vuwr');
      formData.append('cloud_name', 'derz9qdf3');
      formData.append('folder', 'Cloudinary-React');
  
      try {
        const response = await fetch(
          'https://api.cloudinary.com/v1_1/derz9qdf3/image/upload',
          {
            method: 'POST',
            body: formData,
          }
        );
  
        if (response.ok) {
          const data = await response.json();
          // Xử lý dữ liệu trả về từ Cloudinary
          console.log('Upload successful:', data.url);
          fileUrl =  data.url
        } else {
          console.log('Upload failed:', response.status);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  });

//   edit 
let editedId =  '';
let editedName = document.getElementById('editName');
let editedPrice = document.getElementById('editPrice');
let editImagePreview = document.getElementById('editImagePreview');
let editedImage = '';


// Get the modal element
const editModal = document.getElementById('editModal');

// Get the close button element
const closeEditButton = document.querySelector('.closeEdit');
 
// Get the form element
const editForm = document.getElementById('editForm');

// Function to open the edit modal

function openEditModal(id,name, price, image ) {
    editModal.style.display = 'block';
    console.log(id,
        name,
        price,
        image)

        editedId =id
        editedName.value  = name
        editedPrice.value  = price
        editedImage = image
        if ( image.includes('cloudinary')) {
           
        }else{
          image =   image
        }
        editImagePreview.src = image
       
  
}

// Function to close the edit modal
 
closeEditButton.addEventListener('click', () => {
    editModal.style.display = 'none';
  });
// Add event listener to close button
// closeButton.addEventListener('click', closeEditModal);

// Add event listener to form submit
editForm.addEventListener('submit', event => {
  event.preventDefault();
  const editedName = document.getElementById('editName').value;
  const editedPrice = document.getElementById('editPrice').value;
  const editedImage = document.getElementById('editImage')?.files[0];
  
  // Call the editProduct function with the updated values
  editProductSubmit(editedId, editedName, editedPrice )
  // Close the modal
  editModal.style.display = 'none';

});

function editProductSubmit(id, name, price, image) {
    // Logic to update the product with the given productId
    // You can perform an API request, update the database, or perform any other necessary operations here
    
    // Example API request using fetch:
    fetch(`http://localhost:3000/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`

        
      },
      body: JSON.stringify({
        name: name,
        price: price,
        image: editImage
      }),
    })
      .then(response => {
        console.log(response.json())
        location.reload()

      })
     
      .catch(error => {
        console.error('Error:', error);
        // Handle any errors that occur during the update process
      });
  }