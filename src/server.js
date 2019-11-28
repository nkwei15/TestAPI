//express is Restful API
let express = require('express')
let app = express()
//mongoose is MongoDB
const mongoose = require('mongoose')

//bodyparser is a library use to convert the request body to json
const bodyParser = require('body-parser')

//DB table from post.js
const Post = require('../model/post')

//cors is a library use to fetching data cross domain
const cors = require('cors')

app.use(cors());

app.use(bodyParser.json())

//get all post
app.get('/getData', async (req, res) =>{
   try{
       const post = await Post.find();
        res.json(post);
   }catch(err){
       res.json({message:err});
   }
})



//submit a post
app.post('/postData',async (req,res) =>{
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        link: req.body.link,
        image: req.body.image,
        date: req.body.date
    });

    try{
        const savedPost = await post.save();
        res.json(savedPost);
    }
    catch(err){
        res.json({message: err});
    }

});

//get specific post
app.get('/getData/:postID', async (req,res)=>{

    try{
    const post = await Post.findById(req.params.postID);
    res.json(post);
    }
    catch(err){
        res.json({message: err});
    }

});

//delete post
app.delete('/delete/:postID', async (req,res)=>{
    try{
    const post = await Post.remove({_id : req.params.postID});
    res.json(post);
    }
    catch(err){
        res.json({message: err});
    }

});

//update a post
app.patch('/update/:postID', async (req,res)=>{
    try{
    const post = await Post.updateOne(
        {_id : req.params.postID}
        , {$set : {title: req.body.title , description: req.body.description}
    });
    res.json(post);
    }
    catch(err){
        res.json({message: err});
    }

});

if(process.env.NODE_ENV === "production"){
    app.use(express.static('NewsWeatherApp/build'));

    app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname,"NewsWeatherApp","build","index.html"))
    })

}

//connect to MangoDB
mongoose.connect('mongodb+srv://user_123:123@cluster0-txqzp.mongodb.net/test?retryWrites=true&w=majorityCo'
    ,{useNewUrlParser: true,useUnifiedTopology: true }
    ,() => console.log('Connected !')
);

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>console.info(`Server has started on ${PORT}`))

