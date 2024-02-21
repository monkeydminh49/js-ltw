students = [];
init();
function init() {
  console.log("init");
  students = JSON.parse(localStorage.getItem("students"));
  if (students == null) students = [];
  resetDisplay();
}

function getStudentInfo() {
  const student = {
    name: document.getElementById("name").value,
    dob: document.getElementById("dob").value,
    address: document.getElementById("address").value,
    gpa: document.getElementById("gpa").value,
  };
  console.log(student);
  return student;
}

function addStudent() {
  const student = getStudentInfo();
  console.log(typeof students);
  students.push(student);
  saveStudents(students);
  resetDisplay();
}

function saveStudents(students) {
  localStorage.setItem("students", JSON.stringify(students));
}

function resetDisplay() {
  var container = document.getElementById("table-container");

  // Remove all existing children from the container
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  var array = [["STT", "Ho va ten", "Ngay thang nam sinh", "Dia chi", "GPA"]]; // Creating a data array which a loop will source from
  let tmpStudent = students.map((item, index) => [
    index + 1,
    item.name,
    item.dob,
    item.address,
    item.gpa,
  ]);
  array = [...array, ...tmpStudent];
  var table = document.createElement("table");
  container.appendChild(table); // Drew the main table node on the document

  array.forEach(function (row) {
    var tr = table.insertRow(); //Create a new row

    row.forEach(function (column) {
      var td = tr.insertCell();

      td.innerText = column; // Take string from placeholder variable and append it to <tr> node
    });
  });
}

function modifyStudent() {
  let studentIndex = document.getElementById("modify").value;
  console.log(studentIndex + "str");
  if (studentIndex == null || studentIndex == undefined || studentIndex == "") {
    alert("Vui long nhap so thu tu hoc sinh");
    return;
  }

  let featureIndex = prompt(`
  Chon truong de sua:
  1. Ten
  2. Ngay sinh
  3. Dia chi
  4. GPA
  `);

  if (featureIndex == null || featureIndex == undefined || featureIndex == "") {
    return;
  }

  let value = prompt(`Nhap thong tin chinh sua`);
  let arr = ["name", "dob", "address", "gpa"];
  students[studentIndex - 1][arr[featureIndex - 1]] = value;
  saveStudents(students);
  resetDisplay();
}
