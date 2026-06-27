const express=require('express')
const router=express.Router();

const {
    getArticles,
    getArticlesById,
    getClusters,
    getStatus
}=require("../controllers/articleController")

router.get("/",getArticles);
router.get("/status",getStatus)
router.get("/clusters",getClusters)
router.get("/:id",getArticlesById)

module.exports=router

