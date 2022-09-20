


let total = 0;
let addedProducts = [];




//initilize products page

window.onload = function () {

  productList = document.getElementById('productList');


  let htmlproducts = "";
  // set up the table for the products

  li = `
<h1> Product List </h1> <hr> <br>
<h2> Food </h2> <hr> <br>


<h3> Starters And Sharers </h3>
<div class="container" id="Starters"> 
</div><br>

<h3> Pub Classics </h3>
<div class="container" id="Classics"> 
</div><br>


<h3> Loaded Fries </h3>
<div class="container" id="Fries"> 
</div><br>

<h3> Stone Backed Pizza </h3>
<div class="container" id="Pizza"> 
</div><br>

<h3> Loaded Mac and Cheese </h3>
<div class="container" id="Maccaroni"> 
</div><br>

<h3> Vegan </h3>  
<div class="container" id="Vegan"> 
</div><br> 

<h3> Toasted Sandwiches </h3>
<div class="container" id="Sandwich"> 
</div><br> 

<h3> Kids</h3>
<div class="container" id="Kids"> 
</div><br>

<h3> Salads </h3>
<div class="container" id="Salad"> 
</div><br>

<h3> Sides </h3>
<div class="container" id="Side"> 
</div><br>

<h3> Burgers </h3>
<div class="container" id="Burger"> 
</div><br>

<h3> Desserts </h3>
<div class="container" id="Dessert"> 
</div><br>
 
`
  htmlproducts += li;
  productList.innerHTML = htmlproducts;


  // take a snapshot of the products database and render on the products page

  db.collection('products').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();

    changes.forEach(change => {

      if (change.type == 'added') {
        setupProducts(change.doc);
      }
    })

  })

  // set up each categories containers
  function setupProducts(doc) {

    const products = doc.data();

    let productName = "";
    let productPrice = "";
    let category = "";
    let description = "";
    let allergen = [];



    productName = products.name;
    productPrice = products.price;
    category = products.category;
    description = products.description;

    for (let i = 0; i < products.allergens.length; i++) {
      allergen.push(products.allergens[i]);
    }





    const elem = document.getElementById(category);

    li = `
  
      <div class="container grey lighten-4 z-depth-2" id="${doc.id}">
  
      
  
        <div class="col s5" id="name" style="margin: 20px;">${productName}</div>
        <div class="col s5" id="price" style="margin:20px;">£${productPrice}</div> <br>
        <div class="col s5" id="description "style="margin: 10px;">${description}</div> <br>
        <div class="col s5" style="margin: 10px;">Allergens - ${allergen}</div> <br>


        <form onsubmit="addProduct(this)" id="orderForm">
        <label for="amount">Amount</label>

        
        <input type="number" id="amount" min="1" required> 
        
        <br>
  
        <div>
        <input type="submit" value="Add To Basket" class="btn waves-effect waves-red" style="left:20%;"><i class="material-icons right" ></i>/</td><br>
        </div>
        </form>
      </div>
      
      `
    elem.innerHTML += li;
  };



};

function addProduct(x) {

  event.preventDefault();

  htmlproducts = "";


  const children = x.parentElement.children;


  let name = "";
  let price = "";
  let amount = "";
  let subtotal = 0;
  let productsMap;
  let message = "";


  for (let i = 0; i < children.length; i++) {
    if (children[i].id == "name") {
      name = children[i].innerHTML;
    }

    if (children[i].id == "message") {
      message = children[i].innerHTML;
    }

    if (children[i].id == "price") {
      price = children[i].innerHTML;
    }


    if (children[i].id == "orderForm") {
      const child = children[i];
      for (let i = 0; i < child.length; i++) {
        if (child[i].id == "amount") {
          amount = child[i].value;
        }
      }
    }

  }





  //convert price to an int and add to the total
  priceString = price.substring(1);
  let priceInt = parseFloat(priceString);




  // converting amount to a int and creating a subTotal

  let amountInt = parseFloat(amount);
  subtotal += amountInt * priceInt;

  total += subtotal;

  // construct the html elements



  let li = `
  
  ${name}
  ${price} 
  amount - ${amount} 
  subtotal - £${subtotal}

  <br> <br>

  

  `


  let order = document.getElementById("basketList");

  order.innerHTML += li;
  let footer = `
  
  Total -  £${total} <br>

  <form onsubmit="placeOrder(this)" id="orderForm">
  <label for="tableNumber">TableNumber</label>
  <input type="number" id="tableNumber" required min="1" max="55"> <br>
  
 <label for="name">Name</label>
 <input type="text" id="name" required> <br> <br>

 <label for="name">Message</label>
 <input type="text" id="message"> <br> <br>

 <input type="submit" value="Place Order" class="btn waves-effect waves-red" style="left:20%;"><i class="material-icons right" ></i>/> </td><br>
`
  document.getElementById("total").innerHTML = footer;

  // add product to the order list 

  productsMap = { amount: amount, name: name, price: price };

  addedProducts.push(productsMap);


}


function placeOrder(x) {

  event.preventDefault();

  let name = document.getElementById("name").value;
  let tableNumber = document.getElementById("tableNumber").value;
  let message = document.getElementById("message").value;

  

  db.collection('Orders').add({

    name: name,
    tableNumber: tableNumber,
    products: addedProducts,
    message: message,
    total: total


  })











}

