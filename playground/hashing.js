const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';
// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash)=>{
//         console.log(hash);
//     });
// });


hashedPass = '$2a$10$xq/RYv3eoCuzvVna/DGCuumCZ/HZNe3TNhCNUNtK64Fc5ggz7bGhe';
bcrypt.compare(password, hashedPass, (err, res) => {
    console.log(res);
});
// var data = {
//     id: 10
// }

// var token = jwt.sign(data, '123abc!');
// console.log(token);
// var decoded = jwt.verify(token, '123abc!');
// console.log('decoded', decoded);

// var message = 'I am user of number 3';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
//     id: 4
// };

// var token= {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'mysecret').toString()
// }

// var resultHash = SHA256(JSON.stringify(token.data) + 'mysecret').toString();

// if (resultHash === token.hash) {
//     console.log('Data was not changed');
// } else {
//     console.log('Data was changed. Don\'t trust');
// }