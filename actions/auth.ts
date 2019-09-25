import * as Bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { User } from '../models/User';

const db = mongoose.connection;

export const signIn = async (req: any, res: any) => {
    try {
        const user: any = await User.findOne({ email: req.body.email }).exec();
        if (user) {
            const cmp = await Bcrypt.compareSync(
                req.body.password,
                user.password
            );
            // add token with 10min expiry
            req.session.userId = user._id;
            req.session.expires = Date.now() + 1000 * 60 * 10;
            req.session.token =
                Math.random()
                    .toString(36)
                    .substring(2, 15) +
                Math.random()
                    .toString(36)
                    .substring(2, 15);
            req.session.save();
            res.json({
                success: true,
                token: req.session.token,
                expires: req.session.expires
            });
            return;
        }
    } catch (err) {
        console.log(err);
    }
    res.status(400).json({
        success: false,
        err: 'Invalid email / password combination!'
    });
};

export const signUp = async (req: any, res: any) => {
    try {
        const user = req.body;
        const created = await User.create(user);
        res.json({ success: true, created });
    } catch (err) {
        res.status(400).json({ success: false, err: err.errmsg || err });
    }
};

export const signOut = async (req: any, res: any) => {
    await req.session.destroy();
    res.json({ success: true });
};
