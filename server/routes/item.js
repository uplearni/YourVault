const express = require('express');
const itemController=require("../controllers/item");
const isAuth=require("../middleware/is-auth");
const upload=require("../middleware/file-upload");
const router = express.Router();


router.get("/",isAuth,itemController.getItems);
router.post("/",isAuth,upload.single("file"),itemController.createItem);
router.put("/:itemId",isAuth,itemController.updateItem);
router.get("/:itemId", isAuth, itemController.getItemById);
router.delete("/:itemId",isAuth,itemController.deleteItem);

module.exports = router;