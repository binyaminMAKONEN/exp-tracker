const model = require('../models/model')

const create_Categories = async(req,res)=>{
    create = new model.categories({
        type:'Investment',
        color:'#FCBE44'
    })
 await   create.save(err =>{
        if(!err) return res.json(create);
        return res.status(400).json({message : `Error while creating categories ${err}`})
    })
}
const get_Categories = async(req,res)=>{
  let data = await  model.categories.find({})
  let dataFilter = await  data.map(v=>Object.assign({},{type:v.type,color:v.color}))
  return res.json(dataFilter)
}

const create_Transaction = async(req,res)=>{
    if(!req.body)return res.status(400).json('Post HTTP Data not Provided')
    create =await new model.transaction({
        type:req.body.type,
        name:req.body.name,
        amount:req.body.amount,
        date:new Date(),
    })
 await   create.save(err =>{
        if(!err) return res.json(create);
        return res.status(400).json({message : `Error while creating categories ${err}`})
    })
}

const get_Transaction = async(req,res)=>{
    let data = await  model.transaction.find({})
    return res.json(data)
  }

const delete_Transaction = async (req,res)=>{
  if(!req.body)return res.status(400).json('Request body not found ')
  await model.transaction.deleteOne(req.body,(err)=>{
    if(!err) return res.json(`Recover Deleted...!`)
  }).clone().catch(function(err){res.json('Error while deleting Transaction Record')})
} 

const get_Labels = async (req,res)=>{
  await  model.transaction.aggregate([
        {
            $lookup : {
                from: "categories",
                localField: 'type',
                foreignField: "type",
                as: "categories_info"
            }
        },
        {
            $unwind:{path:"$categories_info"} 
        }
    ]).then(result => {
        let data = result.map(v => Object.assign({}, { _id: v._id, name: v.name, type: v.type, amount: v.amount, color: v.categories_info['color']}));
       return res.json(data);
    }).catch(error => {
        res.status(400).json("Looup Collection Error");
    })
}

module.exports = {
    create_Categories,
    get_Categories,
    create_Transaction,
    get_Transaction,
    delete_Transaction,
    get_Labels
}