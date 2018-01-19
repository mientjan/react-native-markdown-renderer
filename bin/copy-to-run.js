const fs = require("fs-extra");
const path = require("path");

const location = path.join(__dirname, "../src");
const destination = path.join(
  location,
  "../example/react-native-markdown-renderer"
);

fs.remove(destination, err => {
  fs.copy(location, destination, err => {
    if (err) return console.error(err);

    console.log("to %s ", destination);
    console.log("success!");
  });
});
