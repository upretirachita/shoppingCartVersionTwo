const shop = document.getElementById('shop');
const search = document.querySelector(".search");
const productName = document.getElementsByClassName("productName");
const cartAmount = document.getElementById('cart-amount');
const lowToHigh = document.getElementById('high-price');
const highToLow = document.getElementById('low-price');
const ageSelected = document.getElementsByClassName('age-selected');
const selectByAge = document.querySelectorAll('.slect-by-age');
let basket = JSON.parse(localStorage.getItem("data")) || []//empty array if no data has been entered;
const itemGeneratedDetail = document.querySelector(".item-generated-detail");
// console.log(shop)
// console.log(basket)
let generateShop = () => {
    return (shop.innerHTML = shopItemData.map((x) =>{
            //Destructuring
            let {id,name,age,price,img} = x;
            let searchItem = basket.find((x) => x.id === id) || [];
            return  `<div id=product-id-${id} class="item">
            <img onclick="generateItemDetail(${id})" src="${img}" alt="">
            <div class="details">
                <h3 class="productName">${name}</h3>
                <p class="age-selected">Age:${age}</p>
                <div class="price-quantity">
                    <h2>${price}€</h2>
                    <div class="buttons">
                        <i onclick="incrementProduct(${id})" class="bi bi-plus-lg"></i>
                        <div id=${id} class="quantity">(${searchItem.item===undefined?0:searchItem.item})</div>
                        <i onclick="decrementProduct(${id})"class="bi bi-dash-lg"></i>
                    </div>
                </div>
            </div>
        </div>`
    }).join(""));   
}

generateShop()

generateItemDetail = (id) => {
    selectedItem = id;
    // console.log(selectedItem)
    // console.log(shopItemData[0].id)
    // console.log(selectedItem.id)
    for (let i=0;i<shopItemData.length;i++){
        if(shopItemData[i].id.includes(selectedItem.id)){
            // console.log(shopItemData[i].name);
            shop.innerHTML=`
                <div class="product-generated-detail">
                        <h4 onclick="generateShop()">Back</h4>
                    <div class="total-section">
                            <img src="${shopItemData[i].img}" alt="">
                        <div class="right-section">
                            <h2>Name:${shopItemData[i].name}</h2>
                            <h3>Age:${shopItemData[i].age}</h3>
                            <h3>Price:${shopItemData[i].price}</h3>
                            <p>Description:${shopItemData[i].desc}</p>
                        </div>
                    </div>
                </div>
            `;
        }
    }
}


search.addEventListener("input",() =>{
    console.log("search",search.value)
    Array.from(productName).forEach(el => {
      //console.log(element);
      //console.log(el.innerText);
      console.log(search.value.toLowerCase())
      if(el.innerText.toLowerCase().includes(search.value.toLowerCase())){
          el.parentElement.parentElement.style.display=""
      }
      else {
          el.parentElement.parentElement.style.display="none"
      }
  }); 
     
  })

selectByAge.forEach(element => {
    // console.log("from Age selection",shopItemData);
    // console.log(element)
    element.addEventListener("click",() => {
      Array.from(ageSelected).forEach(el => {
         console.log(el);
        console.log(el.innerText)
        if(el.innerText.includes(element.innerText)||element.innerText=="All"){
          el.parentElement.parentElement.style.display="flex"
        }
        else {
          el.parentElement.parentElement.style.display="none"
          }
        });  
    })
});

lowToHighPrice = () =>{
    // console.log(shopItemData[0].price)
    shopItemData.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    shopItemData.sort(function(a, b) {
      return parseFloat(a.price) - parseFloat(b.price);
    });
    // console.log(shopItemData);
    generateShop();
}

highToLowPrice = () => {
    shopItemData.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    shopItemData.sort(function(a, b) {
      return parseFloat(b.price) - parseFloat(a.price);
    });
    generateShop();
}


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
    localStorage.setItem("data",JSON.stringify(basket));

}
let updateProduct = (id) =>{
    let searchItem = basket.find((x)=> x.id ===id);
    //console.log(searchItem.item);
    document.getElementById(id).innerHTML = searchItem.item;
    calculation()
}

let calculation = () => {
    let totCalculation = 0;
    //console.log("form calculation",basket);
    //console.log(basket.map((x)=>x.item).reduce((pre,next)=>  pre+next ,0));
    totCalculation = basket.map((x)=>x.item).reduce((pre,nxt)=>  pre+nxt ,0);
    cartAmount.innerHTML = totCalculation;
}

lowToHigh.addEventListener("click",lowToHighPrice );
highToLow.addEventListener("click",highToLowPrice );
calculation ();