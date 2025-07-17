import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';

const getUserDetails = async (req, res) => {
    const user = await User.findOne({ userId: req.user.userId }, '-password');
    res.send(user);
};

const updatePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findOne({ userId: req.user.userId });
    const valid = await bcrypt.compare(oldPassword, user.password);
    if (!valid) return res.status(400).send({message: 'Old password incorrect'});
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.send({message: 'Password updated Successfully!'});
};

export { getUserDetails, updatePassword };