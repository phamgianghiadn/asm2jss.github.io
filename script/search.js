"use strict";

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const tableBodyEl = document.getElementById("tbody");
const btnFind = document.getElementById("find-btn");

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
  `;
    tableBodyEl.appendChild(row);
    //appendChild đưa code row vào bên trong tbody
  }
};

renderTableData(petArr);

const findPetArr = [];
btnFind.addEventListener("click", () => {
  const findPetArr = [];
  petArr.forEach((item) => {
    if (
      (item.id.includes(idInput.value) && idInput.value) ||
      (item.name.includes(nameInput.value) && nameInput.value) ||
      item.type === typeInput.value ||
      item.breed === breedInput.value ||
      item.dewormed === dewormedInput.checked ||
      item.sterilized === sterilizedInput.checked ||
      item.vaccinated === vaccinatedInput.checked
    ) {
      findPetArr.push(item);
    }
    console.log(item.name);
  });console.log(nameInput.value);
  
  renderTableData(findPetArr);
  
});
