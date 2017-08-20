var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
var page;
var groceryListViewModel = require("../../shared/view-models/grocery-list-view-model")
var groceryList = new groceryListViewModel([]);
var pageData = new observableModule.fromObject({
    groceryList: groceryList,
    grocery: ""
})
exports.loaded = function(args) {
    page = args.object;
    var listView = page.getViewById("groceryList");
    page.bindingContext = pageData;

    groceryList.empty();
    pageData.set("isLoading", true);
    groceryList.load().then(function() {
        pageData.set("isLoading", false);
        listView.animate({
            opacity: 1,
            duration: 1000
        });
    });
};

exports.add = function(){
    if (pageData.get("grocery").trim() === "") {
        dialogsModule.alert({
            message: "Enter a greocery item",
            okButtonText: "OK"
        });
        return;
    }

    page.getViewById("grocery").dismissSoftInput();
    groceryList.add(pageData.get("grocery"))
        .catch(function(){
            dialogsModule.alert({
                message: "",
                okButtonText: ""
            });
        });

    pageData.set("grocery", "");
}