const express=require("express");
const app=express();
const Datastore = require('nedb')
const db = new Datastore({ filename: 'fallecidos.txt', autoload: true });
const util=require("util")
db.insert=util.promisify(db.insert)
db.find=util.promisify(db.find)
db.remove=util.promisify(db.remove)


app.use(require("body-parser").json())
app.use("/",express.static("website"))
app.use("/fallecidos",require("./fallecidos")(db))
app.get("/url",require("./myHost"))
app.get("/repetidos",require("./repetidos")(db))
app.listen(3000,()=>console.log("escuchando en 3000"));