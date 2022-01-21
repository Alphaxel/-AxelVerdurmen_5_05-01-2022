function init(){
    const productID = new URLSearchParams(window.location.search).get("id");
    fetch("http://localhost:3000/api/products/"+productID)
    .then(res => {
        res.json()
        .then(data => {
            displayProduct(data);
        })
    })
}

function displayProduct(productData){
    for(i in productData.colors){
        const prodOpt = document.createElement("option");
        prodOpt.setAttribute("value", productData.colors[i]); 
        prodOpt.textContent = productData.colors[i];
        document.getElementById("colors").appendChild(prodOpt);
    }
    const prodImg = document.createElement("img");
    prodImg.setAttribute("src", productData.imageUrl);
    prodImg.setAttribute("alt",productData.altTxt);
    document.getElementsByClassName("item__img")[0].appendChild(prodImg);
    document.getElementById("title").textContent=productData.name;
    document.getElementById("price").textContent=productData.price;
    document.getElementById("description").textContent=productData.description;
}

window.onload = function() {
    console.log("DOM is loaded");
    init();
}

