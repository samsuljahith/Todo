import express from "express";
import bodyParser from"body-parser";
const app=express();
const port=3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
let todolist=[];
app.post('/todo',(req,res)=>{
    const{title,description}=req.body
    const newtodo={
        id:todolist.length + 1,
        title,
        description
    }
todolist.push(newtodo);
console.log(todolist);
res.status(201).json(newtodo);
})
app.get('/todo',(req,res)=>{
    res.json(todolist);
})
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
