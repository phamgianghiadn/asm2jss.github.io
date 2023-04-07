"use strict";
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

const tableBodyEl = document.getElementById("tbody");
const btnHealthy = document.getElementById("healthy-btn");

console.log(petArr);
// I.Bắt sự kiện Click vào nút "Submit"

submitBtn.addEventListener("click", function () {
  // II.Lấy dữ liệu từ các Form Input
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    bmi: null, //null chưa gán gia trị
    date: new Date(),
  };

  //III. Validate dữ liệu. dữ liệu đầu vào có hợp lệ không
  //1. hợp lệ thì thực hiện các bước 3,4,5
  //2. nếu không hợp lệ thì thực hiện các thông báo

  const validate = validateData(data);

  if (validate) {
    // IV.Thêm thú cưng vào danh sách
    petArr.push(data);
    saveToStorage("petArr", JSON.stringify(petArr));
    // V. Hiển thị danh sách thú cưng
    renderTableData(petArr);
    // VI. Xóa các dữ liệu nhập trong Form Input
    clearInput();
  }
});

//hiển thị dữ liệu trong mảng

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
	<button class="btn btn-danger" onclick="deletePet('${
    pet[i].id
  }')">Delete</button>
</td>
  `; ////petArr[i].bmi ? petArr[i].bmi : '?' thay ở dong 82
    tableBodyEl.appendChild(row);
    //appendChild đưa code row vào bên trong tbody
  }
};

renderTableData(petArr);

const deletePet = (petId) => {
  // Confirm before deletePet
  const isDelete = confirm("Are you sure?");
  if (isDelete) {
    for (let i = 0; i < petArr.length; i++) {
      if (petId === petArr[i].id) {
        petArr.splice(i, 1);
        //i sẽ qua vòng lặp,nếu đầu tiên bị trùng giá trị sẽ là 0 ,tương tự các dong khác, nó sẽ xóa 1 phần tử
      }
    }
    //sau đó phải gọi lại
    renderTableData(petArr);
    saveToStorage("petArr", JSON.stringify(petArr));
  }
};
let healthyPetArr = [];
let healthyCheck = false;
btnHealthy.addEventListener("click", function () {
  healthyCheck = !healthyCheck; //(tức là true -in đậm
  if (healthyCheck === true) {
    //1.hiển thị các thú cưng khỏe mạnh
    // khai báo 1 array mới
    let healthyPetArr = [];
    // lọc trong mảng petArr ra những thú cưng khỏe mạnh.
    for (let i = 0; i < petArr.length; i++) {
      if (
        petArr[i].vaccinated === true &&
        petArr[i].sterilized === true &&
        petArr[i].dewormed === true
      ) {
        // thêm thú cung vào mảng mới
        healthyPetArr.push(petArr[i]);
      } //gọi hàm hiển thị
    }
    renderTableData(healthyPetArr);
    //2.đổi tên nút thành Show all pet
    btnHealthy.textContent = "Show All Pet";
  } else {
    //1.hiển thị toàn bộ thú cưng
    renderTableData(petArr);
    //2. đổi tên nút thành Show Healthy Pet
    btnHealthy.textContent = "Show Healthy Pet";
  }
});

const clearInput = () => {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#00000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};

// đầu tiên phải khai báo 1 function bên ngoài.
const validateData = (data) => {
  // Không có trường nào bị nhập thiếu dữ liệu.
  //khai báo 1 biến
  let isValidate = true;
  //vì data.id là 1 string nên có trim để loại bỏ các khoảng trống phía trước và sau.
  if (data.id.trim() === "") {
    // string rỗng;
    // hoặc có thể if (data.id.trim().length === 0)độ dài chuỗi = 0
    alert("không được để trống id");
    isValidate = false;
  }
  if (data.name.trim() === "") {
    alert("không được để trống name");
    isValidate = false;
  }
  if (isNaN(data.age)) {
    //isNaN sẽ trả ra 2 giá trị true hoặc false. true khi nó là số và ngược lại.
    alert("không được để trống age");
    isValidate = false;
  }
  if (isNaN(data.weight)) {
    alert("không được để trống weight");
    isValidate = false;
  }
  if (isNaN(data.length)) {
    alert("không được để trống lenght");
    isValidate = false;
  }

  // Giá trị ID không được trùng với các thú cưng còn lại. Nếu không hợp lệ, hãy đưa ra thông báo "ID must be unique!".
  for (let i = 0; i < petArr.length; i++) {
    if (data.id === petArr[i].id) {
      alert("ID must be unique!");
      isValidate = false;
      break;
    }
  }

  // Trường Age chỉ được nhập giá trị trong khoảng 1 đến 15. Nếu không hợp lệ, hãy đưa ra thông báo "Age must be between 1 and 15!".
  if (data.age > 15 || data.age < 1) {
    //&& và. || hoặc
    alert("Age must be between 1 and 15!");
    isValidate = false;
  }
  // Trường Weight chỉ được nhập giá trị trong khoảng 1 đến 15. Nếu không hợp lệ, hãy đưa ra thông báo "Weight must be between 1 and 15!".
  if (data.weight > 15 || data.weight < 1) {
    alert("Weight must be between 1 and 15!");
    isValidate = false;
  }
  // Trường Length chỉ được nhập giá trị trong khoảng 1 đến 100. Nếu không hợp lệ, hãy đưa ra thông báo "Length must be between 1 and 100!".
  if (data.length > 100 || data.length < 1) {
    alert("Length must be between 1 and 100!");
    isValidate = false;
  }
  // Bắt buộc phải chọn giá trị cho trường Type. Nếu không hợp lệ, hãy đưa ra thông báo "Please select Type!".
  if (data.type === "Select Type") {
    alert("Please select Type!");
    isValidate = false;
  }
  // Bắt buộc phải chọn giá trị cho trường Breed. Nếu không hợp lệ, hãy đưa ra thông báo "Please select Breed!"
  if (data.breed === "Select Breed") {
    alert("Please select breed!");
    isValidate = false;
  }
  return isValidate;
};
//lấy breed của bên html breed qua
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
//bắt sự kiện khi thay đổi type
typeInput.addEventListener("change", () => {
  const abc = getFromStorage("breedArr", "[]");
  renderBreed(abc, typeInput.value);
});
