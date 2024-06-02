import axios from 'axios';

const MY_SERVER = "http://127.0.0.1:8000/products";

export function getProds() {
    return axios.get(MY_SERVER);
}

export function addProd(prod) {
    return axios.post(MY_SERVER, prod, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`
        }
    });
}

export function removeProd(prodId) {
    return axios.delete(`${MY_SERVER}/${prodId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`
        }
    });
}

export function updateProd(prodId, updatedProd) {
    const formData = new FormData();
    formData.append('name', updatedProd.name);
    formData.append('description', updatedProd.description);
    formData.append('price', updatedProd.price);
    formData.append('image', updatedProd.imageFile); // Assuming imageFile is the property containing the image file

    // Send the request with the FormData object
    return axios.put(`${MY_SERVER}/${prodId}/`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data', // Set the correct Content-Type header
            Authorization: `Bearer ${localStorage.getItem('access')}`
        },
    });
}
