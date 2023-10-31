require("dotenv").config({
  path:
    process.env.NODE_ENVIRONMENT === "production" ? ".production.env" : ".env",
});

console.log("SECRET_KEY_A:", process.env.SECRET_KEY_A);
console.log("SECRET_KEY_B:", process.env.SECRET_KEY_B);
