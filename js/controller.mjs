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

    static base(){
        if(!document.querySelector("#main")) document.querySelector("#body").innerHTML = View.base()
        Controller.nav()
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
        Controller.base()

        document.querySelector("#main").innerHTML = View.top()

        document.querySelector("#main #newGameBtn").addEventListener("click",()=>{
            Controller.registration()
        })

        document.querySelector("#main #logInBtn").addEventListener("click",()=>{
            //
        })
    }
    static registration(){
        document.querySelector("#main").innerHTML = View.registration()

        document.querySelector("#main  #startGameBtn").addEventListener("click",()=>{
            Controller.startGame()
        })
    }
    static userInfo(user){
        document.querySelector("#main #userInfoFrame").innerHTML = View.userInfo(user)
    }
    static itemShow(){
        document.querySelector("#main #itemInfoFrame").innerHTML += View.itemShow(Item.find(13))
    }
    static itemIndex(){
        document.querySelector("#main #itemInfoFrame").innerHTML = View.itemIndex()
        Controller.itemShow()
    }
    static productInfo(){
        document.querySelector("#main #productInfoFrame #slideMain").innerHTML  = View.productInfo()
    }
    static game(user){
        document.querySelector("#main").innerHTML = View.frames()
        Controller.userInfo(user)
        Controller.productInfo()
        Controller.itemIndex()
    }
    static startGame(){
        let userName = document.querySelector("#main #nameInput").value
        let newUser = new User(userName,20,1,50000)
        User.add(newUser)
        
        let newTime = new Time(newUser.id,1,1000)
        Time.add(newTime)

        Controller.game()   
        Controller.nav()
    }
}
export class SessionsController {

}
export class registrationsController {

}

export class UsersController {

}
export class TimesController {

}
export class BoughtItemsController {

}
export class ProductsController {

}
export class ItemsController {

}
export class TypesController {

}
export class ImgsController {
    
}

