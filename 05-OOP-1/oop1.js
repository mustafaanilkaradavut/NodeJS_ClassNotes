"use strict";

/*  -------------------------------------------------------------------------- */
//?                                OOP: OBJECTS                                */
/*  -------------------------------------------------------------------------- */

// Direct obje isimlendirmede PascalCase veya camelCase yapı kullanırız.
const exampleObject = {
  propertyName: "value", // property, attribute, field
  propertyArray: [],
  propertyObject: {},

  // Obje içerisindeki fonksiyonlara Method denir.
  methodName: function () {
    return "this is a method";
  },
  // Alternatif yazım:
  methodAlternative() {
    return "method-2";
  },
};

// Nokta rotasyonu ile property çağırılabilir :
// console.log(exampleObject.propertyName);
// console.log(exampleObject.methodName());

/* -------------------------------------------------------------------------- */
//* Object Declaration :

const Car = {
  brand: "Ford",
  model: "Mustang",
  year: 1967,
  isAutoGear: true,
  colors: ["red", "white"],
  details: {
    color1: "red",
    color2: "white",
    engineSize: 5000,
  },
  startEngine: function (param = "1") {
    console.log(param);
    return "Engine started";
  },
};

// console.log(Car.brand);
// console.log(Car.colors);
// console.log(Car.colors[1]);
// console.log(Car.details);
// console.log(Car.details.engineSize);
// console.log(Car.startEngine());

// Alternatif

// console.log(Car["brand"]);
// console.log(Car["colors"][1]);
// console.log(Car["details"]["engineSize"]);
// console.log(Car["startEngine"]());

/* -------------------------------------------------------------------------- */
//* "This" Keyword

const Car2 = {
  brand: "Fiat",
  model: "Egea",
  year: 2019,
  isAutoGear: false,
  colors: ["white", "grey"],
  details: {
    color1: "white",
    color2: "grey",
    engineSize: 1500,
  },
  startEngine: function (param = "1") {
    console.log(param);
    return "Engine started";
  },

  getDetails: function () {
    // console.log(this);
    // return this.details;
    // return this.startEngine;
    return (
      this.brand + " " + this.model + " " + this.year + " " + this.startEngine()
    );
  },

  // Arrow functionlar grlobal scope'tur. This kullanılamaz !
  arrowMethod: () => {
    return this;
  },
};

// console.log(Car2.getDetails());
// console.log(Car2.arrowMethod());

/* -------------------------------------------------------------------------- */
//* Array Destructuring

const testArray = ["value0", "value1", "value2", "value3", "value4"];

const test0 = testArray[0];
const test1 = testArray[1];
const test2 = testArray[2];
const test3 = testArray[3];
const test4 = testArray[4];
const testPart = testArray.slice(3, 5);

// console.log(test0, test1, test2, testPart);

//__ Destructuring'te SIRALAMA önemlidir.
// const [var0, var1, ...varPar] = testArray;
// console.log(var0, var1, varPar);

//* Rest Operator (...) - Toplayıcı Operatör (Eşittir ifadesinin sol tarafındaki REST operatördür.)
const [var0, var1, ...varPar] = testArray;
// console.log(var0, var1, varPar);

//* Spread Operatör ( Dağıtıcı/Serpiştirici ) ( Eşittir ifadesinin sağ tarafındaki spread operatörüdür.)
const newArr = [...testArray, "value5", "value6"];
// console.log(newArr);

/* -------------------------------------------------------------------------- */
//* Object Desturcturing

const Car3 = {
  brand: "Mercedes",
  model: "E30",
  year: 2005,
  isAutoGear: false,
  colors: ["black", "white"],
  details: {
    color1: "black",
    color2: "white",
    engineSize: 3400,
  },
  startEngine: function (param = "1") {
    console.log(param);
    return "Engine started";
  },
};

// REST Operator (Key isimleri önemlidir.)
// const { brand, year, model, ...others } = Car3;
// console.log(brand, year, model, others);

// İsim Değiştirmek
const { brand, year, model: newName, ...others } = Car3;
// console.log(brand, year, newName, others);

//Spread Operatör
const newOb = { ...Car3, newKey: "newValue" };
// console.log(newOb);

/* -------------------------------------------------------------------------- */
//* Object to JSON

// console.log(typeof Car3, Car3);

const json = JSON.stringify(Car3);
// console.log(typeof json, json);

//* JSON to Object

const obj = JSON.parse(json);
// console.log(obj);

//* Array to JSON

const arr = Object.keys(Car3);
// const arr = Object.values(Car3);
// const arr = Object.entries(Car3); // Hem key hem value değerlerini verir. //__ enumareType
// console.log(arr);

const arrToJSON = JSON.stringify(arr);
// console.log(arrToJSON);

const jsonToArr = JSON.parse(arrToJSON);
// console.log(typeof jsonToArr, jsonToArr);

// console.log(typeof null, null);
// console.log(typeof "string", "string");
// console.log(typeof 1234, 1234);
// console.log(typeof true, true);
// console.log(typeof undefined, undefined);
// console.log(typeof [], []);
// console.log(typeof {}, {});
// console.log(typeof function () {}, function () {});

const test = String("new-value");
console.log(typeof test, test);
//__ Class'tan türetilen her şey bir objedir.

/* -------------------------------------------------------------------------- */
//* CONTRUCTOR FUNCTIONS:

// const contructorFunction = function () {
//   this.property = "value";
// };

/* -------------------------------------------------------------------------- */
//* 'NEW' Keyword

const carConstructor = function (brand, model, year = 2000) {
  this.brand = brand;
  this.model = model;
  this.year = year;

  this.startEngine = function () {
    // console.log( this )
    return "Engine started.";
  };
};

//__ new ile oluşturulan objeler PascalCase ile isimlendirilir.
const Ford = new carConstructor("Ford", "Mustang", 1967);
console.log(Ford);

const Mercedes = new carConstructor("Mercedes", "CLK200", 2015);
console.log(Mercedes);
console.log(Mercedes.brand);
console.log(Mercedes.startEngine());
