import Menu from '../model/Menu.js';

export const addMenu = async(req,res)=>{

    const { name, category, price, type, shopId } = req.body
    const image = req.file ? req.file.filename : null;
    try {
        const menu = new Menu({ name, category, price, type, image, shopId })
        await menu.save()
        res.status(200).json({message:"Menu added successfully"})
    }catch (error) {
        console.log(error);
        res.status(500).json({message:"erorr"})
    }   
}

export const getMenu = async(req,res)=>{
    const shopId = req.params.id
    try {
        const menu = await Menu.find({shopId: shopId})
        res.status(200).json({menu})
    }catch (error) {
        console.log(error);
        res.status(500).json({message:"erorr"})
    }
}

export const deleteMenu = async(req,res)=>{
    const menuId = req.params.id
    try {
        await Menu.findByIdAndDelete(menuId)
        res.status(200).json({message:"Menu deleted successfully"})
    }   
    catch (error) {
        console.log(error);
        res.status(500).json({message:"erorr"})
    }       
}

export const updateMenu = async(req,res)=>{
    const menuId = req.params.id
    const { name, category, price, type } = req.body
    
    const updateData = { name, category, price, type }
    if (req.file) {
        updateData.image = req.file.filename;
    }

    try {
        await Menu.findByIdAndUpdate(menuId, updateData)
        res.status(200).json({message:"Menu updated successfully"})
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message:"erorr"})
    }

}

export const getTotalMenu = async(req,res)=>{

    const shopId = req.params.id    
    try{

        const total = await Menu.countDocuments({shopId:shopId})
        res.json({ total: total })
    }catch(error){
        console.log(error);
        res.status(500).json({message:"erorr"})
    }
}