const express = require('express');
const itemController=require("../controllers/item");
const isAuth=require("../middleware/is-auth");
const router = express.Router();

router.get("/",isAuth,itemController.createItems);
router.get("/:itemId",isAuth,itemController.updateItem);
router.delete("/:itemId",isAuth,itemController.deleteItem);

module.exports = router;