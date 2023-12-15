let ProductName = document.getElementById('ProductName')
let ProductPrice = document.getElementById('ProductPrice')
let ProductCategory = document.getElementById('ProductCategory')
let ProductDesc = document.getElementById('ProductDesc')
let tableRow = document.getElementById('tableRow')
let addbtn = document.getElementById('addbtn') 
let EmptyData = document.getElementById('EmptyData')
let ValidName = document.getElementById('ValidName')
let productarr ;

(function(){
    if(localStorage.getItem('productData') == null){
        productarr = []
    }
    else {
        productarr = JSON.parse(localStorage.getItem('productData'))
        displayProduct(productarr)
    }
})()

addbtn.onclick = function(){
    if(addbtn.innerHTML == 'update')
    finaledit()
    else
    addproduct()
}


function addproduct(){
  if(checkisEmpty() == false && CheckNamValidate() == true ){
    let product = {
        pN:ProductName.value,
        pP:ProductPrice.value,
        pC:ProductCategory.value,
        pD:ProductDesc.value
    }
    productarr.push(product)
    localStorage.setItem('productData',JSON.stringify(productarr))
    displayProduct(productarr)
    clearvalue()
  }
}


function displayProduct(arr){
    let box = '';
    for(let i=0 ; i<arr.length;i++){
        box+=` <tr>
        <td>${i + 1}</td>
        <td>${arr[i].pN}</td>
        <td>${arr[i].pP}</td>
        <td>${arr[i].pC}</td>
        <td>${arr[i].pD}</td>
        <td><button class="btn btn-outline-danger" onclick= "deleteprod(${i})">Delete</button></td>
        <td><button class="btn btn-outline-primary" onclick="updateproduct(${i})">Update</button></td>
    </tr>`
    }
    tableRow.innerHTML = box
}

function deleteprod(index){
    productarr.splice(index , 1)
    localStorage.setItem('productData' , JSON.stringify(productarr))
    displayProduct(productarr)
}

function clearvalue(){
    ProductName.value = '';
    ProductPrice.value = '';
    ProductDesc.value = ''
    ProductCategory.value = ''
}

let globalIndex;

function updateproduct(index){
    globalIndex = index
    ProductName.value = productarr[index].pN;
    ProductPrice.value = productarr[index].pP;
    ProductCategory.value = productarr[index].pC
    ProductDesc.value = productarr[index].pD
    addbtn.innerHTML = "update"
}


function finaledit(){
    productarr[globalIndex].pN = ProductName.value
    productarr[globalIndex].pP = ProductPrice.value
    productarr[globalIndex].pC = ProductCategory.value
    productarr[globalIndex].pD = ProductDesc.value;
    displayProduct(productarr)
    localStorage.setItem("productData" , JSON.stringify(productarr))
    clearvalue()
    addbtn.innerHTML = "Add product"
}


function searchproduct(ele){
    let searchedArr=[];
    for(let i=0 ; i<productarr.length ; i++){
        if(productarr[i].pN.toLowerCase().includes(ele.toLowerCase()))
        {
            searchedArr.push(productarr[i])
        }
    }
    displayProduct(searchedArr)
}



function checkisEmpty(){
    if(ProductName.value == '' || ProductPrice.value == '' || ProductDesc.value == '' || ProductCategory.value == ''){
      EmptyData.innerHTML = '<p class="alert alert-danger text-center">This data must be filled </p>'
      return true;
    }
    else{
        EmptyData.innerHTML = ''
      return false
    }
  }


  function CheckNamValidate(){
    let NameRegex = /^[A-Z][a-z]{10,}$/
    if(NameRegex.test(ProductName.value)){
        ValidName.innerHTML = ''
        return true
    }
    else {
        ValidName.innerHTML = '<p class="alert alert-danger text-center">start with capital letter and must contain at least 10 characters  </p>'
        return false
    }

  }

