const BooksDao = require('../infra/books-dao')
const {validationResult, body} = require('express-validator')
const templates = require('../views/exportTemplates')
const { get } = require('../../config/database')

class BookController{
    constructor(){
        this.listBooks = '/livros'
        this.bookForm = '/livros/form'
        this.bookUpdate = '/livros/form/:id'
        this.bookDelete = '/livros/:id'
    }

    getBooks(){
        return async (req, res) =>{
            try{
                const getBooks = await new BooksDao().getBooks(req.user.id)
                res.marko(templates.list, {books: getBooks})
            }catch(err){
                console.log(err)
            }
        }
    }

    readABook(){
        return async (req, res) =>{
            const id = req.params.id
    
            try{
                const readBook = await new BooksDao().readBook(id)
                res.marko(templates.form, { book: readBook })
            }catch(err){
                console.log(err)
            }
        }
    }

    createBook(){
        return (req, res) =>{
            const errors = validationResult(req)
            if(!errors.isEmpty())
                return res.marko(templates.form, {book: req.body, errors: errors.array()})
    
            try{
                new BooksDao().createBooks(req.body, req.user.id)
                res.redirect(this.listBooks)
            }catch(err){
                console.log(err)
            }
        }
    }

    updateBook(){
        return (req, res) =>{

            const errors = validationResult(req)
            if(!errors.isEmpty())
                return res.marko(templates.form, {book: req.body, errors: errors.array()})

            try{
                new BooksDao().updateBooks(req.body)
                res.redirect(this.listBooks)
            }catch(err){
                console.log(err)
            }
        }
    }

    deleteBook(){
        return (req, res) =>{
            const id = req.params.id
    
            try{
                new BooksDao().deleteBooks(id)
                res.status(200).end()
            }catch(err){
                console.log(err)
            }
        }
    }
}

module.exports = BookController;
