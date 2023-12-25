const nodeRouter = require("express").Router();
const nodeService = require("./node.service");

nodeRouter.post("/unlockWallet", nodeService.unlockWallet);

nodeRouter.get("/getInfo", nodeService.getInfo);

nodeRouter.get("/getBalance", nodeService.getBalance);

nodeRouter.get("/getChannels", nodeService.getChannels);

nodeRouter.post("/openChannel", nodeService.openChannel);

nodeRouter.post("/sendPayment", nodeService.sendPayment);

nodeRouter.post("/createInvoice", nodeService.createInvoice);

nodeRouter.post("/closeChannel", nodeService.closeChannel);

module.exports = nodeRouter;