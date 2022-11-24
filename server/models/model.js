const mongoose = require('mongoose')

const categoriesModel = new mongoose.Schema(
    {
        type:{type:String,default:"Investment"},
        color:{type:String,default:"#FCBE44"},
        
    }
)
const transactionModel = new mongoose.Schema(
    {
        type:{type:String,default:"Anonymous"},
        name:{type:String,default:"Investment"},
        amount:{type:Number},
        date:{type:String,default:Date.now},
        
    }
)
const categories = mongoose.model('Categories',categoriesModel)
const transaction = mongoose.model('Transaction',transactionModel)

exports.default = transaction;

module.exports ={
    transaction,
    categories
}