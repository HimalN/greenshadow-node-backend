import dotenv from "dotenv";
import express from "express";
import {getUserByEmail, registerUser, verifyUser} from "../database/user-data-store";
import jwt, {Secret} from 'jsonwebtoken';
import User from "../model/User";

dotenv.config();
const router = express.Router();

router.post('/register', async (req, res) => {
    const email = req.body.user.email;
    const password = req.body.user.password;
    const role = req.body.user.role;

    const user : User = {email, password, role};

    try {
        const userRegistered = await registerUser(user);
        res.status(201).json(userRegistered);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering user');
    }
});

router.post('/login', async (req, res) => {
    const email = req.body.user.email;
    const password = req.body.user.password;

    const userFromDB = await getUserByEmail(email);
    if (!userFromDB) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
    }
    const role = userFromDB.role;
    const user : User = {email, password, role};

    try {
        const isValidUser = await verifyUser(user);

        if (isValidUser) {
            const token = jwt.sign({email}, process.env.SECRET_KEY as Secret, {expiresIn: '3h'});
            const refreshToken = jwt.sign({email}, process.env.SECRET_KEY as Secret, {expiresIn: '1d'});
            res.json({accessToken : token, refreshToken : refreshToken});
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering user');
    }
});

router.post('/refresh', async (req, res) => {
    const header = req.headers.authorization;
    const refreshToken = header?.split(' ')[1];

    if (!refreshToken) res.status(401).send('No token provided');

    try {
        const payload = jwt.verify(refreshToken as string, process.env.REFRESH_TOKEN as Secret) as {email: string};
        const token = jwt.sign({email: payload.email}, process.env.SECRET_KEY as Secret, {expiresIn: '1m'});
        res.json({accessToken : token});
    } catch (error) {
        console.error(error);
        res.status(500).send('Error refreshing token');
    }
});

export function authenticateToken(req: express.Request, res: express.Response, next: express.NextFunction) {
    const header = req.headers.authorization;
    const token = header?.split(' ')[1];

    console.log(token);
    if (!token) res.status(401).send('No token provided');

    try {
        const payload = jwt.verify(token as string, process.env.SECRET_KEY as Secret) as {email: string};
        console.log(payload.email);
        req.body.email = payload.email;
        next();
    } catch (error) {
        console.error(error);
        res.status(403).send('Invalid token');
    }
}

export default router;