const mongoose=require('mongoose')

const articleSchema=new mongoose.Schema(
    {
    title:{
        type:String,
        required:true
    },
    summary:String,
    content:String,

    source:{
        type:String,
        required:true,
    },
    url:{
        type:String,
        unique:true,
        required:true,
    },
    publishedAt:Date,

    clusterId:{
        type:String,
        default:null,
    },
    

},
{
        timestamps:true,
    }
)

module.exports=mongoose.model('Article',articleSchema);