import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import Otp from '../models/otpModel.js';
import sendEmail from '../utils/sendEmail.js';

const sendOtp = async (req, res) => {
    const { email } = req.body;
    const otp = (Math.floor(100000 + Math.random() * 900000)).toString();
    await Otp.create({ email, otp });
    await sendEmail(email, 'Your OTP', `Your OTP is ${otp}`);
    res.status(200).send({message: 'OTP sent Successfully!'});
};

const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    const validOtp = await Otp.findOne({ email, otp });
    if (!validOtp) return res.status(400).send({message: 'Invalid or expired OTP'});
    await User.updateOne({ email }, { isVerified: true });
    res.send({message: 'Email verified Successfully!'});
};

const signup = async (req, res) => {
    const { firstName, lastName, email, mobile, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).send('Email already registered');
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        userId: 'user-' + Date.now(),
        firstName, lastName, email, mobile,
        password: hashedPassword,
        isVerified: true,
    });
    res.send(user);
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) return res.status(400).send('Email Not found!');
    console.log('user: ', user)
    if (!user || user.lockUntil > Date.now()) return res.status(400).send('Too many attempts. Try again later.');
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        user.loginAttempts += 1;
        if (user.loginAttempts >= 3) user.lockUntil = Date.now() + 3 * 60 * 60 * 1000;
        await user.save();
        return res.status(400).send(`Invalid credentials, only ${3 - user.loginAttempts} attempts left`);
    }
    user.loginAttempts = 0;
    user.lockUntil = null;
    await user.save();
    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET || 'VARMA');
    res.status(200).send({ token, message: 'Login successfully!' });
};

export { sendOtp, verifyOtp, signup, login };