import Table from "../model/Table.js"


export const addTable = async(req,res)=>{

try{

const {tableNumber,capacity,location,shopId} = req.body

const table = new Table({
tableNumber,
capacity,
location,
shopId
})

await table.save()

res.json({message:"Table added"})

}catch(err){

console.log(err)

res.status(500).json({message:"error"})

}

}


export const getTables = async(req,res)=>{

try{

const shopId = req.params.id

const tables = await Table.find({shopId})

res.json({tables})

}catch(err){

res.status(500).json(err)

}

}


export const deleteTable = async(req,res)=>{

try{

await Table.findByIdAndDelete(req.params.id)

res.json({message:"Deleted"})

}catch(err){

res.status(500).json(err)

}

}


export const updateTable = async(req,res)=>{

try{

await Table.findByIdAndUpdate(req.params.id,req.body)

res.json({message:"Updated"})

}catch(err){

res.status(500).json(err)

}

}

export const getTotalTable = async (req,res)=>{

    const shopId = req.params.id
    try{

        const total = await Table.countDocuments({shopId:shopId})       
        res.status(200).json({total})
    }catch(error){
        console.log(error)
        res.status(500).json({message:"error"})
    }
}