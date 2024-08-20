const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
app.set("view engine", "ejs");
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", require("./routers"));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
