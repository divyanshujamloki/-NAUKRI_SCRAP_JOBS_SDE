const express = require("express");
const getRoutes = require("./public/getRoutes");
const app = express();
const ngrok = require("ngrok");
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));


app.use("/", getRoutes);

app.listen(PORT, () => {
  console.log(`started at ${PORT}`);
});
