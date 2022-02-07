let totalQty=0;
let totalPrice=0;

window.onload = function() {
    console.log("DOM is loaded");
    init();
}

function init(){
    checkCart()
}
function checkCart(){
    if (!localStorage.getItem("userCart")){
        document.getElementsByTagName("h1")[0].textContent= "Votre panier est vide";
    }else {
        displayCart();
    }
}

function displayCart(){
    cart= JSON.parse(localStorage.getItem("userCart"));
    for (i in cart){
        fetch("http://localhost:3000/api/products/"+cart[i]._id)
        .then(res => {
            res.json()
            .then(data => {
                data.quantity=cart[i].quantity;
                data.colors=cart[i].color;
                displayProduct(data);
            })
        })
    }
    getElem();
}

function displayProduct(data){
    totalPrice= totalPrice+data.price;
    totalQty= totalQty+parseInt(data.quantity);
    let prodArticle= document.createElement("article");
    prodArticle.setAttribute("class", "cart__item");
    prodArticle.setAttribute("data_id", data._id);
    prodArticle.setAttribute("data-color", data.colors);

    
    let prodDivImg= document.createElement("div");
    prodDivImg.setAttribute("class", "cart__item__img");
    let prodImg= document.createElement("img");
    prodImg.setAttribute("src", data.imageUrl);
    prodImg.setAttribute("alt", data.altTxt);
    prodDivImg.append(prodImg);
    document.getElementById("cart__items").appendChild(prodArticle);

    let prodDivContent= document.createElement("div");
    prodDivContent.setAttribute("class", "cart__item__content");


    let prodDivDesc= document.createElement("div");
    prodDivDesc.setAttribute("class", "cart__item__content__description");
    let prodName= document.createElement("h2");
    prodName.textContent= data.name;
    let prodColor= document.createElement("p");
    prodColor.textContent= "Couleur : " + data.colors;
    let prodPrice= document.createElement("p");
    prodPrice.textContent= "Prix : " + data.price + " €";
    prodDivDesc.append(prodName, prodColor, prodPrice);

    let prodDivSettings= document.createElement("div");
    prodDivSettings.setAttribute("class", "cart__item__content__settings");

    let prodDivQty= document.createElement("div");
    prodDivQty.setAttribute("class", "cart__item__content__settings__quantity");
    let prodQtyField= document.createElement("p");
    prodQtyField.textContent= "Qté : "
    let prodQtyInput= document.createElement("input");
    prodQtyInput.setAttribute("class", "itemQuantity");
    prodQtyInput.setAttribute("name","itemQuantity");
    prodQtyInput.setAttribute("min","1");
    prodQtyInput.setAttribute("max","100");
    prodQtyInput.setAttribute("value",data.quantity);
    prodDivQty.append(prodQtyField, prodQtyInput);
    prodDivSettings.append(prodDivQty);

    prodDivContent.append(prodDivDesc, prodDivSettings);
    prodArticle.append(prodDivImg, prodDivContent);

}
//doit supprimer le produit bindé (closest)  (+ update local storage)
function deleteProduct(){

}
//modifie le prix total en fonction de delete ou changement dans champs
function modifTotalPrice(){

}
//modifie la quantité totale en fonction de delete ou changement dans champs
function modifTotalQty(){

}
//modifie la quantité d'un seul produit (+ update local storage)
function modifQty(){

}

//Formulaire contact
function getElem(){
    let submitButton=document.getElementById("order");
    submitButton.addEventListener("click",fonctionàfaire);
}

function fonctionàfaire(event){
    event.preventDefault();
    //controler champs du formulaire
    sendData(data);
}

function sendData(data){
    fetch("http://localhost:3000/api/products/"+"/order",{

    })
}