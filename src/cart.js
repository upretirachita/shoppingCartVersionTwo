const lable = document.getElementById('lable');
const shoppingCart = document.getElementById('shopping-cart');
const cartAmount = document.getElementById('cart-amount');
let basket = JSON.parse(localStorage.getItem("data")) || []//empty array if no data has been entered;

//console.log(basket);
//console.log(shopItemData);

let calculation = () => {
    let totCalculation = 0;
    //console.log("form calculation",basket);
    //console.log(basket.map((x)=>x.item).reduce((pre,next)=>  pre+next ,0));
    totCalculation = basket.map((x)=>x.item).reduce((pre,nxt)=>  pre+nxt ,0);
    cartAmount.innerHTML = totCalculation;
}
calculation ();

let generateCartItems = () =>{
    if (basket.length !== 0) {
        return (shoppingCart.innerHTML = basket
          .map((x) => {
            //console.log("X",x);
            let {id,item} =x;
            let searchItem = shopItemData.find((el)=>el.id ===id) || []
            return `
          <div class="cart-item">
          <img width="200"src="${searchItem.img}" alt="">
          <div class="detail">
            <div class="title-price-x">
            <h4 class="name-price">
                <p>${searchItem.name}</p>
                <p class="cart-item-price">${searchItem.price}€</p>
            </h4>
            <i onclick="removeItem(${id})"class="bi bi-x-square-fill"></i>
            </div>
            <div class="buttons">
                        <i onclick="incrementProduct(${id})" class="bi bi-plus-lg"></i>
                        <div id=${id} class="quantity">${item}</div>
                        <i onclick="decrementProduct(${id})"class="bi bi-dash-lg"></i>
            </div>
            <h3 class="total-price-item-selecte">${item * searchItem.price}€</h3>
          </div>
          </div>
          `;
          })
          .join(""));
      }
    else{
    shoppingCart.innerHTML = ``;
    lable.innerHTML = `
        <h2> Cart is Empty </h2>
        <a href="index.html">
        <button class="home-button">Back to home</button>
        </a>
    `;
    }
};

generateCartItems()

const incrementProduct = (id) => {
  let selectedItem = id;
  //console.log(selectedItem.id);
  let searchItem = basket.find((x)=> x.id === selectedItem.id );
  if (searchItem === undefined){
      basket.push({
          id:selectedItem.id,
          item:1,
      });
     // console.log(basket);
  }
  else{
      searchItem.item += 1;
  }
  //console.log(basket);
  generateCartItems()
  updateProduct(selectedItem.id)
  localStorage.setItem("data",JSON.stringify(basket));
};

let decrementProduct = (id) => {
  let selectedItem = id;
  let searchItem = basket.find((x)=> x.id === selectedItem.id );
  if (searchItem === undefined) return ;
  else if (searchItem.item === 0) return ;
  else{
      searchItem.item -= 1;
  }
  //console.log(basket);
  updateProduct(selectedItem.id);
  basket = basket.filter((x)=>x.item !== 0);
  generateCartItems()
  localStorage.setItem("data",JSON.stringify(basket));
}

let updateProduct = (id) =>{
  let searchItem = basket.find((x)=> x.id ===id);
  //console.log(searchItem.item);
  document.getElementById(id).innerHTML = searchItem.item;
  calculation();
  totalAmount();
}

let totalAmount = () => {
  if (basket.length !== 0){
    //console.log("i am not empty");
    let amount = basket.map((x)=>{
      let {item,id} = x;
      let searchItem = shopItemData.find((el)=>el.id ===id) || [];
      return item * searchItem.price
    }).reduce((pre,nxt)=>pre+nxt,0)
    //console.log(amount)
    lable.innerHTML = `<div class="final-cart-total">
                            <h2>Total Bill Amount:${amount}€
                            <div class="checkout-clear-button">
                              <button class="checkout">Checkout</button>
                              <button onclick="clearCart()" class="remove-all">Clear Cart</button>
                            </div>
                        </div>
                      `
  }
  else return
}
let removeItem = (id) =>{
  let selectedItem = id;
  //console.log(selectedItem.id);
  
  basket = basket.filter((x) => x.id !== selectedItem.id);
  generateCartItems();
  totalAmount();
  calculation();
  localStorage.setItem("data",JSON.stringify(basket));
}



let clearCart = () => {
  basket = [];
  generateCartItems();
  calculation();
  localStorage.setItem("data",JSON.stringify(basket));
}
totalAmount()
