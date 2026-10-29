import { User } from "../models/user.model.js";
// Register User
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Basic validation
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // Check if user already exists
    const existing = await User.findOne({
      email: email.toLowerCase()
    });

    if (existing) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // Create new user
    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password
    });

    // Send success response
    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        email: user.email,
        username: user.username
      }
    });

  } catch (error) {
    console.error("Registration error:", error);

    if (res.headersSent) {
      return;
    }

    return res.status(500).json({
      message: "Internal server error"
    });
  }
};
// Login user
const loginUser = async (req, res) => {
    try {
        
        // checking if the user already exists
        const { email, password } = req.body;
       
        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if(!user) return res.status(400).json({
             message: "User not found"
        });

       
        // compare passwords
        const isMatch = await user.comparePassword(password);
        if(!isMatch) return res.status(400).json({
            message: "Invalid credentials"

        })

        res.status(200).json({
            message: "User Logged in",
            user: {
                id: user._id,
                email: user.email,
                username: user.username 
            }
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}
// Log out a user 22/10/2026
const logOutUser = async (req, res) =>{
  try{ 
    const {email} = req.body
    
    const user = await User.findOne({email: email});
    if(!user)
      return res.statuscode(404).json({message: "User not found"});

    res.status(200).json({message: 'logged out successfully'})



  } catch(error){ 
    res.status(500).json({message: "internal server error",error})

  }
}





export { registerUser,loginUser ,logOutUser};