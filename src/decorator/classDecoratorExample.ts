//

function logClass(target: any) {
  console.log(`Class: ${target.name}`);
  console.log(target);
  return target; // Return the original class
}

@logClass
class MyClass {
  constructor() {
    console.log("MyClass instance created");
  }
}

const instance = new MyClass(); // Logs: Class: MyClass
