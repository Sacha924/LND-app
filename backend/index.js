const express = require("express");
const cors = require("cors");
require('dotenv').config()

const nodeController = require("./node_interaction/node.controller")

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());
app.use("/node", nodeController)

app.listen(port, () => {
  console.log(`Example app listening on port 4000`);
});