import jwt from "jsonwebtoken"
import { UnauthorizedResponse } from "../common/reponses.js";

const roles = {
    guest: 0,
    user: 1,
    admin: 2
}
function roleLevel(role) {
    return roles[role]
}

export function requireRole(role) {
    const middleware = (req, res, next) => {
        const token = req.headers['authorization'] || req.cookies.token;
        try {
            const data = jwt.verify(token, process.env.SECRET);
            res.locals.userData = data; //luu data vao bien userData de dung lan sau
            if(roleLevel(data.role) >= roleLevel(role)){
                next()
            }else{
                // res.json(UnauthorizedResponse()) //viet nhu nay
                //hoac nhu nay deu duoc
                throw Error('Unauthorized')
            }
            
        } catch (error) {
            res.json(UnauthorizedResponse())
        }
    }
    return middleware
}


//export default thi minh import ten_bien_gi_cung_duoc from ....
//vd trong file router minh dat export default a
//thi tat ca cac function cua a deu dc export chi bang import ten_gi_cung_dc




//naming  export thi export + function ten_function
//luc nay thi minh phai import theo dung { ten_function } nhu nay moi duoc
//con cua thg nay thi dung ten thg nao thg do chay