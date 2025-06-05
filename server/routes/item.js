const express = require('express');
const itemController=require("../controllers/item");
const isAuth=require("../middleware/is-auth");
const router = express.Router();

router.post("/",isAuth,itemController.createItems);
router.put("/:itemId",isAuth,itemController.updateItem);
router.get("/:itemId", isAuth, itemController.getItemById);
router.delete("/:itemId",isAuth,itemController.deleteItem);

module.exports = router;