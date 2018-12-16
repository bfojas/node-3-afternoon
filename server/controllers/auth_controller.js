const users = require('../models/users');

let id=1;


module.exports = {
    login: (req,res,next)=>{
        console.log('login')
        const {username,password} = req.body;
        const user = users.find(val =>
            val.username === username
            && val.password === password);
        if (user){
            req.session.user.username= user.username
            res.status(200).send(req.session.user)}
            else{ res.status(500).send(error=>{
                'invalid', error
            })}
        },

    
    register: (req,res,next)=>{
        const {username, password} = req.body;
        users.push({username,password,id});
        id++;
        req.session.user.username = username
        res.status(200).send(req.session.user)
    },
    signout: (req,res,next)=>{
        req.session.destroy();
        res.status(200).send(req.session)
    },
    getUser: (req,res,next)=>{
        res.status(200).json(req.session.user)
    }
}