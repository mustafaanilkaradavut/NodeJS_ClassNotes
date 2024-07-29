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
//* Constructor Method:

//* Class'lar soyuttur. Template - Şablondur.
class Car {
  isRunning = false;

  // ? "new Class" ile obje oluştururken parametre göndermek için "constructor" isminde bir method kullanırız.
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
  newMethod() {
    this.runEngine;
  }
}

//* Instated somuttur. Template kullanarak ortaya bir şey çıkartırız.
const Ford = new Car("Ford", "Mustang", 1967); //__ Buradaki Car() parantez contructor'u ifade ediyor.
// console.log(Ford);
// Ford.newMethod();
// console.log(Ford.isRunning);
// Ford.runEngine();
// console.log(Ford.isRunning);

const Mercedes = new Car("Mercedes", "CLK300", 2020);
// console.log(Mercedes);
const Renault = new Car("Renault", "Megane", "2010");
// console.log(Renault);

/* -------------------------------------------------------------------------- */
//__ INHERITANCE = MirasAlma. Başka bir classın tüm property/methodlarını devralma (parent-child kurulur.)
//__ SUPER = Parent Class, THIS = Child (Current) Class

class Vehicle {
  vehicleIsActive = false;

  constructor(vehicleType) {
    this.vehicleType = vehicleType;
  }
}

class Car2 extends Vehicle {
  isRunning = false;

  // constructor(brand, model, year = 1999) {
  //   super("Car2");
  //   this.brand = brand;
  //   this.model = model;
  //   this.year = year;
  // }

  constructor(brand, model, year, vehicleType) {
    super(vehicleType);
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

// class Truck extends Vehicle {...}

// const HarleyDavidson = new Car2("Harley Davidson", "Chapper", 2020);
// console.log(HarleyDavidson);
// const HarleyDavidson = new Car2("Harley Davidson", "Chapper", 2020, "Car2");
// console.log(HarleyDavidson);

class Accessory extends Car2 {
  constructor(accessoryName, brand, model, year, vehicleType) {
    super(brand, model, year, vehicleType);
    this.accessoryName = accessoryName;
  }
}

// const BoshClimate = new Accessory("Bosh Climate", "Audi", "A4", 2015, "Car2");
// console.log(BoshClimate);

const Audi = new Car2("Audi", "A4", 2015, "Car2");
const BoshClimate = new Accessory("Bosh Climate", ...Object.values(Audi));
console.log(BoshClimate);
