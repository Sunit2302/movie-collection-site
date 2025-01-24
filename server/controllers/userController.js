import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Register user
// export const registerUser = async (req, res) => {
//   const { name, email, password } = req.body;

//   const userExists = await User.findOne({ email });

//   if (userExists) {
//     return res.status(400).json({ message: "User already exists" });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const user = new User({
//     name,
//     email,
//     password: hashedPassword,
//   });

//   await user.save();

//   res.status(201).json({ message: "User registered successfully" });
// };

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if the user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash the password before saving to DB
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user object
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    // Save the user to the database
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token, user });
};
