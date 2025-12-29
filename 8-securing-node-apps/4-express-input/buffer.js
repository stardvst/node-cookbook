{
  let greeting = { "msg": "hello" };
  let buffer = new Buffer(greeting.msg); // buffer containing 'hello'
  console.log(buffer);
}

{
  let greeting = { "msg": 10 };
  let buffer = Buffer(greeting.msg); // unsafe, buffer of length 10
  console.log(buffer);
}

{
  let greeting = { "msg": 10 };
  let buffer = Buffer.alloc(greeting.msg); // safe, creates zero-filled buffer of length 10
  console.log(buffer);
}

{
  let greeting = { "msg": 10 };
  let buffer = Buffer.allocUnsafe(greeting.msg); // might not be filled with zeros
  console.log(buffer);
}

{
  let greeting = { "msg": 10 };
  let buffer = Buffer.from(greeting.msg); // safe,throws TypeError
  console.log(buffer);
}
