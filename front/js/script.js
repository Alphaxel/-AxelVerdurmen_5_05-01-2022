function init(){
    fetch("http://localhost:3000/api/products")
    .then(res => {
        res.json()
        .then(data => {
            displayProduct(data);
        })
    })
    /*const productRawData = await fetch("http://localhost:3000/api/products");
    console.log(productRawData.status);
    if(productRawData.ok){
        const productData= await productRawData.json();
    } else {
        console.log(productRawData.status)
    }*/
}
function displayProduct(data){
    for(i in data){
        createProduct(data[i]);
    }
}

function createProduct(product) {
    let productLink =  document.createElement("a");
    productLink.setAttribute("href","product.html?id="+ product._id);
    let productArticle = document.createElement("article");
    let productImg = document.createElement("img");
    productImg.setAttribute("src", product.imageUrl);
    productImg.setAttribute("alt",product.altTxt);
    productImg.setAttribute("class","img-fluid");
    let productName = document.createElement("h3");
    productName.setAttribute("class","productName");
    productName.textContent = product.name;
    let productText = document.createElement("p");
    productText.setAttribute("class","productDescription")
    productText.textContent = product.description;
    productArticle.append(productImg, productName, productText);
    productLink.append(productArticle);
    document.getElementById("items").append(productLink)
}   


/*
<a href="./product.html?id=" + data[0]._id>
    <article>
        <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
        <h3 class="productName">Kanap name1</h3>
        <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
    </article>
</a> 
*/

window.onload = function() {
    console.log("DOM is loaded");
    init();
}