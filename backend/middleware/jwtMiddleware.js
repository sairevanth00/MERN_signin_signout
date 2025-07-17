import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).send({message: 'Access Denied'});
    jwt.verify(token, process.env.JWT_SECRET || 'VARMA', (err, user) => {
        if (err) return res.status(403).send({message: 'Invalid Token'});
        req.user = user;
        next();
    });
};