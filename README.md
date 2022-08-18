<h1 align="center">
  AuthNZ System
</h1>
<p align="center">
  A <a href="https://nestjs.com/">NestJS</a> RESTful API made with the objective to study more about <a href="https://discord.com/">Discord</a> permissions system!
</p>
<p align="right"><i>Status: Developing new features...</i></p>

## About
The project was developed using NestJS since this framework makes so easy to organize and wrap things up, and for the database I used a powerful tool called [Prisma](https://www.prisma.io/) which is easy to use and easy to create your tables.

## Authorization and Authentication
In APIs we have **Authorization** and **Authentication**, which is NOT the same thing, but you maybe can see them as equals, so let's see a simple explanation of both!

- **Authentication** is used when we want to check if the user is who he is claiming to be (which is when we login).
- **Authorization** is used when we want to check if the user has the **permission** to use a certain service or feature (which is when we try to use a specific feature but we get a *Unauthorized* exception telling us we don't have *permission*).

You can read more about it on [this article](https://www.onelogin.com/learn/authentication-vs-authorization#:~:text=Authentication%20and%20authorization%20are%20two,authorization%20determines%20their%20access%20rights.).

## How it works?
Well, as mentioned in the description of the project, I developed this project based on [Discord permission system](https://discord.com/developers/docs/topics/permissions) which we use something simple to handle it, which is [Bitwise operators](https://en.wikipedia.org/wiki/Bitwise_operation), where basically we use bits to store the user permissions and then, when we want to check, remove or add a permission we use this operators.

## Bitwise operators
In this section, we will see this operators in action and when we use each of them in this project. Note that I created a util file called [permissions.ts](src/utils/permissions.ts) which you can use to test it if you want!

```ts
// Numbers in bytes (8 bits)
// 1 - 0000 0001
// 2 - 0000 0010
// 3 - 0000 0011
// 4 - 0000 0100

// Left shift (<<)
// Shifts the first operand the specified number of bits, zero bits are shifted in from the right
const leftShiftResult = 1 << 2

// 0001 <- Shifts 2
console.log(leftShiftResult) // 0100


// And (&)
// Compare both bytes, where each bit will be 1 if both are 1, else will be 0
// We use this when we want to check if the user has a specific permission
const andResult = 1 & 3

// 0001 & 0011
console.log(andResult) // 0001


// Or (|)
// Compare both bytes, where each bit will be 1 if one of them are 1, else will be 0
// We use this when we want to add a permission from the user
const orResult = 1 | 3

// 0001 | 0011
console.log(orResult) // 0011


// Xor (^)
// Almost the same as the OR operator, but it will only be 1 if both bits are different
// We use this when we want to remove a permission from the user
const xorResult = 2 ^ 3

// 0010 ^ 0011
console.log(xorResult) // 0001
```

## Test it yourself!
### Installation

```bash
$ npm install
# OR
$ yarn install
```

### Running migrations
```bash
$ npx prisma migrate dev
# OR
$ yarn prisma migrate dev
```

### Running the app

```bash
# development
$ npm run start
# OR
$ yarn start

# watch mode
$ npm run start:dev
# OR
$ yarn start:dev

# production mode
$ npm run start:prod
# OR
$ yarn start:prod
```

## Show your support
Give this project a ⭐ if you like to support me to make more projects like this!