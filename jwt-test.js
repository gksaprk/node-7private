import jwt from "jsonwebtoken";

const token = jwt.sign({ myPayloadData: 1234 }, "mysecretkey");
console.log(token);

const decodedValue = jwt.decode(token);
console.log(decodedValue);

const decodedValueByVerify = jwt.verify(token, "mysecretkey");
console.log(decodedValueByVerify);
