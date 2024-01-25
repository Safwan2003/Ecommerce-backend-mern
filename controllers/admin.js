
const User =require('../models/user')
const Order =require('../models/order')
const Product =require('../models/product')
const Vendor =require('../models/vendor')




const getAllUsers =async(req,res)=>{
 try {
    let user='user'
    const getusers = await User.find().select({role:user}).select('-password')
    res.json(getusers)
 } catch (err) {
    console.error(err.message)
    res.status(500).json({msg:'server error'})
 }
}


const deactivateUser = async(req,res)=>{
const userId   =  req.params.userId;
try {
    await User.findByIdAndRemove(userId);
    res.json({ msg: 'User deactivated or deleted' });
    
} catch (err) {
    console.error(err.message)
    res.status(500).json({msg:'Server error'})
}

}






const getAllVendors =async(req,res)=>{
 try {
    let vendor='vendor'
    const getvendors = await User.find().select({role:vendor}).select('-password')
    res.json(getvendors)
 } catch (err) {
    console.error(err.message)
    res.status(500).json({msg:'server error'})
 }
}

const approveVendor =async(req,res)=>{
 const vendorId= req.params.vendorId
 try {
     
     await User.findByIdAndUpdate(vendorId, { isApproved: true }, { new: true });
    res.json(`${vendorId} vendor approved`)
 } catch (err) {
    console.error(err.message)
    res.status(500).json({msg:'server error'})
 }
}
const rejectVendor =async(req,res)=>{
    const vendorId= req.params.vendorId
    try {
        await User.findByIdAndUpdate(vendorId, { isApproved: false }, { new: true });
    res.json(`${vendorId} vendor is rejected `)
} catch (err) {
    console.error(err.message)
    res.status(500).json({msg:'server error'})
 }
}










const getAllProducts =async(req,res)=>{
    try {
        const products =await Product.find()
        res.json(products)
    } catch (err) {
    console.error(err.message)
    res.status(500).json({msg:'server error'})
 }
}


const approveProduct =async(req,res)=>{
    const productId= req.params.productId
    try {
        await Product.findByIdAndUpdate(productId,{isApproved: true})
        res.json(`${productId} product is approved `) }
     catch (err) {
    console.error(err.message)
    res.status(500).json({msg:'server error'})
}
}
const rejectProduct =async(req,res)=>{
    const productId= req.params.productId
    try {
        await Product.findByIdAndUpdate(productId,{isApproved: false})
        res.json(`${productId} product is rejected `) }
        catch (err) {
            console.error(err.message)
            res.status(500).json({msg:'server error'})
 }
}

























const getAllOrders =async(req,res)=>{

    try {
        const order= await Order.find()
        res.json(order)
    }
     catch (err) {
    console.error(err.message)
    res.status(500).json({msg:'server error'})
 }
}

const shippedOrderStatus =async(req,res)=>{
const orderId = req.params.orderId;
try {
await Order.findByIdAndUpdate(orderId,{orderstatus:{ enum:['shipped']}})
        res.json(orderId+`Order is shipped`)
    }
    catch (err) {
        console.error(err.message)
        res.status(500).json({msg:'server error'})
    }
}
const cancelOrderStatus =async(req,res)=>{
    const orderId = req.params.orderId;
    try {
await Order.findByIdAndUpdate(orderId,{orderstatus:{ enum:['cancel']}})
        res.json(orderId+`Order is cancel`)
            }
     catch (err) {
         console.error(err.message)
    res.status(500).json({msg:'server error'})
 }
}




module.exports={getAllOrders,getAllProducts,getAllUsers,getAllVendors, 
    deactivateUser , approveVendor , rejectVendor , approveProduct , rejectProduct , shippedOrderStatus  ,cancelOrderStatus}