const Article=require("../models/Article")

const getArticles=async(req,res)=>{
    try{
        const articles=await Article.find()
    .sort({publishedAt:-1});
    console.log("Articles found :",articles.length);

    res.status(200).json(articles)
}
catch(error){
    res.status(500).json({
        success:false,
        message:error.message
    })
}
}

const getArticlesById=async(req,res)=>{
    try{
        const article = await Article.findById(req.params.id);

        if(!article){
            return res.status(404).json({
                message:"Article not found"
            });
        }
        res.status(200).json(article);
    }
    catch(err){
        res.status(500).json({
            message:error.message
        });
    }
}

const getClusters=async(req,res)=>{
    try{
        const clusters=await Article.aggregate([
            {
                $match:{
                    clusterId:{
                        $ne:null
                    }
                }
            },
            {
                $group:{
                    _id:"$clusterId",
                    articles:{
                        $push:"$$ROOT"
                    }
                }
            }
        ])
        res.status(200).json(clusters)
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

const getStatus=async(req,res)=>{
    try{
        const articleCount=await Article.countDocuments()

        const sourceCount=await Article.distinct("source");

        res.json({
            status:"healthy",
            totalArticles:articleCount,
            totalSources:sourceCount.length
        })
    }
    catch(error){
    res.status(500).json({
        message:error.message
    })
}
}

module.exports={
    getArticles,
    getArticlesById,
    getClusters,
    getStatus
}

