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
console.log(var0, var1, varPar);

//* Spread Operatör ( Dağıtıcı/Serpiştirici ) ( Eşittir ifadesinin sağ tarafındaki spread operatörüdür.)
const newArr = [...testArray, "value5", "value6"];
console.log(newArr);
