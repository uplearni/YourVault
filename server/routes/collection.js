const express = require('express');
const collectionController=require("../controllers/collection")
const isAuth =require("../middleware/is-auth");
const router = express.Router();

router.get("/",isAuth,collectionController.getCollections);//done
router.post("/",isAuth,collectionController.createCollection);//done
router.get("/:collectionId",isAuth,collectionController.getCollectionById);
router.put("/:collectionId",isAuth,collectionController.updateCollection);
router.delete("/:collectionId",isAuth,collectionController.deleteCollection);
router.patch("/favorite/:id",collectionController.toggleFavorite);
module.exports = router;

//"userId": "6855bd1b585e708089020f69"