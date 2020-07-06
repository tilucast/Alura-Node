module.exports = {
    erro404: require('./errors/404.marko'),
    erro500: require('./errors/500.marko'),
    home: require('./home/home.marko'),
    list: require('./books/list/list.marko'),
    form: require('./books/form/form.marko'),
    login: require('./session/login.marko'),
    signup: require('./session/signup.marko')
}