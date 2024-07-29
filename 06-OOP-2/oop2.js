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
// console.log(BoshClimate);

/* -------------------------------------------------------------------------- */
//.. Polymorphism: Miras aldığımız sınıfın özellik/methodlarını yeniden yazabilme.
//__ - Override: Üst metodla aynı isim ve yapıda yeni bir metod yazma. (ezme / iptal etme / önceliğini alma)
//__ - Overload: Üst metodla aynı isimde ama farklı yapıda (farklı adet/tip) yeni method oluşturma. (aynı anda ikisi de aktif) (JS desteklemez)

class CustomerVehicle {
  vehicleIsActive = false;

  constructor(vehicleType) {
    this.vehicleType = vehicleType;
  }

  getDetails() {
    console.log("CustomerVehicle Class getDetails()");
    return this;
  }
}

class CustomerCar extends CustomerVehicle {
  isRunning = false;

  constructor(brand, model, year, vehicleType) {
    super(vehicleType);
    this.brand = brand;
    this.model = model;
    this.year = year;
  }

  runEngine() {
    this.isRunning = true;
    console.log("Engine started");
    return this.isRunning;
  }

  // Override: Parent classtaki methodu aynı isimle tekrar tanımlama.
  // Override işlemi parent classtaki methodu ezer (önceliğini alır)
  getDetails() {
    console.log("CustomerCar Class getDetails()");
    super.getDetails(); // Bu kod ile super ile ezdiğimiz kısmı da çalıştırırız. (overload)
  }

  //? Overload: Üstteki methodun aynı isim ama farklı parametre adet/tip ile yeniden tanımlanması.
  //? JS Desteklemez. TypeScript destekler.
  //? Çalışma prensibi: Çağrıldığı zaman parametreye göre ilgili method çalışır.

  // getDetails(parametre1, parameter2) {
  //     return this
  // }
}

const Peugeot = new CustomerCar("Peugeot", "308", 2001, "CustomerCar");
// console.log(Peugeot);
// console.log(Peugeot.getDetails());

/* -------------------------------------------------------------------------- *
.. Access Modifiers:
? - PUBLIC: Genel erişime açık. (Parent: Yes, Child: Yes, Instance: Yes)
? - _PROTECTED: Sadece tanımlı olduğu class ve Inherit edilen child-class erişebilir. (Parent: Yes, Child: Yes, Instance: No) (JS Desteklemez.)
? - #PRIVATE: Sadece tanımlı olduğu class içinde erişim var. (Parent: Yes, Child: No, Instance: No)

class Category {
  publicProp = "parent-child-instance erişebilir.";
  _proctectedProp = "parent-child erişebilir.";
  #privateProp = "parent erişebilir.";

  categoryIsActive = false;

  constructor(categoryType) {
    this.categoryType = categoryType;
  }

  getDetails() {
    console.log("Category Class getDetails()");
    return this;
  }
}

class Jersey extends Category {
  isRunning = false;

  constructor(brand, model, year, categoryType) {
    super(categoryType);
    this.brand = brand;
    this.model = model;
    this.year = year;
  }

  runCategory() {
    this.isRunning = true;
    console.log("Category uptated");
    console.log(this.categoryIsActive); // public: erişebilir, protected: erişebilir, private: erişemez.
    return this.isRunning;
  }

  getDetails() {
    console.log("Jersey Class getDetails()");
    super.getDetails();
  }
}

const Adidas = new Jersey("Argentina", "Blue White", 2023, "Jersey");
// console.log(Ford)
console.log(Adidas.runCategory());
console.log(Adidas.categoryIsActive); // public: erişebilir, protected: erişemez, private: erişemez.

/* -------------------------------------------------------------------------- *
Piyasa Standartları

 * const BUYUK_HARF_ISIMLENDIRME = Bu bir constant değişkendir. Developer olarak bunu silme, değiştirirken dikkatli ol.
 * const _alttanTireIleBaslayan = BU bir proctected değişkendir. Developer olarak buna dokunma (erişme bile)

/* -------------------------------------------------------------------------- */
//? GETTER & SETTER METHODS: Görevi veri getirme (getter) ve veri güncelleme (setter) olan metodlardır.
//? "STATIC" KEYWORD: Class'dan direkt erişim. (Instance erişemez.)

class Jersey {
  isRunning = false;
  #price = 99;

  constructor(brand, model, year) {
    this.brand = brand;
    this.model = model;
    this.year = year;
  }

  runCategory() {
    this.isRunning = true;
    console.log("Category uptated");
    return this.isRunning;
  }
  get getPrice() {
    console.log("Printing Price");
    return this.#price;
  }

  set setPrice(price) {
    console.log("Price has been uptated");
    this.#price = price;
  }

  //__ Statics
  static staticProp = "Bu bir static değerdir.";

  static staticMethod() {
    return "bu bir static methoddur.";
  }
}

const Adidas = new Jersey("Argentina", "Blue White", 2023);
// console.log(Adidas);
// console.log(Adidas.price); // Private olduğu için erişilemez.
// console.log(Adidas.getPrice()); // Normal Method
// console.log(Adidas.getPrice); // Getter methodlar bir property gibi çağrılır. (parantez yok)
// Adidas.setPrice(135); // Normal Method
// Adidas.setPrice = 135; // Setter methodlar bir propertyy gibi güncellenebilir.
// console.log(Adidas.getPrice);

/* -------------------------------------------------------------------------- */
//* STATICS
// Static değerlere sadece ana CLASS ile erişilebilir.
console.log(Jersey.staticProp);
console.log(Jersey.staticMethod());
console.log(Jersey);
// Static özellik/metodlara instance ile erişilemez.
console.log(Adidas.staticProp);

/* -------------------------------------------------------------------------- */
//? ABSTRACTION: Soyutlama/Modelleme (Class ile obje üretebilme. Aynı amaç için kullanılan değişken ve methodların bir class içinde yazıyor olması)
//? ENCAPCULLATION: Kapsülleme/Ayrıştırma (Kodların gizliliği, private değişkenlere erişilemiyor olması ve birbirinden bağımsız çalışmaları.)
/* -------------------------------------------------------------------------- */
