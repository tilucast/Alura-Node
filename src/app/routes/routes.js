const BooksDao = require('../infra/books-dao')

module.exports = (app) =>{
    app.get('/', (req, res) =>{
        res.send(
            `
                <html>
                    <head><meta charset="utf-8"></head>
    
                    <body><h1>Alura Node</h1></body>
                </html>
            `
        )
    })
        
    app.get('/livros', async (req, res) =>{
        try{
            const getBooks = await new BooksDao().getBooks()
            res.marko(require('../views/books/list/list.marko'), {books: getBooks})
        }catch(err){
            console.log(err)
        }

    })

    app.get('/livros/form', (req, res) =>{
        res.marko(require('../views/books/form/form.marko'), { book: {}})

    })

    app.get('/livros/form/:id', async (req, res) =>{
        const id = req.params.id

        try{
            const readBook = await new BooksDao().readBook(id)
            res.marko(require('../views/books/form/form.marko'), { book: readBook })
        }catch(err){
            console.log(err)
        }
    })

    app.post('/livros', (req, res) =>{
        try{
            new BooksDao().createBooks(req.body)
            res.redirect('/livros')
        }catch(err){
            console.log(err)
        }
    })

    app.put('/livros', (req, res) =>{
        try{
            new BooksDao().updateBooks(req.body)
            res.redirect('/livros')
        }catch(err){
            console.log(err)
        }
    })

    app.delete('/livros/:id', (req, res) =>{
        const id = req.params.id

        try{
            new BooksDao().deleteBooks(id)
            res.status(200).end()
        }catch(err){
            console.log(err)
        }
    })
}