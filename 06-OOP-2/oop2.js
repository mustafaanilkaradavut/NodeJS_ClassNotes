"use strict";

/* -------------------------------------------------------------------------- */
//.. OOP: CLASSES
/* -------------------------------------------------------------------------- */
//__ OOP: Object Oriented Programming
//__ DRY: Don't Repeat Yourself
//__ BLUEPRINT: Taslak (Mimarların kullandığı mavi şablon kağıdı)
//__ CLASS: Obje türetmek için kullanılacak şablon.
/* -------------------------------------------------------------------------- */
//* Class Declaration:
//? Class isimleri PascalCase yapıdadır.

// class PascalNameCase{...}

/* -------------------------------------------------------------------------- */
//* Class Expression:

const PascalNameCase = class {
  undefinedProperty; // Sadece tanımlanıp bırakılabilir. (Değeri Undefined)
  propertyName = "value"; // attribute, field

  //__ Method tanımlarken başına function yazılmaz.
  methodName() {
    return "this is a method";
  }

  // Aşağıdaki yöntem class içinde geçerli değildir. Kullanılmaz.
  // methodName = function () {};
};

//? INSTANCE = Bir class'tan türetilen objedir.
//* Intance isimleride PascalName yapısındadır.

const NewObj = new PascalNameCase();
// console.log(NewObj);
// console.log(NewObj.methodName());

/* -------------------------------------------------------------------------- */
//* Contructor Method:

class Car {
  isRunning = false;

  constructor(brand, model, year = 1999) {
    this.brand = brand;
    this.model = model;
    this.year = year;
  }

  runEngine() {
    this.isRunning = true;
    console.log("Engine Started");
    return this.isRunning;
  }
}

const Ford = new Car("Ford", "Mustang", 1967); //__ Buradaki Car() parantez contructor'u ifade ediyor.
console.log(Ford);
