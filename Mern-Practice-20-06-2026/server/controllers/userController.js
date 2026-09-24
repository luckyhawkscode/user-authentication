import User from "../models/userModel.js"

export const createUser = async (req, res)=>{
    try {
        
    const {name, age, email, phone, feedback} = req.body;
    if(!name || !age || !email || !phone || !feedback) {
        return res.status(400).json({msg:"All fields are required!"});
    }

    if (typeof name !== "string" || name.length < 2) {
      return res.status(400).json({ msg: "Name must be at least 2 characters" });
    }

    if (isNaN(age) || age < 1 || age > 120) {
      return res.status(400).json({ msg: "Please enter a valid age" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ msg: "Please enter a valid email" });
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ msg: "Phone must be a 10-digit number" });
    }

    if (feedback.length < 10) {
      return res.status(400).json({ msg: "Feedback must be at least 10 characters" });
    }

    const existingEmail = await User.findOne({email});
    const existingPhone = await User.findOne({phone});

    if(existingEmail) return res.status(409).json({msg:"Email already exists!!"});
    if(existingPhone) return res.status(409).json({msg:"Phone No. already exists!!"});

    const newUser = await User.create({name, age, email, phone, feedback});
    return res.status(201).json({msg:"User created successfully", data:newUser});

    } catch (error) {
        console.log("error", error);
     return res.status(500).json({msg:"something went wrong"}, error);   
    }
}

export const getUsers = async (req, res)=>{
    try {
        const users = await User.find();
        console.log("users hai", users)
        return res.json(users);
      
    } catch (error) {
        return res.status(500).json({msg:error});
    }
}

