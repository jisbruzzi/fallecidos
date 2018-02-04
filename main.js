const express=require("express");
const app=express();
const Datastore = require('nedb')
const db = new Datastore({ filename: 'fallecidos.txt', autoload: true });
const util=require("util")
db.insert=util.promisify(db.insert)
db.find=util.promisify(db.find)
db.remove=util.promisify(db.remove)
app.use(require("body-parser").json())



app.get("/",(req,res)=>{
    res.send(("hello world"))
})


const fallecidos=express.Router();

fallecidos.post("/",(req,res,next)=>{
    console.log("Entra un fallecido")
    console.log(req.body)

    db.insert(req.body)
    .then(()=>next())
})

fallecidos.delete("/:_id",(req,res,next)=>{
    console.log("borro un fallecido")
    console.log(req.body)

    db.remove({_id:req.params._id},{})
    .then(()=>next())
})

fallecidos.use((req,res)=>{
    console.log("Acá estamos")
    db.find({})
    .then((todos)=>{
        console.log("estos son todos")
        console.log(todos)
        res.json(todos)
    })
});




app.use("/fallecidos",fallecidos)
app.listen(3000,()=>console.log("escuchando en 3000"));