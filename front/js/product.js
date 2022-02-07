window.onload = function() {
    console.log("DOM is loaded");
    init();
}

function init(){
    const productID = new URLSearchParams(window.location.search).get("id");
    fetch("http://localhost:3000/api/products/"+productID)
    .then(res => {
        res.json()
        .then(data => {
            displayProduct(data, productID);

        })
    })
}

function displayProduct(productData, id){
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

    bindCart(id);
}

function bindCart(id){
    document.getElementById("addToCart").addEventListener("click", function(){
        addCart(id);
    })
}

function addCart(id){
    const colorSelect = document.getElementById("colors");
    const colorValue = colorSelect.options[colorSelect.selectedIndex].value;
    const qty = document.getElementById("quantity").value;;
    if (checkColor(colorValue) && checkQuantity(qty)){
        let prod = {
            _id: id,
            quantity: qty,
            color: colorValue
        };
        stockage(prod);
    }
}

function checkColor(color){ 
    if(!color){
        window.alert("Veuillez selectionner une couleur");
        return false;
    } 
    return color;
}

function checkQuantity(qty){ 
    if(parseInt(qty)<1 || parseInt(qty)>100){
        window.alert("Vous ne pouvez séléctionner que de 1 à 100 produits")
        return false;
    }
    return qty;
}

function stockage(prod){
    let cart;
    if(!localStorage.getItem("userCart")){
      cart = [];
      cart.push(prod);
    } else {
      cart = JSON.parse(localStorage.getItem("userCart"));
  
      let item = stockageControl(cart, prod);
      if (false !== item) {
        cart[item].quantity = parseInt(cart[item].quantity) + parseInt(prod.quantity);
      } else {
        cart.push(prod);
      }
    }  
    localStorage.setItem("userCart", JSON.stringify(cart));
    return cart; 
  }
  
  function stockageControl(cart, prod){
    let control = false;
    cart.forEach((elem, item) => {
      if(elem._id == prod._id && elem.color == prod.color){
        control = item;
      }     
    });  
    return control;
}