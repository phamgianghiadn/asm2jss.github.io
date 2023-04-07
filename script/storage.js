"use strict";
//thêm sự kiện vào sidebar
const navEl = document.getElementById("sidebar");
//bắt sự kiện vào
navEl.addEventListener("click", function () {
  //toggle nếu không có class thì xóa đi nếu có thì sẽ thêm
  navEl.classList.toggle("active");
});

// tạo 2 biến  
const breedArr = getFromStorage('breedArr',[]);
const petArr = getFromStorage("petArr") ?? [];
//Lưu dữ liệu dưới LocalStorage


function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}



function getFromStorage(key, d) {
  return JSON.parse(localStorage.getItem(key))  ?? d;
}
