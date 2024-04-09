
const accessToken = localStorage.getItem('accessToken'); // Lấy accessToken từ localStorage
console.log(accessToken);

document.addEventListener('DOMContentLoaded', () => {

fetch('http://localhost:3000/categories')
    .then(response => response.json())
    .then(categories => {
        console.log(categories)
        const categoriesListElement = document.getElementById('categoriesList');

        categories.forEach(category => {
            const categoryElement = document.createElement('div');
            categoryElement.classList.add('col'); // Thêm class 'col' cho bootstrap grid

            const cardElement = document.createElement('div');
            cardElement.classList.add('card', 'card-product-grid');
            categoryElement.appendChild(cardElement);

            const imgWrapElement = document.createElement('a');
            imgWrapElement.classList.add('img-wrap');
            imgWrapElement.setAttribute('href', '#');
            cardElement.appendChild(imgWrapElement);

            const imgElement = document.createElement('img');
            imgElement.setAttribute('src', category.image);
            imgElement.setAttribute('alt', category.name);
            imgWrapElement.appendChild(imgElement);

            const infoWrapElement = document.createElement('div');
            infoWrapElement.classList.add('info-wrap');
            cardElement.appendChild(infoWrapElement);

            const titleElement = document.createElement('a');
            titleElement.classList.add('title', 'text-truncate');
            titleElement.setAttribute('href', '#');
            titleElement.textContent = category.name;
            infoWrapElement.appendChild(titleElement);

            const priceElement = document.createElement('div');
            priceElement.classList.add('price', 'mb-2');
            infoWrapElement.appendChild(priceElement);

            const editButton = createButton_('Edit', 'btn-brand', () => {
                openEditCategoryModal(category._id, category.name, category.image);
            });
            infoWrapElement.appendChild(editButton);

            const deleteButton = createButton_('Delete', 'btn-light', () => {
                deleteCategory(category._id);
            });











            
            infoWrapElement.appendChild(deleteButton);
            console.log(categoryElement)
            categoriesListElement.appendChild(categoryElement);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });

})
function createButton_(text, className, onClickHandler) {
    const button = document.createElement('a');
    button.setAttribute('href', '#');
    button.classList.add('btn', 'btn-sm', 'font-sm', 'rounded', className);
    button.textContent = text;
    button.addEventListener('click', onClickHandler);
    return button;
}
function deleteCategory(categoryId) {
    console.log(categoryId)
        // Logic to delete the category with the given categoryId
        // Send a DELETE request to the server or perform any other necessary operations
    fetch(`http://localhost:3000/categories/${categoryId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(response => response.json())
        .then(result => {
            location.reload();
            console.log('Product deleted successfully');
            // Thực hiện các thao tác cần thiết sau khi xóa sản phẩm thành công
        })
        .catch(error => {
            console.error('Error deleting product:', error);
            // Xử lý lỗi nếu có
        });
}




// create

// Get the modal element
const createCategoryModal = document.getElementById('createCategoryModal');
const createButton = document.getElementById('createButton');
const cateImageInput = document.getElementById('categoryImage');
createButton.addEventListener('click', openCreateCategoryModal);
let fileUrl = ''

// Get the close button element
const closeCategoryModalButton = createCategoryModal.querySelector('.close');

// Get the form element
const createCategoryForm = document.getElementById('createCategoryForm');

// Function to open the create category modal
function openCreateCategoryModal() {
    console.log('fawef')
    createCategoryModal.style.display = 'block';
}

// Function to close the create category modal
function closeCreateCategoryModal() {
    createCategoryModal.style.display = 'none';
}

// Add event listener to close button
closeCategoryModalButton.addEventListener('click', closeCreateCategoryModal);

// Add event listener to form submit
createCategoryForm.addEventListener('submit', event => {
    event.preventDefault();
    const categoryName = document.getElementById('categoryName').value;
    const categoryImage = document.getElementById('categoryImage').files[0];
    let data = {
            name: categoryName,
            image: fileUrl
        }
        // Call the createCategory function with the entered values
    fetch('http://localhost:3000/categories', {
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
            location.reload()

        })

    .catch(error => {
        console.error('Error:', error.message);
        // Handle the error appropriately
    });

    // Close the modal
    closeCreateCategoryModal();
});

cateImageInput.addEventListener('change', async(event) => {
    const file = event.target.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'nte7vuwr');
        formData.append('cloud_name', 'derz9qdf3');
        formData.append('folder', 'Cloudinary-React');

        try {
            const response = await fetch(
                'https://api.cloudinary.com/v1_1/derz9qdf3/image/upload', {
                    method: 'POST',
                    body: formData,
                }
            );

            if (response.ok) {
                const data = await response.json();
                // Xử lý dữ liệu trả về từ Cloudinary
                console.log('Upload successful:', data.url);
                fileUrl = data.url
            } else {
                console.log('Upload failed:', response.status);
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }
})













// edit category
let editedId = '';
let editedName = document.getElementById('editCategoryName');
let editImagePreview = document.getElementById('editImagePreview');
let editedImage = '';


// Get the modal element
function editCategory(categoryId, name) {
    // Logic to edit the category with the given categoryId
    // Redirect to an edit page or perform any other necessary operations
    // openEditCategoryModal()
    editedName.value = name
        // if ( image?.includes('cloudinary')) {

    // }else{
    //   image = './assets/category/' +  image
    // }
    // editImagePreview.src = image


    fetch(`http://localhost:3000/categories/${categoryId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                name: name,
                image: editedImage
            }),
        })
        .then(response => {
            location.reload()
            console.log(response.json())
        })

    .catch(error => {
        console.error('Error:', error);
        // Handle any errors that occur during the update process
    });
}

const editCategoryModal = document.getElementById('editCategoryModal');

// Get the close button element
const closeEditCategoryModalButton = editCategoryModal.querySelector('.modal-content .close');

// Get the form element
const editCategoryForm = document.getElementById('editCategoryForm');

// Function to open the edit category modal
function openEditCategoryModal(id, name, image) {
    editedId = id
    console.log(editedId)

    editedName.value = name
    editedImage = image
    console.log(editedImage)

    if (typeof image === 'string' && image?.includes('cloudinary')) {

    } else {
        image = './assets/category/' + image
    }
    editImagePreview.src = image
    editCategoryModal.style.display = 'block';
}

// Function to close the edit category modal
function closeEditCategoryModal() {
    editCategoryModal.style.display = 'none';
}
// Add event listener to close button
closeEditCategoryModalButton.addEventListener('click', closeEditCategoryModal);

// Add event listener to form submit
editCategoryForm.addEventListener('submit', event => {
    event.preventDefault();
    const editedCategoryName = document.getElementById('editCategoryName').value;

    // Call the editCategory function with the edited values
    editCategory(editedId, editedCategoryName);

    // Close the modal
    closeEditCategoryModal();
});