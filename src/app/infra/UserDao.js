class UserDao{
    constructor(){
        this._db = require('../../config/database')
    }

    createUser({nome_completo, email, senha}){
        return new Promise((resolve, reject) =>{
            this._db.run(`INSERT INTO USUARIOS (nome_completo, email, senha) values (?, ?, ?)`, 
            [nome_completo, email, senha], (err) =>{

                if(!err)
                    return resolve(console.log(`user created successfully.`))

                reject(console.log(err))

            })
        })
    }

    searchEmail(email){
        return new Promise((resolve,reject) =>{
            this._db.get(`SELECT * FROM usuarios WHERE email = ?`, email, (err, user) =>{
                if(!err){
                    return resolve(user)
                }
                
                return reject(`${err} - Não foi possível encontrar o usuário`)
            })
        })
    }
}

module.exports = UserDao