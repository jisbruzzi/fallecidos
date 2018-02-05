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


const pdfDocument=require("pdfkit");

app.get("/lista",(req,res)=>{
    db.find({})
    .then((todos)=>todos.map(e=>e.nombre))
    .then(nombres=>nombres.sort((n1,n2)=>{
        let arreglado1 = n1.split(" ").reverse().join(" ");
        let arreglado2 = n2.split(" ").reverse().join(" ");
        if(arreglado1<arreglado2) return -1;
        else return 1;
    }))
    .then(nombres => nombres.map((e,i)=>i+" - "+e))
    .then(nombresNumerados=>nombresNumerados.join("\n"))
    .then(texto=>{
        console.log("Empiezo a hacer el pdf")
        res.set({"Content-Disposition":"attachment; filename=\"Fallecidos.pdf\""});

        let doc= new pdfDocument();
        doc.pipe(res);
        doc.fontSize(25).text(texto);
        console.log("Antes de end")
        doc.end();
        console.log("Despues de end")
    })
    /*
    .then(texto=>pdf.create(texto).toBuffer((err,buffer)=>{
        console.log("Acá tengo el buffer");
        res.set({"Content-Disposition":"attachment; filename=\"Fallecidos.pdf\""});
        res.send(buffer);
    }))
    */

    /*
    .then(texto=>{
        res.set({"Content-Disposition":"attachment; filename=\"Fallecidos.txt\""});
        res.send(nombres)
    })
    */
})
app.listen(3000,()=>console.log("escuchando en 3000"));