const express = require('express');
const collectionController=require("../controllers/collection")
const isAuth =require("../middleware/is-auth");
const router = express.Router();

router.get("/",isAuth,collectionController.getCollections);
router.post("/",isAuth,collectionController.createCollection);
router.get("/:collectionId",isAuth,collectionController.getCollectionById);
router.put("/:collectionId",isAuth,collectionController.updateCollection);
router.delete("/:collectionId",isAuth,collectionController.deleteCollection);

module.exports = router;