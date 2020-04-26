class Stack {
  constructor() {
    this.stack = {};
    this.count = 0;
  }

  push(element) {
    this.stack[this.count] = element;
    this.count++;
    return this.stack;
  }

  pop() {
    this.count--;
    const element = this.stack[this.count];
    delete this.stack[this.count];
    return element;
  }

  peek() {
    return this.stack[this.count - 1];
  }

  size() {
    return this.count;
  }

  print() {
    console.log(this.stack);
  }
}