import { View } from './view.mjs'
import { DB } from './db.mjs'
import { User,Time,UsersItem,UsersProduct,Product,Item,Type,Img } from './model.mjs'
import { ModelHelper } from './model.mjs'


export class Controller {


    static top(){

        View.top()

    }
    static signUp(){

        View.signUp()

    }
    static registration(){

        let userName = document.getElementById("nameInput").value
        let newUser = new User(userName,20,0,50000)
        User.add(newUser)
        
        let newTime = new Time(newUser.id,1,1000)
        Time.add(newTime)

        Item.all().forEach(item => {
            let newUsersItem = new UsersItem(newUser.id, item.id)
            UsersItem.add(newUsersItem);
        });

        Controller.session(newUser.id)

    }
    static login(){
        //ログインページを表示
    }
    static session(user_id){

        document.getElementById("current-user-id").setAttribute("current-user-id", user_id )
        Controller.app()

    }
    static destroySession(){

        document.getElementById("current-user-id").setAttribute("current-user-id", "" )
        Controller.top()

    }
    static app(){

        View.app()

    }


    static createNewUsersProduct(product_id){

        let user_id = User.currentUser().id
        let newUsersProduct = new UsersProduct(user_id, product_id, 0)
        UsersProduct.add(newUsersProduct);

    }
    static updateUser(user_id, column,value){

        if(!column.indexOf("id") && column != "img_id")return false
        // let user = User.find(user_id)
        // user[column] = value
        User.currentUser()[column] = value

    }
    static updateUsersProduct(usersProduct_id, column, value){

        if( !column.indexOf("id") && column != "img_id")return false
        let usersProduct = UsersProduct.find(usersProduct_id)
        usersProduct[column] = value

    }
    static updateUsersItem(usersItem_id, column,value){

        if(!column.indexOf("id") && column != "img_id")return false
        let usersItem = UsersItem.find(usersItem_id)
        usersItem[column] = value;

    }
    static userPay(price){

        User.currentUser().totalMoney -= price;

    }
    static lockUsersItem(usersItem_id){
        let usersItem = UsersItem.find(usersItem_id)
        Controller.updateUsersItem(usersItem_id, "isUnlocked", false)
    }
    //以下のアンロック処理はproductやitemの数が増えたり順番が変わったりすると対応できないのでよろしくないけど今回はしょうがないので次回の課題
    static unlockSpecificUsersItems(product_id){
        let user_id = User.currentUser().id
        let abilityUsersItem;
        let manpowerUsersItem;

        switch(product_id){
            case 1 :
                abilityUsersItem = UsersItem.where("user_id",user_id, "item_id",4)[0]
                manpowerUsersItem = UsersItem.where("user_id",user_id, "item_id",7)[0]
                break;
            case 2 :
                abilityUsersItem = UsersItem.where("user_id",user_id, "item_id",5)[0]
                manpowerUsersItem = UsersItem.where("user_id",user_id, "item_id",8)[0]
                break;
            case 3 :
                abilityUsersItem = UsersItem.where("user_id",user_id, "item_id",6)[0]
                manpowerUsersItem = UsersItem.where("user_id",user_id, "item_id",9)[0]
                break;
        }
        Controller.updateUsersItem(abilityUsersItem.id, "isUnlocked", true)
        Controller.updateUsersItem(manpowerUsersItem.id, "isUnlocked", true)
    }

}



export class Render {
    static clickToSignUp(elementId){
        document.getElementById(elementId).addEventListener("click",()=> Controller.signUp())
    }
    static clickToLogin(elementId){
        document.getElementById(elementId).addEventListener("click",()=> Controller.login())
    }
    static clickToRegistration(elementId){
        document.getElementById(elementId).addEventListener("click",()=> Controller.registration())
    }
    static clickToSession(elementId,user_id){
        document.getElementById(elementId).addEventListener("click",()=> Controller.session(user_id))
    }
    static clickToDestroySession(elementId){
        document.getElementById(elementId).addEventListener("click",()=> Controller.destroySession())
    }
    static clickToApp(elementId){
        document.getElementById(elementId).addEventListener("click",()=> Controller.app())
    }
    static clickToLoadItemIndex(elementId){
        document.getElementById(elementId).addEventListener("click",()=> View.itemIndex())
    }


    static clickToShowDBInConsole(elementId){
        document.getElementById(elementId).addEventListener("click",()=> console.log(DB.showDB()))
    }
    

    static navLinks(){
        Render.clickToLogin("navLogin")
        Render.clickToDestroySession("navLogout")
        Render.clickToShowDBInConsole("navDB")
    }

}
