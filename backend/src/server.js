const express = require("express");
const cors = require('cors');
const routes = require("./routes");
const {checkSchedulePSE} = require("./controllers/pseController");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));


app.use(express.json());
app.use("/api", routes);

const port = 5000;

app.listen(port, async () => {
  await checkSchedulePSE();
  console.log("🚀 App is running on port:", port);
});