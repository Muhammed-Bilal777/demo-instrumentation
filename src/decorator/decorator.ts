// Method Decorator
function logMethod(
  target: any,
  key: string,
  descriptor: PropertyDescriptor
): void {
  console.log("---------target", target);
  console.log("---------key", key);
  console.log("---------descriptor", descriptor);
  const originalMethod = descriptor.value; // Store the original method

  // Modify the method
  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${key} with arguments: ${args}`);
    const result = originalMethod.apply(this, args); // Call the original method
    console.log(`Result: ${result}`);
    return result; // Return the result
  };

  // No need to return the descriptor in this case
}

// User Class
class User {
  static greet1(): any {
    throw new Error("Method not implemented.");
  }
  name: string; // Declare the name property

  constructor(name: string) {
    this.name = name;
  }

  @logMethod // Apply the decorator
  greet(): string {
    // Specify the return type
    return `Hello, ${this.name}!`;
  }
}

// Using the decorated class
const user = new User("Alice");
user.greet(); // This will log the method call and result
