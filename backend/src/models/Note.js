import mongoose from "mongoose";


//create a schema 
// create a model based on that schema

const noteSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:
    {
        type:String,
        required:true


    },
   
},{timestamps:true})  // default it give created at and upadted at 

const Note=mongoose.model("Note",noteSchema);
export default Note;