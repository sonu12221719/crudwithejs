const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user');
require('dotenv').config;

const port = process.env.PORT || 3000;

app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
    res.render('index')
})

app.post('/create', async (req,res) => {
    let {name,email,image} = req.body;

    await userModel.create({
        name,
        email,
        image
    })
    res.redirect('/read')
})

app.get('/read', async(req,res)=>{
    let allUsers = await userModel.find({});
    res.render('read',{users: allUsers})
})

app.get('/delete/:id',async(req,res)=>{
    let userDelete = await userModel.findByIdAndDelete({_id:req.params.id});
    res.redirect('/read');
})



app.listen(port,()=>{
    console.log(`your server is running on port http://localhost:${port}`);
})