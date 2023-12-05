const nodeRouter = require("express").Router();
const nodeService = require("./node.service");

nodeRouter.post("/unlockWallet", nodeService.unlockWallet);

nodeRouter.get("/getInfo", nodeService.getInfo);

nodeRouter.get("/getBalance", nodeService.getBalance);



module.exports = nodeRouter;