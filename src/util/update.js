let dao = require("../dao/UserDao.js")

module.exports = async(req, res, next) => {

    if(req.session.user) {
        if(req.session.user.id > 0) {
            req.session.user = await dao.getById(req.session.user.id);
            res.locals.user = true;
        }
    } else {
        req.session.user = {
            roles:[],
            id:-1
        }
    }

    next();
}
