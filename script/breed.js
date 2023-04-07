"use strict";
const submitBreed = document.getElementById("submit-btn");
const inputBreed = document.getElementById("input-breed");
const typeBreed = document.getElementById("input-type");
const tbodyBreed = document.getElementById("tbody");

// const breedArr = JSON.parse(localStorage.getItem("breedArr")) ?? [];



submitBreed.addEventListener("click", () => {
  // lấy dữ liệu
  const breedData = {
    name: inputBreed.value,
    type: typeBreed.value,
    id: breedArr.length + 1,
  };

  // dữ liệu đầu vào có hợp lệ hay ko
  if (inputBreed.value.trim() === "") {
    alert(" hãy nhập breed");
    return; // để dừng luôn nếu không thỏa mãn điều kiện
  }
  if (typeBreed.value === "Select Type") {
    alert(" hãy nhập type");
    return;
  }
  //nếu hợp lệ sẽ thêm vào
  breedArr.push(breedData);
  // localStorage.setItem("breedArr", JSON.stringify(breedArr));
  saveToStorage('breedArr', JSON.stringify(breedArr));
  //hiển thị danh sách
  renderBreedTable(breedArr);
  
  // xóa dữ liệu nhập trong form
  clearBreed();
});

const clearBreed = () => {
  inputBreed.value = "";
  typeBreed.value = "Select Type";
};

let renderBreedTable = (breedPet) => {
  tbodyBreed.innerHTML = "";
  breedArr.forEach((item, index) => {
    const rowBreed = document.createElement("tr");
    rowBreed.innerHTML = `
    <td>${index + 1}</td>
    <td>${item.name}</td>
    <td>${item.type}</td>
    <td>
    <button class="btn btn-danger" onclick="deleteBreed('${
      item.id
    }')">Delete</button>
  </td>`;
    tbodyBreed.appendChild(rowBreed);
  });

 
};
renderBreedTable(breedArr);

const deleteBreed = (id) => {
  const isDelete = confirm("Are you sure?");
  breedArr.forEach((item, index) => {
    if (item.id === parseInt(id)) {
      breedArr.splice(index, 1);
    }
  });
 

  saveToStorage('breedArr', JSON.stringify(breedArr));
  renderBreedTable(breedArr);
};




