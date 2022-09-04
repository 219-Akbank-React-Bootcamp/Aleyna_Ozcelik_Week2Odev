const list = document.querySelector('#users');
const firstname = document.getElementById('firstName');
const surname = document.getElementById('surName');
const balance = document.getElementById('balance');
const addBtn = document.getElementById('useraddBtn');
document.addEventListener("DOMContentLoaded", getUsers);
addBtn.addEventListener("click", addUser);

//Add User to List
function addUser(e) {
    e.preventDefault();

    const userLi = document.createElement("li");
    userLi.classList.add("table-row");
    //Create list
    const UserList = userLi.innerHTML =
        ` <div class="form-check col col-1">
     <input class="form-check-input" placeholder="" type="checkbox" value="" id="flexCheckDefault"/>
    
     </div> 
      <div class="" data-label="Product Id">${firstname.value} ${surname.value}</div>
      <div class="col col-2" data-label="Amount">${balance.value}$</div>
      <div class="col col-2" data-label="Amount">show</div>
      <div class="col col-2" data-label="Amount">show</div>`
    list.appendChild(userLi);
    saveLocalUsers(UserList);

}
function saveLocalUsers(user) {
    let users;
    if (localStorage.getItem("users") === null) {
        users = [];
    } else {
        users = JSON.parse(localStorage.getItem("users"));
    }
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
}
function getUsers() {
    let users;
    if (localStorage.getItem("users") === null) {
        users = [];
    } else {
        users = JSON.parse(localStorage.getItem("users"));
    }
    users.forEach(function (user) {
        //Create user li
        const userLi = document.createElement("li");
        userLi.classList.add("table-row");

        //Create list
        userLi.innerHTML = user;
        list.appendChild(userLi);

    });
}
//Get Product List 
fetch('https://dummyjson.com/products')
.then(res => res.json())
.then(console.log);

