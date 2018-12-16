const swag = require('../models/swag');

module.exports ={
    add: (req,res,next)=>{
        const {id} = req.query;
        let {cart} = req.session.user;
        let item = cart.findIndex(val => val.id == id)
        if (item ===-1) {
            console.log('item', item)
            const selected = swag.find(val=> val.id == id)
            cart.push(selected);
            req.session.user.total += selected.price;
            console.log('reqsession',req.session)
        } 
        res.status(200).send(req.session.user)

    },
    delete: (req,res,next)=>{
        const {id} = req.query;
        let {cart} = req.session.user;
        let item = cart.find(val=> val.id == id)
        if (item){
            const i = cart.findIndex(val=>val.id == id)
            cart.splice(i,1);
            req.session.user.total -= item.price
            }
        res.status(200).send(req.session.user)
    },
    checkout: (req,res,next)=>{
        req.session.user.cart = [];
        req.session.user.total = 0;
        res.status(200).send(req.session.user)
    }

    
}