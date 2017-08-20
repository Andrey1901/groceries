var UserViewModel = require("../../shared/view-models/user-view-model");
var user = new UserViewModel({
    email: "izarudnii@gmail.com",
    password: "12345"
});
var frameModule = require("ui/frame");
var dialogsModule = require("ui/dialogs")

var page;
var email;


exports.loaded = function(args) {
   page = args.object;
   page.bindingContext = user;
};
exports.signIn = function(){
    user.login()
    .catch(function(error){
        console.log("error");
        dialogsModule.alert({
            message: "Unfortunatelly we can't find your account",
            okButtonText: "OK"
        });
        return Promise.reject();
    })  
    .then(function(){
        frameModule.topmost().navigate("views/list/list")
    });
}
exports.register = function(){
    // alert("Registering")
    var topmost = frameModule.topmost();
    topmost.navigate("views/register/register")
}