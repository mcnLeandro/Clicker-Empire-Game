import { View } from './view.mjs'
import { DB } from './db.mjs'
import { User,Time,BoughtItem,Product,Item,Type,Img } from './model.mjs'
import { ModelHelper } from './model.mjs'
//==============================================
//HTMLElementの構成
//==============================================
// - "#body"
//     - "header"
//         - "#navFrame"
//             - "#logIn"
//             - "#logout"
//     - "#main"(registration)
//         - "#nameInput"
//         - "#startGameBtn"
//     - "#main"(top)
//         - "#newGameBtn"
//         - "#logInBtn"
//     - "#main"(game)
//         - "#userInfoFrame"
//             - "#userNameDiv"
//         - "#productInfoFrame"
//             - "#slideMain"
//                 - "#slideLeftBtn" 
//                 - "#slideRightBtn" 
//             - "#slideExtra" 
//                 - "#slideLeftBtn" 
//                 - "#slideRightBtn"
//         - "#itemInfoFrame"
//                 - "#item${item.id}"
//                 - "#itemShowBtn"
//                 - "#goBackIcon"
//                 - "#itemQuantityInput"
//                 - "#purchaseBtn"
//     - "footer"


export class Controller {
    top(){
        //トップ画面
    }
    signUp(){
        //登録画面
    }
    registration(){
        //登録処理
    }
    logIn(){
        //ログインページを表示
    }
    session(){
        //ログイン処理
        //headerとかにuser_idを埋め込むのがいいかも
    }
    app(){
        //ゲーム画面
    }

}

//=================
// 思考停止で作ってしまったので以下のcontrollerたちは必要がないかもしれない。
//==================
export class ApplicationController　{

    static base(){
        if(!document.querySelector("#main")) document.querySelector("#body").innerHTML = View.base()
        ApplicationController.nav()
    }
    static nav(){

        document.querySelector("#navFrame").innerHTML = View.nav()


        document.querySelector("#logIn").addEventListener("click",()=>{
            
        })
        document.querySelector("#logout").addEventListener("click",()=>{
            
        })
        //デバッグ用
        document.querySelector("#DB").addEventListener("click",()=> console.log(DB.showDB()))

    }
    static top(){

        ApplicationController.base()

        document.querySelector("#main").innerHTML = View.top()

        document.querySelector("#main #newGameBtn").addEventListener("click",()=>{
            Controller.registration()
        })

        document.querySelector("#main #logInBtn").addEventListener("click",()=>{
            //
        })

    }
    static app(user_id){

        let user = user_id != null ? User.find(user_id) : User.currentUser()

        document.querySelector("#main").innerHTML = View.frames()
        UsersController.show(user)
        ProductsController.show()
        ItemsController.index()

    }
    static startApp(user_id){
        
        registrationsController.create()
        ApplicationController.app()   
        Controller.nav()

    }
}
export class SessionsController extends ApplicationController{


}
export class registrationsController extends ApplicationController{

    static new(){
        document.querySelector("#main").innerHTML = View.registration()

        document.querySelector("#main  #startGameBtn").addEventListener("click",()=>{
            ApplicationController.startApp()
        })
    }
    static create(){
        let userName = document.querySelector("#main #nameInput").value
        let newUser = new User(userName,20,0,50000)
        User.add(newUser)
        
        let newTime = new Time(newUser.id,1,1000)
        Time.add(newTime)
    }

}
export class UsersController extends ApplicationController{

    show(user_id){
        let user = User.find(user_id)
        document.querySelector("#main #userInfoFrame").innerHTML = View.userInfo(user)
    }


}
export class TimesController extends ApplicationController{



}
export class BoughtItemsController extends ApplicationController{


    static create(item_id){
        let user_id = User.currentUser().id

        if(BoughtItem.where("user_id",user_id, "item_id",item_id).length == 0){

            let newBoughtItem = new BoughtItem(null, user_id, item_id, 0)
            BoughtItem.add(newBoughtItem);

        }
        else{
            BoughtItem.where("user_id",user_id, "item_id",item_id)[0].amount += 1;
        }
    }


}
export class ProductsController extends ApplicationController{

    static show(){
        document.querySelector("#main #productInfoFrame #slideMain").innerHTML  = View.productInfo()
    }
    static create(item_id, productEarning){
        let itemName = Item.find(item_id).name
        let user_id = User.currentUser().id

        let newProduct = new Product(null, user_id, item_id, itemName, 0 ,productEarning, 0);
        Product.add(newProduct);
    }


}
export class ItemsController extends ApplicationController{


    static index(){
        document.querySelector("#main #itemInfoFrame").innerHTML = View.itemIndex()
    }
    static show(item_id){
        document.querySelector("#main #itemInfoFrame").innerHTML += View.itemShow(Item.find(item_id))
    }

}
export class TypesController extends ApplicationController{



}
export class ImgsController extends ApplicationController{



}

