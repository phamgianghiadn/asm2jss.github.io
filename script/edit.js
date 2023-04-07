"use strict";
const tableBodyEl = document.getElementById("tbody");
const containerFormEL = document.getElementById("container-form");
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

let renderTableData = (pet) => {
  tableBodyEl.innerHTML = ""; //xóa nộ dung hiển thị của bảng.

  for (let i = 0; i < pet.length; i++) {
    const row = document.createElement("tr"); // tạo 1 thẻ tr
    row.innerHTML = `
    <th scope="row">${pet[i].id}</th>
    <td>${pet[i].name}</td>
    <td>${pet[i].age}</td>
    <td>${pet[i].type}</td>
    <td>${pet[i].weight} kg</td>
    <td>${pet[i].length} cm</td>
    <td>${pet[i].breed}</td>
    <td>
      <i class="bi bi-square-fill" style="color: ${pet[i].color}"></i>
    </td>
    <td><i class="bi ${
      pet[i].vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      pet[i].dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      pet[i].sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
    } "></i></td>
    <td> ${new Date(pet[i].date).getDate()}/${
      new Date(pet[i].date).getMonth() + 1
    }/${new Date(pet[i].date).getFullYear()}</td>
    
    <td>
	<button class="bg-warning" onclick="editPet('${pet[i].id}')">Edit</button>
</td>
  `;
    tableBodyEl.appendChild(row);
    //appendChild đưa code row vào bên trong tbody
  }
};

renderTableData(petArr);

const editPet = (petId) => {
  //khi kik vào sẽ xóa class hide để hiện bảng chỉnh sửa
  containerFormEL.classList.remove("hide");
  
  const selectedItem = petArr.filter((item) => item.id === petId);
  //  console.log(selectedItem);
  idInput.value = selectedItem[0].id;
  nameInput.value = selectedItem[0].name;
  ageInput.value = selectedItem[0].age;
  typeInput.value = selectedItem[0].type;
  weightInput.value = selectedItem[0].weight;
  lengthInput.value = selectedItem[0].length;
  colorInput.value = selectedItem[0].color;
  breedInput.value = selectedItem[0].breed;
  vaccinatedInput.checked = selectedItem[0].vaccinated;
  dewormedInput.checked = selectedItem[0].dewormed;
  sterilizedInput.checked = selectedItem[0].sterilized;

  renderBreed(breedArr, selectedItem[0].type);
};
//tạo 1 biến
const renderBreed = (breedRen, type) => {
  //tạo 1 select breed để tránh bị lỗi
  breedInput.innerHTML = `<option> Select Breed </option>`;
  //tạo vòng lặp của breedRen mà khi mình truyền vào là LoLo của thằng breedArr
  breedRen.forEach((item, index) => {
    // nếu type của bên breed giống type bên trang chủ thì show các breed đó ra
    if (item.type === type) {
      const option = document.createElement("option");
      option.innerHTML = `${item.name}`;
      breedInput.appendChild(option);
    }
  });
};
submitBtn.addEventListener("click", () => {
  petArr.forEach((item) => {
    if (item.id === idInput.value) {
      item.name = nameInput.value;
      item.age = parseInt(ageInput.value);
      item.type = typeInput.value;
      item.weight = parseInt(weightInput.value);
      item.length = parseInt(lengthInput.value);
      item.color = colorInput.value;
      item.breed = breedInput.value;
      item.vaccinated = vaccinatedInput.checked;
      item.dewormed = dewormedInput.checked;
      item.sterilized = sterilizedInput.checked;
    }
  });
  
  renderTableData(petArr);
  saveToStorage("petArr", JSON.stringify(petArr));
  containerFormEL.classList.add("hide");
});
