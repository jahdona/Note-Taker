const express=require('express');
const path=require('path');
//const {clog}=require('./middleware/clog');

const api=require('./routes/index');

const PORT = process.env.PORT || 3001;
const app=express()
//import custom middleware, 'clog'
//app.use(clog);
//middleware for parsing JSON and urlenconded form data
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api',api);

app.use(express.static('public'));
//GET route for homepage
app.get('/',(req,res)=>{
res.sendFile(path.join(__dirname,'/public/index.html'))
});
app.get('/notes',(req,res)=>{
res.sendFile(path.join(__dirname,'/public/notes.html'))
});
app.listen(PORT,()=>{
    console.log(`App listrning at http://localhost:${PORT}`)
});