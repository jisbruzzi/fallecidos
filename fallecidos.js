const express=require("express");

function sonidoDeNombre(nombre){
    console.log("Entra el nombre",nombre)
    nombre=nombre.toLocaleLowerCase();
    
    let reemplazos=[
        //la gu la represento como g, la ge gi las represento como je ji
        ["ge","je"],
        ["gi","ji"],
        ["gue","ge"],
        ["gui","gi"],
        //la ch es el fonema 2
        ["ch","2"],
        //la y al final es el fonema i
        [/y$/g,"i"],
        //la ll y la sh son el fonema y
        ["ll","y"],
        ["sh","y"],
        //la b y la v son la b
        ["v","b"],
        //la c es s a veces, el resto de las veces es k
        ["ce","se"],
        ["ci","si"],
        ["c","k"],
        //elimino las h
        ["h",""],
        //cambio la ñ por ni
        ["ñ","ni"],
        //la q suena como k
        ["qu","k"],
        ["q","k"],
        //la w suena como u
        ["w","u"],
        //la x suena como ks
        ["x","ks"],
        //la z suena como s
        ["z","s"],
        //remover acentos
        ["á","a"],
        ["é","e"],
        ["í","i"],
        ["ó","o"],
        ["ú","u"]
    ]

    for(let reemplazar of reemplazos){
        /*
        console.log(reemplazar);
        console.log(Object.keys(reemplazar));
        console.log(reemplazar.length);
        console.log(reemplazar[0])
        console.log(reemplazar[1]);
        */
        let sub=reemplazar[0];
        let reemplazo=reemplazar[1];
        if(typeof sub ==="string"){
            sub=new RegExp(sub,"g")
        }
        nombre=nombre.replace(sub,reemplazo);
    }

    nombre=nombre.replace(/  +/g," ")

    console.log("Sale el nombre",nombre)
    return nombre;
}

module.exports=function(db){
    const fallecidos=express.Router();

    fallecidos.post("/",(req,res,next)=>{
        console.log("Entra un fallecido")
        console.log(req.body)
        req.body.sonido=sonidoDeNombre(req.body.nombre);

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

    return fallecidos;
}




