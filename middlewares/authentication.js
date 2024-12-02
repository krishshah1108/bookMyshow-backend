import jwt from 'jsonwebtoken';
import response from '../utils/response_util.js';
import {decrypt} from '../utils/encryptor_util.js';

const adminAuthenticate = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        const decryptedtoken = decrypt(bearerToken);
        jwt.verify(decryptedtoken, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                response.unAuthorized(res);
            } else {
                req.companyId = decoded.companyId;
                next();
            }
        });
    }else{
        response.unAuthorized(res);
    }
}

const authentication = {
    adminAuthenticate
}

export default authentication;