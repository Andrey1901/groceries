var frameModule = require("ui/frame");
var observableModule = require("data/observable");
var page;
var email;
var user = new observableModule.fromObject({
    email: "user@domail.com",
    password: "password"
})

exports.loaded = function(args) {
   page = args.object;
   page.bindingContext = user;
};
exports.signIn = function(){
    email=page.getViewById("email");
    console.log(email.text);
}
exports.register = function(){
    // alert("Registering")
    var topmost = frameModule.topmost();
    topmost.navigate("views/register/register")
}