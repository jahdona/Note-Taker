const notes=require('express').Router();
const {v4:uuidv4}=require('uuid');
const {readFromFile,readAndAppend,writeToFile}=require('../helpers/fsutils');
const { text } = require('express');
//get router for retrieve all notes
notes.get('/',(req,res)=>{
    readFromFile('./db/db.json').then((data)=>res.json(JSON.parse(data)));
});

//get router for a specific note
notes.get('/:id',(req,res)=>{
    const notId=req.params.id;
    readFromFile('./db/db.json')
    .then((data)=>JSON.parse(data))
    .then((json)=>{
        const result=json.filter((note)=>note.id===notId);
        return result.length>0 ? res.json(result):res.json('No note with that ID');

    });

});
//Delete Route for a specific note

notes.delete('/:id',(req,res)=>{
    const notId=req.params.id;
    readFromFile('./db/db.json')
    .then((data)=>JSON.parse(data))
    .then((json)=>{
        const result=json.filter((note)=>note.id!==notId);

        writeToFile('./db/db.json',result);
        res.json(`Note ${notId} has been deleted`);
    });
});
//POST Route for a new note
notes.post('/',(req,res)=>{
    console.log(req.body);
    const {title,text}=req.body;
    if(req.body){
        const newNote={
            title,
            text,
            id:uuidv4(),
        };
        readAndAppend(newNote,'./db/db.json');
        res.json(`Tip added successfully`);
    }
    else{
        res.errored('Error in adding note');
    }
    
    
});
module.exports=notes;