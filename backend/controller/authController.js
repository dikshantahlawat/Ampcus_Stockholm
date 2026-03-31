// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// // ================= REGISTER =================
// export const register = async (req, res) => {
//   try {
//     const { name, email, password, confirmPassword, gender, age, mobile } = req.body;

//     // 1. Validation
//     if (!name || !email || !password) {
//       return res.status(400).json({ msg: "Please fill all required fields" });
//     }

//     // 2. Confirm password check
//     if (password !== confirmPassword) {
//       return res.status(400).json({ msg: "Passwords do not match" });
//     }

//     // 3. Check existing user
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ msg: "User already exists" });
//     }

//     // 4. Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // 5. Create user
//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       gender,
//       age,
//       mobile
//     });

//     // 6. Generate token
//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     // 7. Response
//     res.status(201).json({
//       msg: "User registered successfully",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         gender: user.gender,
//         age: user.age,
//         mobile: user.mobile
//       }
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: "Server error" });
//   }
// };


// // ================= LOGIN =================
// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // 1. Validation
//     if (!email || !password) {
//       return res.status(400).json({ msg: "Please enter email and password" });
//     }

//     // 2. Check user
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ msg: "Invalid email" });
//     }

//     // 3. Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ msg: "Wrong password" });
//     }

//     // 4. Generate token
//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     // 5. Response
//     res.json({
//       msg: "Login successful",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         gender: user.gender,
//         age: user.age,
//         mobile: user.mobile
//       }
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: "Server error" });
//   }
// };


// export const logout = async (req, res) => {
//   try {
//     // frontend token remove karega
//     res.json({ msg: "Logout successful" });
//   } catch (error) {
//     res.status(500).json({ msg: "Logout failed" });
//   }
// };


import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ================= REGISTER =================
export const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, gender, age, mobile } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Please fill all required fields" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ msg: "Passwords do not match" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      gender,
      age,
      mobile
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 🔥 COOKIE SET
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,      // true in production (https)
      sameSite: "lax"
    });

    res.status(201).json({
      msg: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        age: user.age,
        mobile: user.mobile
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};


// ================= LOGIN =================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Please enter email and password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 🔥 COOKIE SET
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    });

    res.json({
      msg: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        age: user.age,
        mobile: user.mobile
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};


// ================= LOGOUT =================
export const logout = async (req, res) => {
  try {
    // 🔥 COOKIE CLEAR
    res.clearCookie("token");

    res.json({ msg: "Logout successful" });
  } catch (error) {
    res.status(500).json({ msg: "Logout failed" });
  }
};