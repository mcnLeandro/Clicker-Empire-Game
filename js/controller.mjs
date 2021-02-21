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
        let usersProductSearchedArr = UsersProduct.where("user_id",user_id, "product_id",product_id)

        if(usersProductSearchedArr.length == 0){

            let newUsersProduct = new UsersProduct(user_id, product_id, 0)
            UsersProduct.add(newUsersProduct);
        }
    }
    static createNewUsersItem(item_id){

        let user_id = User.currentUser().id
        let usersItemSearchedArr = UsersItem.where("user_id",user_id, "item_id",item_id)

        if(usersItemSearchedArr.length == 0){

            let newUsersItem = new UsersItem(user_id, item_id, 1)
            UsersItem.add(newUsersItem);

        }
        else{
            usersItemSearchedArr[0].amount += 1;
        }

    }


    static userPay(price){
        User.currentUser().totalMoney -= price;
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
