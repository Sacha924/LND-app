const nodeRouter = require("express").Router();
const nodeService = require("./node.service");

nodeRouter.post("/", nodeService.unlockWallet);

nodeRouter.get("/getinfo", nodeService.getInfo);

nodeRouter.get("/getbalance", nodeService.getBalance);



module.exports = nodeRouter;