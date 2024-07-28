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

