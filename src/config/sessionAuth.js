const uuid = require('uuid/v4')
const expressSession = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const UserDao = require('../app/infra/UserDao')

module.exports = (app) => {

    passport.use(new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'senha'
        },

        async (email, senha, done) =>{
            const userDao = new UserDao()

            try{
               const user = await userDao.searchEmail(email)
               if(!user || senha != user.senha){
                   console.log('login ou senha incorretos.')
                   return done(null, false, {
                       mensagem: 'Login ou senha incorretos!'
                   })
               }

               return done(null, user)
            }catch(err){
                console.log(err)
                done(err, false)
            }
        }
    ))

    passport.serializeUser((user, done) =>{
        const userSession = {
            id: user.id,
            name: user.nome_completo,
            email: user.email
        }

        done(null, userSession)
    })

    passport.deserializeUser((userSession, done) =>{
        done(null , userSession)
    })

    app.use(expressSession({
        secret: 'algumacoisa',
        genid: req => uuid(),
        resave: false,
        saveUninitialized: false
    }))

    app.use(passport.initialize())
    app.use(passport.session())

    app.use((req, res, next) =>{
        req.passport = passport
        next()
    })
}