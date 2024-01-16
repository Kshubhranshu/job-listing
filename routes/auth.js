const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;

        if (!name || !email || !mobile || !password) {
            return res.status(400).json({
                errorMessage: "Bad Request",
            });
        }

        const isExistingUser = await User.findOne({ email: email });
        if (isExistingUser) {
            return res.status(409).json({ message: "User already exists" });
        }
        // write a check for mobile number also

        const hashedPassword = await bcrypt.has(password, 10);

        const userData = new User({
            name,
            email,
            mobile,
            password: hashedPassword,
        });

        const userResponse = userData.save();

        const token = await jwt.sign(
            { userId: userResponse._id },
            process.env.JWT_SECRET
        );

        res.json({ message: "User registered successfully", token: token });
    } catch (error) {}

    // valid check
    // error handling
    // check if already user exists
    // write into the database
    // create model/ schema
    // joi and yup optional
});

module.export = router;
