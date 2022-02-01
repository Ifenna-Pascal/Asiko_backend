const User = require('./../models/user');
const { verifyPassword } = require('./../services/bcrypt');
const { signToken } = require('./../services/jwt');


exports.userCreate = async (req, res, next) => {
    const data = req.body;

    if (!data.username || !data.password || !data.confirmPassword || !data.firstName || !data.lastName ) {
        return res.status(400).json({ message: "One Or More Input Fields Are Empty!" });
    }

    if (data.password !== data.confirmPassword ) {
        return res.status(400).json({ message: "Password Fields Do Not Match!" });
    }

    try {
        let user = await User.findOne({ username: data.username });
        if (user) return res.status(400).json({ message: "Email Has Been Used. Please Try Another." });

        const hash = await hashPassword(data.password);

        const newUser = await new User({
            username: data.username,
            password: hash,
            firstName: data.firstName,
            lastName: data.lastName
        }).save();

        return res.status(200).json({ message: "User Created Successfully!"});
    } catch(error) {
        next(error);
    }
}


exports.userLogin = async (req, res, next) => {
    const data = req.body;

    if (!data.username || !data.password) {
        return res.status(400).json({ message: "One Or More Input Fields Are Empty!" });
    }

    try {
        const user = await User.findOne({ username: data.username }).select('password');
        const isValidPassword = await verifyPassword(data.password, user.password);
        if (!user || !isValidPassword) return res.status(400).json({ message: "Invalid Email Or Password" });
        const token = signToken({ id: user._id, email: user.email });
        return res.status(200).json({ token });
    } catch (error) {
        next(error);
    } 
}


exports.userFeed = async (req, res, next) => {
    const user = req.user;

    try {
        const foundUser = await User.findById(user.id).select('password');
        return res.status(200).json({ foundUser });
    } catch (error) {
        next(error);
    }
}