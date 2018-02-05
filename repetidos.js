
function sonRepetidos(e1,e2){
    let subconjunto=e1.sonido.split(" ");
    let superconjunto=e2.sonido.split(" ");
    //chequeo que todo lo del sub esté en el super, en el mismo orden que en el sub

    for(let superElem of superconjunto){//para cada elemento del super

        //o es igual al primero del sub (en cuyo caso luego se remueve el primero del sub)
        if(superElem===subconjunto[0]){
            subconjunto.shift();
            continue;
        }

        //o es distinto a los no-primeros del sub
        let hayNoPrimeroIgual=subconjunto.some((v,i)=>{
            return i!=0 && v===superElem;
        })
        if(hayNoPrimeroIgual){
            continue;
        }

        return false;
    }

    return "Tiene todos los nombres de "+e1.nombre;
}


module.exports=function(db){
    return function(req,res){
        db.find({})
        .then((todos)=>{
            let repeticiones=[];

            for(let e1 of todos){
                for(let e2 of todos){
                    if(e1==e2) continue;
                    
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