// here i am importing the json file data from json file
import data from"./Portal_data.json" assert {type: 'json'}

// then i use query selector to select the body
const tbody = document.querySelector("tbody");
let classmates = data;
// then using map function
classmates = classmates.map(transformingData);

classmates.forEach(adding);
// here selecting the input field 
const inputfieldInput = document.querySelector("#inputfield");
const form = document.querySelector("form");

// selecting the event listener while user givinhg input then function will execute
inputfieldInput.addEventListener("input", filterByinputfield);
//selecting addevent listener i.e submit
// form.addEventListener("submit", filterByinputfield);

// creating a new function named filterby input field
function filterByinputfield(event) {
  event.preventDefault();
  let value = inputfieldInput.value.trim().toLowerCase();
  if (value.length) {  // now applying condition
   
    let filtered = classmates.filter(
      (student) =>  // using arow function
        student.name.toLowerCase().includes(value) ||  
        student.email.toLowerCase().includes(value) //if user put the value in lowercase and also considerable
    );
    if (filtered.length) {
      filtered.forEach(adding);
    } else {
      tbody.innerText = "";
    }
  } else {
   
    classmates.forEach(adding);
  }
}
form.addEventListener("submit", filterByinputfield);
//now selecting the sort conatiner
const sortButtons = document.querySelectorAll(".sort-container > *");
// now using click event and when user click on button then it will sort data
for (let button of sortButtons) {
  button.addEventListener("click", sortData);
}
function sortData(event) {
  let previouslyClicked = document.querySelector(".active");
  if (previouslyClicked) {
    previouslyClicked.classList.toggle("active");
  }
  event.target.classList.toggle("active");
  let id = event.target.id;
// now applying if conditions with help of all ids of buttons
  if (id == "ascendingorder") {
    classmates.sort((a, b) => a.name.localeCompare(b.name));
    classmates.forEach(adding);
  } else if (id == "descendingorder") {
    classmates.sort((a, b) => b.name.localeCompare(a.name));
    classmates.forEach(adding);
  } else if (id == "sortingmarks") {
    classmates.sort((a, b) => a.marks - b.marks);
    classmates.forEach(adding);
  } else if (id == "sortingpassing") {
    let passingclassmates = classmates.filter(
      (student) => student.passing == "Passing"
    );
    passingclassmates.forEach(adding);
  } else if (id == "sortingclass") {
    classmates.sort((a, b) => a.classNo - b.classNo);
    classmates.forEach(adding);
  } else if (id == "sortinggender") {
    classmates.sort((a, b) => a.gender.localeCompare(b.gender));
    classmates.forEach(adding);
  }
}
function transformingData(student) {
  const {
    id,
    first_name,
    last_name,
    email,
    gender,
    marks,
    img_src,
    class: classNo,
    passing,
  } = student;

  return {
    id,
    imgSrc: img_src,
    name: first_name + " " + last_name,
    gender,
    classNo,
    marks,
    passing: passing ? "Passing" : "Failed",
    email,
  };
}
function adding(student, i) {
  
  if (i == 0) {
    tbody.innerText = "";
  }
  const tr = document.createElement("tr");

  const data = Object.values(student);

  for (let i = 0; i < data.length; i++) {
    if (i == 2) continue;
    if (i == 1) {
      const nameTd = document.createElement("td");
      nameTd.innerHTML = `<img src=${student.imgSrc} alt="photo"/> <span>${student.name}</span>`;
      tr.append(nameTd);
    } else {
      const newTd = document.createElement("td");
      newTd.textContent = data[i];
      tr.append(newTd);
    }
  }

  tbody.append(tr);
}