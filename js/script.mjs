import { View } from './view.mjs'
import { DB } from './db.mjs'
import { User,Time,BoughtItem,Product,Item,Type,Img } from './model.mjs'
import { ModelHelper } from './model.mjs'



//==============================================
//DBの初期化 (initilize DB )
//==============================================

[
    new Img("Hamburger","https://cdn.pixabay.com/photo/2012/04/14/15/37/cheeseburger-34315_1280.png")
].forEach(img => Img.add(img));

[
    new User("master", 20, 0,50000)
].forEach(user => User.add(user));

[
    new Item( 1 , 1 , "Hamburger"               , "Release Hamburger"                                , 1   , 30000         ),
    new Item( 1 , 1 , "Lemonade"                , "Release Lemonade"                                 , 1   , 60000         ),
    new Item( 1 , 1 , "Ice Cream"               , "Release Ice Cream"                                , 1   , 90000         ),
    new Item( 2 , 1 , "Flip machine"            , "Increase earning from making Hamburger by 25 yen" , 500 , 15000         ),
    new Item( 2 , 1 , "Lemonade Stand"          , "Increase earning from making Lemonade by 50 yen"  , 1000, 30000         ),
    new Item( 2 , 1 , "Ice Cream Truck"         , "Increase earning from making Ice Cream by 150 yen", 500 , 100000        ),
    new Item( 3 , 1 , "Hamburger Coworker"      , "Employ worker for making Hamburger"               , 10  , 3000          ),
    new Item( 3 , 1 , "Lemonade Coworker"       , "Employ worker for making Lemonade"                , 10  , 3000          ),
    new Item( 3 , 1 , "Ice Cream Coworker"      , "Employ worker for making Ice Cream"               , 10  , 3000          ),
    new Item( 4 , 1 , "ETF Stock"               , "Get 0.1% of total price of  this item you bought" , null, 300000        ),
    new Item( 4 , 1 , "ETF Bonds"               , "Get 0.07% of total price of  this item you bought", null, 300000        ),
    new Item( 5 , 1 , "House"                   , "Get 32000 yen per day"                            , 100 , 20000000      ),
    new Item( 5 , 1 , "TownHouse"               , "Get 64000 yen per day"                            , 100 , 40000000      ),
    new Item( 5 , 1 , "Mansion"                 , "Get 500000 yen per day"                           , 20  , 250000000     ),
    new Item( 5 , 1 , "Industrial Space"        , "Get 2200000 yen per day"                          , 10  , 1000000000    ),
    new Item( 5 , 1 , "Hotel Skyscraper"        , "Get 25000000 yen per day"                         , 5   , 10000000000   ),
    new Item( 5 , 1 , "Bullet-Speed Sky Railway", "Get 30000000000 yen per day"                      , 1   , 10000000000000)
].forEach(item => Item.add(item));


[
    new Type( "Product"     , ModelHelper.productTypeEffection    ),
    new Type( "Ability"     , ModelHelper.abilityTypeEffection    ),
    new Type( "Manpower"    , ModelHelper.manpowerTypeEffection   ),
    new Type( "Investiment" , ModelHelper.investimentTypeEffection),
    new Type( "Real estate" , ModelHelper.realEstateTypeEffection )
].forEach(type => Type.add(type))

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

class Ele{
    static get(string){
        if(string.indexOf(" ") != -1 || string.indexOf(".") != -1 || string.indexOf("#") != -1)return document.querySelector(string)
        if(document.getElementById(string))return document.getElementById(string)
        else return document.getElementsByTagName(string).item[0]
    }
}

class Controller {

    static base(){
        if(!Ele.get("#main")) Ele.get("#body").innerHTML = View.base()
        Controller.nav()
    }
    static nav(){
        Ele.get("#navFrame").innerHTML = View.nav()


        Ele.get("#logIn").addEventListener("click",()=>{
            
        })
        Ele.get("#logout").addEventListener("click",()=>{
            
        })
        //デバッグ用
        Ele.get("#DB").addEventListener("click",()=> console.log(DB.showDB()))
    }
    static top(){
        Controller.base()

        Ele.get("#main").innerHTML = View.top()

        Ele.get("#main #newGameBtn").addEventListener("click",()=>{
            Controller.registration()
        })

        Ele.get("#main #logInBtn").addEventListener("click",()=>{
            //
        })
    }
    static registration(){
        Ele.get("#main").innerHTML = View.registration()

        Ele.get("#main  #startGameBtn").addEventListener("click",()=>{
            Controller.startGame()
        })
    }
    static startGame(){
        let userName = Ele.get("#main #nameInput").value
        let newUser = new User(userName,20,1,50000)
        User.add(newUser)
        
        let newTime = new Time(newUser.id,1,1000)
        Time.add(newTime)
        
        Ele.get("#main").innerHTML = View.frames()
        Ele.get("#main #userInfoFrame").innerHTML = View.userInfo(newUser)
        Ele.get("#main #productInfoFrame #slideMain").innerHTML  = View.productInfo()
        Ele.get("#main #itemInfoFrame").innerHTML = View.itemIndex()

        Controller.nav()
    }
}

Controller.top()