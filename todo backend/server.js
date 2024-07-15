import express from "express";
import bodyParser from"body-parser";
import mongoose from "mongoose";
const app=express();
const port=3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
const connectDb = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/todolistDB")
        console.info(`Connected to database on Worker process: ${process.pid}`)
    } catch (error) {
        console.error(`Connection error: ${error.stack} on Worker process: ${process.pid}`)
        process.exit(1)
    }
}
connectDb().catch(console.error)
const todoSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    }
})
const Todo = mongoose.model('Todo', todoSchema);

app.post('/todo',async(req,res)=>{
    const{title,description}=req.body
    try{
        const newtodo=new Todo({title,description});
     await newtodo.save();  
     res.status(201).json(newtodo); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
res.status(201);
})
app.get('/todo',async(req,res)=>{
try {
    const Todos=await Todo.find();
    res.status(200).json(Todos);
} catch (error) {
    console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
}
})
app.put('/todo/:id',async(req, res)=>{
    try {
          const id =req.params.id;
          const{title, description}=req.body;
          const updatedTodo=await Todo.findByIdAndUpdate(id,{title, description},{new:true});
          if(!updatedTodo){
              return res.status(404).json({error:'Todo not found'});
          }
          res.json(updatedTodo);
      } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
      }
  })
  app.delete('/todo/:id',async(req, res)=>{
    try {
        const id=req.params.id;
        const deletedTodo=await Todo.findByIdAndDelete(id);
        if(!deletedTodo){
            return res.status(404).json({error:'Todo not found'});
        }
        res.json({message:'Todo deleted successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
