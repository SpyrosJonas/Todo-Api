var person = {
	name: "spyros",
	age: 21
};

function updatePerson(obj) {
	obj = {
		name: "Andrew",
		age: 24
	};
}

function updatePresonByRef(obj){
	obj.age =56;
}

updatePerson(person);
console.log(person);

updatePresonByRef(person);
console.log(person);

//Array Eample
var grades = [15,88];

function addGrades(gradesArr){
	gradesArr = [12,33,99];
	debugger;
}

function addGradesBref(gradesArr){
	gradesArr.push(56);
}

addGrades(grades);
console.log(grades);
addGradesBref(grades);
console.log(grades);

