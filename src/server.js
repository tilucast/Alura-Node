const app = require('./config/customExpress')
const port = process.env.PORT || 3000

app.listen(port, () => console.log(`servidor na porta ${port}`))

