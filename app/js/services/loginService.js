module.exports = function() {
    var admin = 'teste@email.com';
    var pass = 'senha';
    var isAuthenticated = false;
    return {
        login: function(username, password) {
            isAuthenticated = username === admin && password === pass;
            return isAuthenticated;
        },
        isAuthenticated: function() {
            return isAuthenticated;
        }
    }
}