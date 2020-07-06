const {validationResult, body} = require('express-validator')
const BookController = require('../controllers/BookController')
const SessionController = require('../controllers/SessionController')
const bookController = new BookController()
const sessionController = new SessionController()
const templates = require('../views/exportTemplates')

const validacaoLivro = [
    body('preco').isCurrency().withMessage("O preço deve ser um número."),
    body('titulo').isLength({min: 5}).withMessage("O título deve ter no mínimo 5 caracteres.")
]

const validacaoUser = [
    body('email').isEmail().withMessage("Digite um email válido."),
    body('senha').isLength({min: 6}).withMessage("A senha deve conter pelo menos 6 caracteres.")
]

module.exports = (app) =>{

    function checkAuthentication(req,res,next){
        if(req.isAuthenticated()){
            next();
        } else{
            res.redirect("/login");
        }
    }

    app.get('/', (req, res) =>{
        res.marko(templates.home)
    })

    app.route(sessionController.logIn)
        .get(sessionController.login())
        .post(sessionController.loggedIn())
        
    app.get(bookController.listBooks , checkAuthentication , bookController.getBooks())

    app.route(bookController.bookForm)
        .get(checkAuthentication, (req, res) => res.marko(templates.form, {book: {}} ))
        .post(validacaoLivro , bookController.createBook())
        .put(validacaoLivro, bookController.updateBook())

    app.get(bookController.bookUpdate, bookController.readABook())

    app.delete(bookController.bookDelete, bookController.deleteBook())

    app.route(sessionController.signUp)
        .get(sessionController.signup())
        .post(validacaoUser, sessionController.signedUp())

    app.get('/logout', (req, res) =>{
        req.logout()
        res.redirect('/')
    })

}