import { DB } from './db.mjs'
import { User,Time,UsersItem,UsersProduct,Product,Item,Type,Img } from './model.mjs'
import { Controller,Render } from './controller.mjs'
import { Slider } from './slider.mjs'

export class View { 
    
    static top(){
        let innerMain =`
            <div class="d-flex justify-content-center h-90vh">
                <div class="col-6 mt-auto mb-auto">
                    <button id="newGameBtn" class="btn btn-primary w-100 m-3">NewGame</button>
                    <button id="loginBtn" class="btn btn-primary w-100 m-3">Log in</button>
                </div>
            </div>
        `

        document.getElementById("body").innerHTML = ViewTemplate.base(innerMain)
        Render.navLinks()
        Render.clickToSignUp("newGameBtn")
        Render.clickToLogin("loginBtn")
    }
    static signUp(){
        let innnerMain = `
            <div class="d-flex justify-content-center h-90vh">
                <div class="col-6 mt-auto mb-auto">
                    <h2>What's your Name ?</h2>
                    <input id="nameInput" type="text" class="form-control m-3">
                    <button id="startGameBtn" class="btn btn-primary w-100 m-3">Start Game</button>
                </div>
            </div>
        `

        document.getElementById("body").innerHTML = ViewTemplate.base(innnerMain)
        Render.navLinks()
        Render.clickToRegistration("startGameBtn")
    }
    static login(){
        //ログイン画面
    }
    static app(){
        let user = User.currentUser()

        let userInfo = ViewTemplate.userInfo(user)
        let productInfo = ViewTemplate.productSliderFrame()
        let itemInfo = ViewTemplate.itemIndex()

        document.getElementById("body").innerHTML = ViewTemplate.base(ViewTemplate.frames(userInfo,productInfo,itemInfo))
        Render.navLinks()
        new Slider(
            "sliderProduct",
            "productSliderShowFrame",
            "productSliderMain",
            "productSliderExtra",
            "productSliderLeftBtn",
            "productSliderRightBtn"
        ).set()
    }

}

