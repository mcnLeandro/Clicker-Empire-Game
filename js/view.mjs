import { User,Time,BoughtItem,Product,Item,Type,Img } from './model.mjs'

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
//             - "#itemInfoFrame"
//                 - "#item${item.id}"
//                 - "#itemShowBtn"
//                 - "#goBackIcon"
//                 - "#itemQuantityInput"
//                 - "#purchaseBtn"
//     - "footer"


export class View { 
    static base(){
        return `
            <header class="p-2 d-flex justify-content-between bg-dark">
                <h2 class="white text-3vw" >Clicker Empire Game</h2>

                    <!-- 
                    //=============================================
                    // nav
                    //=============================================
                    -->
                <div id="navFrame">
                    
                </div>
            </header>
            <div id="main" class="container-fliud">
                
            </div>
            <footer class="mt-md-auto p-3 bg-dark">
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
                <a id="logIn" class="nav-link active white text-2vw click-object" href="#">
                    <i class="fas fa-sign-in-alt text-2vw"></i>
                    Log in
                </a>
            </li>
            <li class="nav-item ${!User.currentUser()? "d-none":""}">
                <a id="logout" class="nav-link active white text-2vw click-object" href="#">
                    <i class="fas fa-sign-out-alt text-2vw"></i>
                    Logout
                </a>
            </li>
            <li class="nav-item ">
                <button id="DB" class="btn btn-primary nav-link active white text-2vw click-object" href="#">
                    showDB
                </button>
            </li>
        </ul>
        `
    }   
    static top(){
        return `
            <div class="d-flex justify-content-center h-90vh">
                <div class="col-6 mt-auto mb-auto">
                    <button id="newGameBtn" class="btn btn-primary w-100 m-3">NewGame</button>
                    <button id="logInBtn" class="btn btn-primary w-100 m-3">Log in</button>
                </div>
            </div>
        `
    }
    static registration(){
        return `
            <div class="d-flex justify-content-center h-90vh">
                <div class="col-6 mt-auto mb-auto">
                    <h2>What's your Name ?</h2>
                    <input id="namInput" type="text" class="form-control m-3">
                    <button id="startGameBtn" class="btn btn-primary w-100 m-3">Start Game</button>
                </div>
            </div>
        `
    }
    static frames(){
        return `
            <div  class="col-md-7 col-12 bg-light-gray p-3 float-md-right user-info-section">
                <!-- 
                //=============================================
                // userInfo
                //=============================================
                -->
                <div id="userInfoFrame">
            
                </div>
            </div>
            <div class="col-md-5 col-12 bg-light-gray p-3 float-md-left product-info-section">
                <!-- 
                //=============================================
                // productInfo
                //=============================================
                -->
                <div id="productInfoFrame">
                    <div id="slideMain"><div>
                    <div id="slideExtra"><div>
                </div>
            </div>
            <div class="col-md-7 col-12 bg-light-gray p-3 float-md-right">
                <!-- 
                //=============================================
                // itemInfo
                //=============================================
                -->
                <div id="itemInfoFrame">
            
                </div>
            </div>
        `
    }
    static userInfo(user){
        return `
            <div  userId="${user.id}" class="row mx-1 px-2 justify-content-center bg-heavy-gray rounded">
                <div class="col-xl col-sm-5 col-10 m-3 p-3 bg-light-gray rounded">${user.name}</div>
                <div class="col-xl col-sm-5 col-10 m-3 p-3 bg-light-gray rounded">${user.age} yrs old</div>
                <div class="col-xl col-sm-5 col-10 m-3 p-3 bg-light-gray rounded">${user.time().day} days</div>
                <div class="col-xl col-sm-5 col-10 m-3 p-3 bg-light-gray rounded">${user.totalMoney} yen</div>
            </div>
        `
    }
    //slider問題
    static productInfo(){
        return `
            <div class="row  mx-2 justify-content-center bg-heavy-gray rounded ">
                <div class="col-11 my-3 bg-light-gray rounded">
                    <div class="text-center p-2 white">${1000} burgers</div>
                    <div class="text-center p-2 white">${25} yen per day </div>
                </div>
                <div class="col-11 my-2  d-flex justify-content-center">
                    <div class="d-flex justify-content-center">
                        <img src="https://cdn.pixabay.com/photo/2012/04/14/15/37/cheeseburger-34315_1280.png" alt="" width="70%">
                    </div>
                </div>
                <div class="col-11 my-5 row justify-content-center">
                    <i class="fas fa-user fa-2x white up_down"></i>
                    <i class="fas fa-user fa-2x white up_down"></i>
                    <i class="fas fa-user fa-2x white up_down"></i>
                    <i class="fas fa-user fa-2x white up_down"></i>
                    <i class="fas fa-user fa-2x white up_down"></i>
                    <i class="fas fa-user fa-2x white up_down"></i>
                    <i class="fas fa-user fa-2x white up_down"></i>
                    <i class="fas fa-user fa-2x white up_down"></i>
                    <i class="fas fa-user fa-2x white up_down"></i>
                    <i class="fas fa-user fa-2x white up_down"></i>
                </div>
                <div class="col-11 my-2 mt-auto">
                    <div class="d-flex justify-content-center mt-2">
                        <button id="slideLeftBtn" class="btn btn-light"><</button>
                        <button id="slideRightBtn" class="btn btn-light">></button>
                    </div>
                </div>
            </div>
        `
    }
    static item(){
        return `
            <section id="item${1}"  value="${1}" class="mt-2 p-2 rounded ">
                <div class="m-2 p-2 d-flex shadow bg-light-gray rounded">
                    <div class="col-3 p-3">
                        <img src="https://cdn.pixabay.com/photo/2012/04/14/15/37/cheeseburger-34315_1280.png" alt="" width="100%" height="" class="rounded">
                    </div>
                    <div class="p-3 col-6 ">
                        <h2>House</h2>
                        <p class="mt-3">Owning : ${10}</p>
                        <p>Price : ${90319} yen</p>
                    </div>
                    <div class="mt-auto mb-auto col-3">
                        <button id="itemShowBtn" class="btn btn-primary w-100">show</button>
                    </div>
                </div>
            </section>
        `
    }
    static itemIndex(){
        return `
            <div class="row mx-1 px-2 justify-content-center bg-heavy-gray rounded">

                ${Viewitem()}
                
            </div>
        `
    }
    static itemShow(){
        return `
        <div class="row mx-1 px-2 justify-content-center bg-heavy-gray rounded">

            <section class="mt-2 p-2 rounded">
                <div class="m-2 p-5 shadow bg-light-gray rounded">
                    <div>
                        <i id="goBackIcon" class="fas fa-arrow-circle-left fa-3x click-object"></i>
                    </div>
                    <div class="col-12 col-md-3 ml-md-auto float-md-right">
                        <img src="https://cdn.pixabay.com/photo/2012/04/14/15/37/cheeseburger-34315_1280.png" alt="" width="100%" height="" class="rounded">
                    </div>
                    <div class="p-2 col-7 ">
                        <h2>House</h2>
                        <p>Max Purchases : ${100}</p>
                        <p>Price : ${10}</p>
                        <h3>Effection</h3>
                        <p>${"Get 32,000 extra yen per second"}</p>
                    </div>
                    <div class="mt-2 d-flex justify-content-end ">
                        <div class="col-12 col-md-5 p-0 text-right">
                            <p>How many would you like to purchse?</p>
                            <input id="itemQuantityInput" type="number" class="form-control ml-auto my-2">
                            <p class="border-bottom">Total : ${100000000}</p>
                            <button id="purchaseBtn" class="btn btn-info w-100"> Purchase</button>
                        </div>
                    </div>
                </div>
            </section>
            
        </div>
        `
    }

}
