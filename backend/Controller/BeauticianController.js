const Beautician=require("../Models/BeauticianModel");
const multer = require("multer");
const path = require("path");


// Configure multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Directory where files will be saved
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  });
  
  const upload = multer({ storage: storage }).single('profilePhoto');



//Data Display
const getAllBeauticians=async(req,res,next)=>{
    let beauticians;
    //Get all users
    try{
        beauticians=await Beautician.find();

    }catch(err){
        console.log(err);
    }
    //not found
    if(!beauticians){
        return res.status(404).json({message:"Beautician not found"});
    }
    //Display all users
    return res.status(200).json({beauticians});

};

//Data Insert
const addBeauticians=async(req,res,next)=>{
    upload(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }

    const {title,firstname,lastname,dateofbirth,gender,mobileno,email,address}=req.body;
    const profilePhoto = req.file.path;
    
    let beauticians;

    try {
        beauticians=new Beautician({title,firstname,lastname,dateofbirth,gender,mobileno,email,address,profilePhoto,});
        await beauticians.save();
    }
    catch(err){
        console.log(err);
    }
  // not insert users
  if (!beauticians){
    return res.status(404).json({message:"unable to add beauticians"});
  }
  return res.status(200).json({beauticians});
    });

};

 //Get by Id
   const getById=async(req,res,next)=>{
    const id=req.params.id;
    let beauticians;

    try{
        beauticians=await Beautician.findById(id);
    }
    catch(err){
        console.log(err);
    }

     // not available users
  if (!beauticians){
    return res.status(404).json({message:"Beautician Not found"});
  }
  return res.status(200).json({beauticians});
    };

     //Update User Details
 const updateBeautician=async(req,res,next)=>{
    const id =req.params.id;
    const {title,firstname,lastname,dateofbirth,gender,mobileno,email,address}=req.body;

    let beauticians;

    try{
        beauticians=await Beautician.findByIdAndUpdate(id,
            {title:title,firstname:firstname,lastname:lastname,dateofbirth:dateofbirth,gender:gender,mobileno:mobileno,email:email,address:address});  
            beauticians=await beauticians.save();
        }catch(err){
            console.log(err);
        }
        if (!beauticians){
            return res.status(404).json({message:"Unable to Update"});
          }
          return res.status(200).json({beauticians});
            };

    //Delete User
    const deleteBeautician = async(req,res,next)=>{
        const id=req.params.id;

        let beauticians;
        try{
            beauticians=await Beautician.findByIdAndDelete(id)

            }
            catch (err){
                console.log(err);
            }

            if (!beauticians){
                return res.status(404).json({message:"Unable to Delete User Details"});
              }
              return res.status(200).json({beauticians});
                };


    

   

exports.getAllBeauticians = getAllBeauticians;
exports.addBeauticians = addBeauticians;
exports.getById = getById;
exports.updateBeautician=updateBeautician;
exports.deleteBeautician=deleteBeautician;
exports.upload=upload;