export class ViewTemplate {
    static base(view){
        return `
            <header class="p-2 d-flex justify-content-between bg-dark">
                <h2 class="white text-3vw" >Clicker Empire Game</h2>

                    <!-- 
                    //=============================================
                    // nav
                    //=============================================
                    -->
                <div id="navFrame">
                    ${ViewTemplate.nav()}
                </div>
            </header>
            <div id="main" class="container-fliud">
                ${view}
            </div>
            <footer class="mt-lg-auto p-3 bg-dark">
                <div class="d-flex justify-content-center mb-5">
                    <small class="white">Copyright ©️ <a href="https://twitter.com/leandro83g" target="_blank">Leandro,inc</a>　All <a href="https://github.com/mcnLeandro/Clicker-Empire-Game" target="_blank">Rights</a> Unreserved</small>
                </div>
            </footer>
        `
    }
    static nav(){
        return `
        <ul class="nav">
            <li class="nav-item">
                <a id="navLogin" class="nav-link active white text-2vw click-object" href="#">
                    <i class="fas fa-sign-in-alt text-2vw"></i>
                    Login
                </a>
            </li>
            <li class="nav-item ${!User.currentUser()? "d-none":""}">
                <a id="navLogout" class="nav-link active white text-2vw click-object" href="#">
                    <i class="fas fa-sign-out-alt text-2vw"></i>
                    Logout
                </a>
            </li>
            <li class="nav-item ">
                <button id="navDB" class="btn btn-primary nav-link active white text-2vw click-object" href="#">
                    showDB
                </button>
            </li>
        </ul>
        `
    }
    static frames(userInfo, productInfo, itemInfo){
        return `
            <div  class="col-lg-7 col-12 bg-light-gray p-3 float-lg-right user-info-section">
                <!-- 
                //=============================================
                // userInfo
                //=============================================
                -->
                <div id="userInfoFrame">
                    ${userInfo}
                </div>
            </div>
            <div class="col-lg-5 col-12 bg-light-gray p-3 float-lg-left product-info-section">
                <!-- 
                //=============================================
                // productInfo
                //=============================================
                -->
                <div id="productInfoFrame">
                    ${productInfo}
                </div>
            </div>
            <div class="col-lg-7 col-12 bg-light-gray p-3 float-lg-right">
                <!-- 
                //=============================================
                // itemInfo
                //=============================================
                -->
                <div id="itemInfoFrame">
                    ${itemInfo}
                </div>
            </div>
        `
    }
    static userInfo(user){
        return `
            <div class="row mx-1 px-2 justify-content-center bg-heavy-gray rounded">
                <div class="col-xl col-lg-4 col-10 m-3 p-3 bg-light-gray rounded">${user.name}</div>
                <div class="col-xl col-lg-4 col-10 m-3 p-3 bg-light-gray rounded">${user.age} yrs old</div>
                <div class="col-xl col-lg-4 col-10 m-3 p-3 bg-light-gray rounded">${user.time().day} days</div>
                <div class="col-xl col-lg-4 col-10 m-3 p-3 bg-light-gray rounded">${user.totalMoney} yen</div>
            </div>
        `
    }
    static productDescription(usersProduct){
        return `
            <div class="text-center p-2 white">${usersProduct.amount} ${usersProduct.name.toLowerCase()}s</div>
            <div class="text-center p-2 white">${usersProduct.earning} yen per day </div>
        `
    }
    static productMakers(usersProduct){
        let maker = `<i class="fas fa-user fa-2x white up_down"></i>` + `\n`
        let makers = ``;

        // for(let i = 1 ; i <= usersProduct.makerAmount; i++) makers += maker;
        for(let i = 1 ; i <= 6 ; i++ ) makers += maker

        return makers;
    }
    static productImg(usersProduct){
        return `
            <div class="d-flex justify-content-center">
                <img src="${usersProduct.img().url}" alt="" width="70%">
            </div>
        `
    }
    static productInfo(usersProduct){
        return `
            <div class="sliderProduct">
                <div id="productDescription" class="col-11 my-3 bg-light-gray rounded">
                    ${ViewTemplate.productDescription(usersProduct)}
                </div>
                <div id="productImg" class="col-11 my-2  d-flex justify-content-center">
                    ${ViewTemplate.productImg(usersProduct)}
                </div>
                <div id="productMakers" class="col-11 my-5 row justify-content-center">
                    ${ViewTemplate.productMakers(usersProduct)}
                </div>
            </div>
        `
    }
    static productSliderFrame(){
        let productData = ""
        // User.currentUser().users_products().forEach(product => productData += ViewTamplate.productInfo(product)) 
        Product.all().forEach(product => productData += ViewTemplate.productInfo(product))

        return `
        <div id="slideFrame" class="row  mx-5 justify-content-center bg-heavy-gray rounded ">
            <div id="productSliderShowFrame" class="row flex-nowrap overflow-hiddens pl-lg-5 pl-3">
                <div id="productSliderMain" class="main full-width">

                </div>
                <div id="productSliderExtra" class="extra full-width">

                </div>
            </div>
            <div class="slider-data d-none">
                ${productData}
            </div>
            <div class="row  mx-2 justify-content-center bg-heavy-gray rounded">
                <div class="col-11 my-2 mt-auto">
                    <div id="controls" class="d-flex justify-content-center mt-2">
                        <button id="productSliderLeftBtn" class="btn btn-light"><</button>
                        <button id="productSliderRightBtn" class="btn btn-light">></button>
                    </div>
                </div>
            </div>
        </div>
        `
    }
    static item(item){
        let owning = ()=>{
            if(UsersItem.where("user_id",User.currentUser().id,"item_id",item.id).length == 0) return 0
            else return UsersItem.where("user_id",User.currentUser().id,"item_id",item.id)[0].amount
        }

        return `
            <section id="item${item.id}"  itemId="${item.id}" class="mt-2 p-2 rounded col-12">
                <div class="m-2 p-2 d-flex shadow bg-light-gray rounded">
                    <div class="col-3 p-3">
                        <img src="${item.img().url}" alt="" width="100%" height="" class="rounded">
                    </div>
                    <div class="p-3 col-6 ">
                        <h2>${item.name}</h2>
                        <p class="mt-3">Owning : ${owning()}</p>
                        <p>Price : ${item.price} yen</p>
                    </div>
                    <div class="mt-auto mb-auto col-3">
                        <button id="itemShowBtn" class="btn btn-primary w-100">show</button>
                    </div>
                </div>
            </section>
        `
    }
    static itemIndex(){
        let items = ""
        Item.all().forEach(item => items += ViewTemplate.item(item))

        return `
            <div class="row mx-1 px-2 justify-content-center bg-heavy-gray rounded">

                ${items}
                
            </div>
        `
    }
    //コメントアウトの部分。inoputの部分を別の関数として作り直してイベントを使ってtotalの部分だけでもrenderする必要がある
    static itemShow(item){
        let totalPrice = () => {

            if(!document.querySelector("#itemQuantityInput"))return 0;
            
            let value = document.querySelector("#itemQuantityInput").value;
            if(value == "" || value == null) return 0;
            else return item.price * parseInt(value);
        }
        let add = ()=>{
            document.querySelector("#itemQuantityInput").addEventListener("click",()=>{
                document.querySelector("#totalPrice").innerHTML = `Total : ${totalPrice()}`
            })
            document.querySelector("#itemQuantityInput").addEventListener("mouseleave",()=>{
                document.querySelector("#totalPrice").innerHTML = `Total : ${totalPrice()}`
            })
        }
        return `
        <div class="row mx-1 px-2 justify-content-center bg-heavy-gray rounded">

            <section class="mt-2 p-2 rounded">
                <div class="m-2 p-5 shadow bg-light-gray rounded">
                    <div>
                        <i id="goBackIcon" class="fas fa-arrow-circle-left fa-3x click-object"></i>
                    </div>
                    <div class="col-12 col-lg-3 ml-lg-auto float-lg-right">
                        <img src="${item.img().url}" alt="" width="100%" height="" class="rounded">
                    </div>
                    <div class="p-2 col-7 ">
                        <h2></h2>
                        <p>Max Purchases : ${item.stock}</p>
                        <p>Price : ${item.price}</p>
                        <h3>Effection</h3>
                        <p>${item.introduction}</p>
                    </div>
                    <div class="mt-2 d-flex justify-content-end ">
                        <div class="col-12 col-md-5 p-0 text-right">
                            <p>How many would you like to purchse?</p>
                            <input id="itemQuantityInput" type="number" class="form-control ml-auto my-2" min="0" max="${item.stock}">
                            <p id="totalPriceP" class="border-bottom">Total : ${totalPrice}</p>
                            <button id="purchaseBtn" class="btn btn-info w-100"> Purchase</button>
                        </div>
                    </div>
                </div>
            </section>
            
        </div>
        `
    }
}
