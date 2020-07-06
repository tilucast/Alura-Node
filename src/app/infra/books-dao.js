module.exports = class BooksDao{
    constructor(){
        this._db = require('../../config/database')
    }

    getBooks(usuarioId){
        return new Promise((resolve, reject) =>{
            this._db.all(`SELECT DISTINCT LIVROS.id, titulo, preco, descricao FROM LIVROS INNER JOIN USUARIOS on
            LIVROS.usuario_id = ?`, usuarioId , (err, result) => {
                resolve(result)
                reject(err)
            })
        })
    }

    createBooks({titulo, preco, descricao}, usuarioId){
        return new Promise((resolve, reject) =>{
            this._db.run(`INSERT INTO LIVROS ( titulo , preco , descricao, usuario_id)
            values (?, ?, ?, ?)`
            , [titulo, preco, descricao, usuarioId], (err) =>{

                if(!err)
                    return resolve(console.log(`Book was added successfully.`))

                reject(console.log(err))

            })
        })
    }

    readBook(id){
        return new Promise((resolve, reject) =>{
            this._db.get(`SELECT * FROM LIVROS WHERE id = ?`, [id], (err, book) =>{
                if(!err)
                    return resolve(book)

                reject(console.log(err))
            })
        })
    }

    updateBooks(book){
        return new Promise((resolve, reject) =>{
            this._db.run(`UPDATE LIVROS SET titulo =?, preco =?, descricao =? WHERE id =?`, 
            [book.titulo, book.preco, book.descricao, book.id] ,(err) =>{
                if(!err)
                    return resolve(console.log('Book was updated successfully.'))

                reject(console.log(err))
            })
        })
    }

    deleteBooks(bookId){
        return new Promise((resolve, reject) =>{
            this._db.run(`DELETE FROM LIVROS WHERE id = ?`, [bookId], (err) =>{
                if(!err)
                    return resolve(console.log('Book deleted successfully.'))

                reject(console.log(err))
            })
        })
    }

}