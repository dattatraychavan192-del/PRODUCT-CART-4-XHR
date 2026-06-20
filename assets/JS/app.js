const cl = console.log;

const productForm = document.getElementById("productForm");
const title = document.getElementById("title");
const price = document.getElementById("price");
const descriptioncontrol = document.getElementById("descripation");
const category = document.getElementById("category");
const addbt = document.getElementById("addbt");
const updatId = document.getElementById("updatId");
const image = document.getElementById("image");

const cardContaier = document.getElementById("cardContaier");

let prdArr = [];

let baseURl = "https://fakestoreapi.com";

function snackbar(msg, icon) {
  swal.fire({
    title: msg,
    icon: icon,
    timer: 2000,
  });
}

function snackbar(msg, icon) {
  swal.fire({
    title: msg,
    icon: icon,
    timer: 2000,
  });
}

const spinner = document.getElementById("spinner");

function fetchProduct() {
  spinner.classList.remove("d-none");

  let xhr = new XMLHttpRequest();
  let postUrl = "https://fakestoreapi.com/products";
  xhr.open("GET", postUrl);
  xhr.send(null);
  xhr.onload = function () {
    prdArr = JSON.parse(xhr.response);
    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
    creatProdct(prdArr);
    spinner.classList.add("d-none");
  };
}

fetchProduct();

function creatProdct(ele) {
  let result = "";
  ele.forEach((element) => {
    result += `
    <div class="col-md-4 my-4" id=${element.id}>
        <div class="card h-100  shadow "  >
        <div class="card-header">
        <div data-toggle="tooltip" data-placement="top" title="${element.title}"><h2>${element.title}</h2></div> </div>
          <div class="card-body">
          <div class="bg-light p-2 mb-2  border border-danger rounded-pill" >${element.category}</div>
          <img src="${element.image}">
           <div  class=" shadow p-2 mt-4"><strong>${element.description}</strong></div>
            <div>
            <div calass="mt-2"><p class="font-weight-bold">Price - ${element.price}$</p></div>
            
            </div>
          </div>
          <div class="card-footer d-flex justify-content-between" >
            <button class="btn btn-primary btn-sm" onclick="onEdit(this)">Edit</button>
            <button class="btn btn-danger btn-sm" onclick="onDelete(this)">Delete</button>
          </div>
       </div>
        </div>
        </div>`;
  });

  cardContaier.innerHTML = result;
}

function onSubmitHandalar(eve) {
  eve.preventDefault();
  spinner.classList.remove("d-none");

  let newObj = {
    title: title.value,
    price: price.value,
    description: descriptioncontrol.value,
    category: category.value,
    image: image.value,
  };

  let xhr = new XMLHttpRequest();
  let postURL = `${baseURl}/products`;
  xhr.open("POST", postURL);
  xhr.send(JSON.stringify(newObj));
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status <= 299) {
      let response = JSON.parse(xhr.response);
      let div = document.createElement("div");
      div.className = "col-md-4 my-4";
      div.id = response.id;

      div.innerHTML = `
      <div class="card h-100  shadow "  >
      <div class="card-header">
      <div data-toggle="tooltip" data-placement="top" title="${newObj.title}"><h2>${newObj.title}</h2></div> </div>
        <div class="card-body">
        <div class="bg-light p-2 mb-2  border border-danger rounded-pill" >${newObj.category}</div>
        <img src="${newObj.image}">
         <div  class=" shadow p-2 mt-4"><strong>${newObj.description}</strong></div>
          <div>
          <div calass="mt-2"><p class="font-weight-bold">Price - ${newObj.price}$</p></div>
          
          </div>
        </div>
        <div class="card-footer d-flex justify-content-between" >
          <button class="btn btn-primary btn-sm" onclick="onEdit(this)">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="onDelete(this)">Delete</button>
        </div>
     </div>
      </div>
      
      `;
      cardContaier.prepend(div);
      productForm.reset();
      spinner.classList.add("d-none");

      snackbar("Product add successfully.", "success");
    }
  };
}

function onEdit(ele) {
  spinner.classList.remove("d-none");

  let editId = ele.closest(".col-md-4").id;
  localStorage.setItem("editId", editId);
  let editURL = `${baseURl}/products/${editId}`;

  let xhr = new XMLHttpRequest();
  xhr.open("GET", editURL);
  xhr.send(null);
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status <= 299) {
      let editObj = JSON.parse(xhr.response);

      title.value = editObj.title;
      price.value = editObj.price;
      descriptioncontrol.value = editObj.description;
      category.value = editObj.category;
      image.value = editObj.image;

      addbt.classList.add("d-none");
      updatId.classList.remove("d-none");
      productForm.classList.remove("d-none");
      spinner.classList.add("d-none");

      productForm.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      snackbar("Something wents wrong", "error");
    }
  };
}

function onUpdatePdt(ele) {
  spinner.classList.remove("d-none");

  let updateId = localStorage.getItem("editId");

  let updateObj = {
    title: title.value,
    price: price.value,
    description: descriptioncontrol.value,
    category: category.value,
    image: image.value,
  };

  let updateURL = `${baseURl}/products/${updateId}`;
  let xhr = new XMLHttpRequest();
  xhr.open("PATCH", updateURL);
  xhr.send(JSON.stringify(updateObj));
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status <= 299) {
      let div = document.getElementById(updateId);
      div.innerHTML = `
      <div class="card h-100  shadow "  >
      <div class="card-header">
      <div data-toggle="tooltip" data-placement="top" title="${updateObj.title}"><h2>${updateObj.title}</h2></div> </div>
        <div class="card-body">
        <div class="bg-light p-2 mb-2  border border-danger rounded-pill" >${updateObj.category}</div>
        <img src="${updateObj.image}">
         <div  class=" shadow p-2 mt-4"><strong>${updateObj.description}</strong></div>
          <div>
          <div calass="mt-2"><p class="font-weight-bold">Price - ${updateObj.price}$</p></div>
          
          </div>
        </div>
        <div class="card-footer d-flex justify-content-between" >
          <button class="btn btn-primary btn-sm" onclick="onEdit(this)">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="onDelete(this)">Delete</button>
        </div>
     </div>
      </div>`;

      addbt.classList.remove("d-none");
      updatId.classList.add("d-none");
      spinner.classList.add("d-none");

      productForm.reset();

      div.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      snackbar("Product Update Successfully", "success");
    } else {
      snackbar("Something wents wrong", "error");
    }
  };
}

function onDelete(ele) {
  spinner.classList.remove("d-none");

  Swal.fire({
    title: "Are you sure?",
    text: "You want to delete it!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      let deletId = ele.closest(".col-md-4").id;
      let deletURL = `${baseURl}/products/${deletId}`;
      let xhr = new XMLHttpRequest();
      xhr.open("DELETE", deletURL);
      xhr.send(null);
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status <= 299) {
          ele.closest(".col-md-4").remove();

          snackbar("Product delete successfully.", "success");
        }
      };
    } else {
      snackbar("Something wents wrong", "error");
    }
    spinner.classList.add("d-none");
  });
}
productForm.addEventListener("submit", onSubmitHandalar);
updatId.addEventListener("click", onUpdatePdt);
