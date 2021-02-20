import { DB } from './db.mjs'
import { User,Time,UsersItem,UsersProduct,Product,Item,Type,Img } from './model.mjs'
import { Controller,Render } from './controller.mjs'
import { Slider } from './slider.mjs'

export class View { 
    
    static top(){


        document.getElementById("body").innerHTML = ViewTemplate.base(
            `
                <div class="d-flex justify-content-center h-90vh">
                    <div class="col-6 mt-auto mb-auto">
                        <button id="newGameBtn" class="btn btn-primary w-100 m-3">NewGame</button>
                        <button id="loginBtn" class="btn btn-primary w-100 m-3">Log in</button>
                    </div>
                </div>
            `
        )

        Render.navLinks()
        Render.clickToSignUp("newGameBtn")
        Render.clickToLogin("loginBtn")


    }
    static signUp(){


        document.getElementById("body").innerHTML = ViewTemplate.base(
            `
                <div class="d-flex justify-content-center h-90vh">
                    <div class="col-6 mt-auto mb-auto">
                        <h2>What's your Name ?</h2>
                        <input id="nameInput" type="text" class="form-control m-3">
                        <button id="startGameBtn" class="btn btn-primary w-100 m-3">Start Game</button>
                    </div>
                </div>
            `
        )

        Render.navLinks()
        Render.clickToRegistration("startGameBtn")


    }
    static login(){
        //ログイン画面
    }
    static userInfo(){


        let user = User.currentUser()
        document.getElementById("userInfoFrame").innerHTML =  `
            <div class="row mx-1 px-2 justify-content-center bg-heavy-gray rounded">
                <div class="col-xl col-lg-4 col-10 m-3 p-3 bg-light-gray rounded">${user.name}</div>
                <div class="col-xl col-lg-4 col-10 m-3 p-3 bg-light-gray rounded">${user.age.toLocaleString()} yrs old</div>
                <div class="col-xl col-lg-10 col-10 m-3 p-3 bg-light-gray rounded">${user.time().day.toLocaleString()} days</div>
                <div class="col-xl-11 col-10 m-3 p-3 bg-light-gray rounded">${user.totalMoney.toLocaleString()} yen</div>
            </div>
        `


    }
    static productInfoWithSlider(){


        document.getElementById("productInfoFrame").innerHTML = `
        <div id="slideFrame" class="row  mx-5 justify-content-center bg-heavy-gray rounded ">
            <div id="productSliderShowFrame" class="row flex-nowrap overflow-hiddens pl-lg-5 pl-3">
                <div id="productSliderMain" class="main full-width">

                </div>
                <div id="productSliderExtra" class="extra full-width">

                </div>
            </div>
            <div class="slider-data d-none">
                ${ User.currentUser().users_products().reduce((products,product) => products + ViewTemplate.productInfo(product),``)}
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

        new Slider(
            "sliderProduct",
            "productSliderShowFrame",
            "productSliderMain",
            "productSliderExtra",
            "productSliderLeftBtn",
            "productSliderRightBtn"
        ).set()


    }
    static itemIndex(){


        document.getElementById("itemInfoFrame").innerHTML =  `
            <div class="row mx-1 px-2 justify-content-center bg-heavy-gray rounded">

                ${Item.all().reduce((items,item) => items + ViewTemplate.item(item),``)}
                
            </div>
        `

        Item.all().forEach(item => {
            if(document.querySelector(`#item${item.id} #itemShowBtn`)){
                document.querySelector(`#item${item.id} #itemShowBtn`).addEventListener("click",()=>{
                    View.itemShow(item);
                })
            };
            
        })


    }
    //購入できる数はユーザーがいくつそのitemを持っているかで変更していく必要がある。
    //その辺の曖昧な部分をまだ考える必要がある。
    static itemShow(item){


        let inputControl = () =>{

            let input = document.querySelector("#itemQuantityInput");
            let value = input.value;

            if(item.stock != null && item.stock !== Infinity){
                if(value > item.stock) value = item.stock
                else if(value < 0)     value = ""
            }

            input.value = value;

        }
        let calculateTotalPrice = () => {

            if(!document.querySelector("#itemQuantityInput"))return 0;
            
            let value = document.querySelector("#itemQuantityInput").value;

            if(value == "" || value == null) return 0;
            return (item.price * parseInt(value)).toLocaleString();

        }
        let addEventListennerToInputSection = ()=>{

            document.querySelector("#itemQuantityInput").addEventListener("click",()=>{
                inputControl()
                document.querySelector("#totalPriceP").innerHTML = `Total : ${calculateTotalPrice()}`
            })
            document.querySelector("#itemQuantityInput").addEventListener("keyup",()=>{
                inputControl()
                document.querySelector("#totalPriceP").innerHTML = `Total : ${calculateTotalPrice()}`
            })
            document.getElementById("purchaseBtn").addEventListener("click",()=>{
                let quantity = document.getElementById("itemQuantityInput").value
    
                for(let i = 0; i < quantity ; i++) item.effection()
    
                View.itemIndex()
                View.userInfo()
            })

        }


        document.getElementById("itemInfoFrame").innerHTML = `
            <div class="row mx-1 px-2 justify-content-center bg-heavy-gray rounded">

                <section class="mt-2 p-2 rounded col-12" >
                    <div class="m-2 p-5 shadow bg-light-gray rounded">
                        <div>
                            <i id="goBackIcon" class="fas fa-arrow-circle-left fa-3x click-object"></i>
                        </div>
                        <div class="col-12 col-lg-3 ml-lg-auto float-lg-right">
                            <img src="${item.img().url}" alt="" width="100%" height="" class="rounded">
                        </div>
                        <div class="p-2 col-7 ">
                            <h2>${item.name}</h2>
                            <p>Max Purchases : ${item.stock != null ? item.stock.toLocaleString() : "∞"}</p>
                            <p>Price : ${item.price.toLocaleString()}</p>
                            <h3>Effection</h3>
                            <p>${item.introduction()}</p>
                        </div>
                        <div class="mt-2 d-flex justify-content-end ">
                            <div class="col-12 col-md-5 p-0 text-right">
                                <p>How many would you like to purchase?</p>
                                <input id="itemQuantityInput" type="number" class="form-control ml-auto my-2" min="0" max="${item.stock}">
                                <p id="totalPriceP" class="border-bottom">Total : ${calculateTotalPrice()}</p>
                                <button id="purchaseBtn" class="btn btn-info w-100"> Purchase</button>
                            </div>
                        </div>
                    </div>
                </section>
                
            </div>
        `


        Render.clickToLoadItemIndex("goBackIcon")
        addEventListennerToInputSection()

    }
    static app(){


        document.getElementById("body").innerHTML = ViewTemplate.base(ViewTemplate.frames())
        View.userInfo()
        View.itemIndex()
        View.productInfoWithSlider()

        Render.navLinks()


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
                    ${!userInfo?"":userInfo}
                </div>
            </div>
            <div class="col-lg-5 col-12 bg-light-gray p-3 float-lg-left product-info-section">
                <!-- 
                //=============================================
                // productInfo
                //=============================================
                -->
                <div id="productInfoFrame">
                    ${!productInfo?"":productInfo}
                </div>
            </div>
            <div class="col-lg-7 col-12 bg-light-gray p-3 float-lg-right">
                <!-- 
                //=============================================
                // itemInfo
                //=============================================
                -->
                <div id="itemInfoFrame">
                    ${!itemInfo?"":productInfo}
                </div>
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

        for(let i = 1 ; i <= usersProduct.makerAmount; i++) makers += maker;

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
    static item(item){


        let owning = ()=>{
            let usersItemSearchedArr = UsersItem.where("user_id",User.currentUser().id,"item_id",item.id)

            if(usersItemSearchedArr.length == 0) return 0
            else return usersItemSearchedArr[0].amount
        }

        return `
            <section id="item${item.id}"  itemId="${item.id}" class="mt-2 p-2 rounded col-12">
                <div class="m-2 p-2 d-flex shadow bg-light-gray rounded">
                    <div class="col-3 p-3">
                        <img src="${item.img().url}" alt="" width="100%" height="" class="rounded">
                    </div>
                    <div class="p-3 col-6 ">
                        <h2>${item.name}</h2>
                        <p class="mt-3">Owning : ${owning().toLocaleString()}</p>
                        <p>Price : ${item.price.toLocaleString()} yen</p>
                    </div>
                    <div class="mt-auto mb-auto col-3">
                        <button id="itemShowBtn" class="btn btn-primary w-100">show</button>
                    </div>
                </div>
            </section>
        `


    }
}
