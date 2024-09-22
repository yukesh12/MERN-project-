const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Login function
exports.login = async (req, res) => {
    const { userName, password } = req.body;

    try {
        const user = await User.findOne({ userName });
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ msg: 'Login successful', token });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// Register function
exports.register = async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        let user = await User.findOne({ userName });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        user = new User({
            userName,
            email,
            password: await bcrypt.hash(password, 10),
        });

        await user.save();
        res.json({ msg: 'User registered successfully', userName, email });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};
