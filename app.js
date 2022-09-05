
let userList = [];

let person = {
  firstName: "",
  surName: "",
  Balance: 0,
  product: "show",
  account: "show"
};

const list = document.querySelector('#users');


//Kullanıcı Listesini gösteriyoruz.
const showUserList = function (person) {

  let template =
    ` <div class="form-check col col-1">
     <input class="form-check-input" placeholder="" type="checkbox" value="" id="flexCheckDefault"/>
     </div> 
     <div class="" data-label="Product Id" name="firstname" >
     ${person.firstName} ${person.surName}
     </div>
     <div class="col col-2" name="balance"data-label="Amount">${person.Balance}</div>
     <div class="col col-2" name="surname"data-label="Amount">show</div>
     <div class="col col-2" data-label="Amount">show</div>
      `
  //Liste oluşturması için 'li' tag'i yaratıyoruz.
  const mainLi = document.createElement('li')
  mainLi.classList.add('table-row');
  mainLi.innerHTML = template;
  list.appendChild(mainLi)
  return userList
}

const addUser = () => {
  let Person;
  
  Person = {
    ...person,
    firstName: document.getElementById('firstName').value,
    surName: document.getElementById('surName').value,
    Balance: document.getElementById('balance').value
  }
  userList = [...userList, Person]

  saveUserArrayLS();
  document.getElementById("addPersonForm").reset();
  showUserList(Person);
  console.log(userList)
}

const refreshPage = () => {
  document.getElementById("usersList").innerHTML = "";
  userList.forEach((item) => {
    showUserList(item);
  });
};

//Local storage'e itemlerı kaydediyoruz.
const saveUserArrayLS = () => {
  localStorage.setItem("userListLS", JSON.stringify(userList));
};
//Local storage'den itemlerı çekiyoruz.
const userListLS = localStorage.getItem("userListLS");

if (userListLS) {
  userList = JSON.parse(userListLS);
  refreshPage();
}