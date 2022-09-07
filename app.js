
let userList = [];
let productList = [];


const selectRemitter = document.getElementById('remitter')

let person = {
  firstName: "",
  surName: "",
  Balance: 0,
  product: [],
  account: [],
  isActive: false
};



let products = {
  name: "",
  price: 0,
  quantity: 0,
};





const list = document.querySelector('#users');
const listOfProduct = document.querySelector('#products');
const listOfUserProduct = document.getElementById('usersProduct');

//Kullanıcı Listesini gösteriyoruz.
const showUserList = function (person) {
  let template =
    ` 
    <div class="form-check  col-1">
    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" >
    </div>
     <div class="" data-label="Product Id" name="firstname" >
     ${person.firstName} ${person.surName}
     </div>
     <div class="col col-2" name="balance"data-label="Amount">${person.Balance}</div>
     <button class="col col-2" name="surname"data-label="Amount">show</button>
     <button class="col col-2" data-label="Amount">show</button>
      `
  //Liste oluşturması için 'li' tag'i yaratıyoruz.
  const mainLi = document.createElement('li')
  mainLi.setAttribute('id', person.id)
  mainLi.classList.add('table-row');
  mainLi.innerHTML = template;
  list.appendChild(mainLi)
  

}

//ID üretiyoruz
const uniqueIdGenerator = () => {
  return Math.floor(Math.random() * 100000 + 1);
};

const addUser = () => {
  let Person;

  Person = {
    ...person,
    id: uniqueIdGenerator(),
    firstName: document.getElementById('firstName').value,
    surName: document.getElementById('surName').value,
    Balance: document.getElementById('balance').value,
    isActive: false
  }
  userList = [...userList, Person]
  showUserList(Person);
  localStorage.setItem("userListLS", JSON.stringify(userList));
  document.getElementById("addPersonForm").reset();

  remitterSelect()
  remitteSelect()
 
 
}


//User Products List 
const showUserProductList = function (person) {
  let template =
    ` 
     <div class="" data-label="Product Id" name="firstname" >
     ${person.firstName} ${person.surName}
     </div>
      `
  //Liste oluşturması için 'li' tag'i yaratıyoruz.
  const mainLi = document.createElement('li')
  mainLi.classList.add('table-row');
  mainLi.innerHTML = template;
  listOfUserProduct.appendChild(mainLi)

}

//Havale Bölümü

//Gönderen


function remitterSelect() {
  //listemizdeki kullanıcıları option olarak eklememiz gerekli
  selectRemitter.innerHTML = ""
  selectRemitter.innerHTML = "<option>Remitter</option>"
  userList.forEach(function (user) { //döngü içerisinde li elementlerimizi oluşturalım
    const optionRemitter = document.createElement("option")
    optionRemitter.innerText = `${user.firstName} ${user.surName}`
    optionRemitter.setAttribute('id', user.id)
    selectRemitter.appendChild(optionRemitter);

  })


}


//Alıcı
const selectRemitte = document.getElementById('remitte')

const remitteSelect = () => {
  remitterID = selectRemitter.options[selectRemitter.selectedIndex].id;



  selectRemitte.innerHTML = ""
  selectRemitte.innerHTML = "<option>Remitte</option>"
  userList.forEach((user) => {

    if (remitterID !== user.id) {
      // Gönderici olarak seçilen gözükmeyecek
      const optionRemitte = document.createElement("option")
      optionRemitte.setAttribute('id', user.id)
      optionRemitte.innerText = `${user.firstName} ${user.surName}`
      selectRemitte.appendChild(optionRemitte);

    }

  })

}

//Gönderici ismi , alıcı dropdown da olmayacak
selectRemitter.addEventListener('change', (event) => {
  remitteSelect(event.target.id)
})


//PRODUCT

const showProductList = function (product) {
  let template =
    ` 
     <div class="" data-label="Product Id" name="firstname" >
     ${product.name}
     </div>
     <div class="col col-2" name="price" data-label="Amount">${product.price}</div>
     <div class="col col-2" name="quantity" data-label="Amount">${product.quantity}</div>
     <button class="col col-2 saleBtn" data-label="Amount"> Sale </button>
      `
  //Liste oluşturması için 'li' tag'i yaratıyoruz.
  const mainLi = document.createElement('li')
  mainLi.classList.add('table-row');
  mainLi.innerHTML = template;
  listOfProduct.appendChild(mainLi)
  return productList
}
const addProduct = () => {
  let Product;

  Product = {
    ...products,
    id: uniqueIdGenerator(),
    name: document.getElementById('productName').value,
    price: document.getElementById('price').value + '$',
    quantity: document.getElementById('quantity').value
  }
  productList = [...productList, Product]
  showProductList(Product)
  localStorage.setItem("productListLS", JSON.stringify(productList));
  document.getElementById("addProductForm").reset();


}


const tranferMoney =  function(){
  remitteID = selectRemitte.options[selectRemitte.selectedIndex].id;
  remitterID = selectRemitter.options[selectRemitter.selectedIndex].id;
  const money = document.getElementById('transferMoney').value
 


   userList.forEach(user=>{
    if (user.id == remitterID && money<=user.Balance){
    
      user.Balance = user.Balance - parseInt(money)
      console.log(user.Balance)
      userList.find((user)=>{
        if(user.id == remitteID)
    {
     user.Balance = parseInt(user.Balance) + parseInt(money)
     console.log(user.Balance)
    }
      })
     
    }
    
  })
 

  document.getElementById('transferMoney').value="";

  localStorage.setItem("userListLS", JSON.stringify(userList));
  document.querySelector('#usersList').innerHTML="";
}


  const LocalStorageList = () => {
    const userListLS = localStorage.getItem("userListLS");
    if (userListLS) {
      userList = JSON.parse(userListLS);

      userList.forEach(person => {
        showUserList(person);
        tranferMoney(person)
      })
     
    }
    const productListLS = localStorage.getItem("productListLS");
    if (productListLS) {
      productList = JSON.parse(productListLS);

      productList.forEach(product => {
        showProductList(product);
      });
    }
  }
  LocalStorageList();
