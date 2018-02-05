
function sonRepetidos(e1,e2){
    return false;
}


module.exports=function(db){
    return function(req,res){
        db.find({})
        .then((todos)=>{
            let repeticiones=[];

            for(let e1 of todos){
                for(let e2 of todos){
                    let repeticion=sonRepetidos(e1,e2);
                    if(repeticion){
                        repeticiones.push({e1,e2,motivo:repeticion})
                    }
                }

            }

            return repeticiones;
        }).then((repeticiones)=>{
            res.json(repeticiones);
        })
    }
}