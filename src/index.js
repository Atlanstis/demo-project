const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");

const config = fs.readFileSync(
  process.env.NODE_ENVIRONMENT === "production"
    ? path.resolve(process.cwd(), "production.yml")
    : path.resolve(process.cwd(), "development.yml")
);

console.log(yaml.load(config));
