const templates = require('../views/exportTemplates')
const {validationResult} = require('express-validator')
const UserDao = require('../infra/UserDao')
const userDao = new UserDao()

class SessionController{

    constructor(){
        this.logIn = '/login'
        this.signUp = '/signup'
    }

    login(){
        return (req,res) =>{
            res.marko(templates.login)
        }
    }

    loggedIn(){
        return (req,res, next) =>{
            const passport = req.passport

            passport.authenticate('local', (err, user, info) =>{
                if(info)
                    return res.marko(templates.login, {info})
                
                if(err)
                    return next(err)

                req.login(user, (err) =>{
                    if(err){
                        console.log(err)
                        return next(err)
                    }

                    return res.redirect('/livros')
                })
            })(req, res, next)
        }   
    }

    signup(){
        return (req,res) =>{
            res.marko(templates.signup)
        }
    }

    signedUp(){
        return async(req, res) =>{
            const errors = validationResult(req)
            if(!errors.isEmpty())
                return res.marko(templates.signup, {book: req.body, errors: errors.array()})

            try{
                await userDao.createUser(req.body)
                res.redirect(this.logIn)
            }catch(err){
                console.log(err)
            }
        }
    }
}

module.exports = SessionController