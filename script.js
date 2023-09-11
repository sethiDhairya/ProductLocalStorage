document.addEventListener("DOMContentLoaded", function () {
    displayProducts();
    
    document.getElementById("updateQuantityButton").addEventListener("click", updateProductQuantity);
    document.getElementById("addProductButton").addEventListener("click", addProduct);
});

function addProduct() {
    const productName = document.getElementById("productName").value;
    const productQuantity = document.getElementById("productQuantity").value;
    const productPrice = document.getElementById("productPrice").value;
    const productId = document.getElementById("productId").value;

    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];

    existingProducts.push({
        id: productId,
        name: productName,
        quantity: parseInt(productQuantity),
        price: parseFloat(productPrice),
    });

    localStorage.setItem("products", JSON.stringify(existingProducts));

    document.getElementById("productName").value = "";
    document.getElementById("productQuantity").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productId").value = "";
    displayProducts();
}

function displayProducts() {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    const products = JSON.parse(localStorage.getItem("products")) || [];

    products.forEach((product) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${product.name}</strong> (ID: ${product.id}) - Quantity: ${product.quantity} - Price: $${product.price.toFixed(2)}`;
        productList.appendChild(listItem);
    });

    updateProductDropdown(products);
}

function updateProductDropdown(products) {
    const updateDropdown = document.getElementById("updateProductDropdown");
    updateDropdown.innerHTML = "<option value=''>Select Product to Update Quantity</option>";

    products.forEach((product) => {
        const option = document.createElement("option");
        option.value = product.id;
        option.text = `${product.name} (ID: ${product.id})`;
        updateDropdown.appendChild(option);
    });
}

function updateProductQuantity() {
    const productId = document.getElementById("updateProductDropdown").value;
    const newQuantity = parseInt(document.getElementById("updateQuantity").value);

    if (!isNaN(newQuantity) && newQuantity >= 0) {
        const products = JSON.parse(localStorage.getItem("products")) || [];
        const productIndex = products.findIndex((product) => product.id === productId);

        if (productIndex !== -1) {
            products[productIndex].quantity = newQuantity;
            localStorage.setItem("products", JSON.stringify(products));
            displayProducts();
        }
    }
}
