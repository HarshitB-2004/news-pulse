const express=require('express')
const cors=require('cors')
require('dotenv').config();

const connectDB=require('./config/db')

const app=express()

const articleRoutes=require('./routes/articleRoutes')

connectDB()


app.use(cors())
app.use(express.json())
app.use('/api/articles',articleRoutes)

app.get('/',(req,res)=>{
    res.send('News Pulse backend running ')
});

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`The server is running on ${PORT}`)
})