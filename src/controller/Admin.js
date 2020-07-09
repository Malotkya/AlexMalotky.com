class Admin {
    constructor() {
        this.path = "/Admin";
    }

    async get(req, res) {
        if(req.session.user) {
            if(req.session.user.roles.includes("Admin")) {
                res.render("admin", {user:req.session.user});
            } else {
                res.render("error", {
                    title:"Access Denied!",
                    message:"You must be logged in as an admin to access this page."
                });
            }

        } else {
            res.render("login", {callback:"/Admin"});
        }
    }
}

module.exports = new Admin();
