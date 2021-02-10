export class View {
    static base(){
        return `
            <header class="p-2 d-flex justify-content-between bg-dark">
                <h2 class="white" >Clicker Empire Game</h2>
    
                    <!-- 
                    //=============================================
                    // option
                    //=============================================
                    -->
                <div id="option_frame">
                    <ul class="nav">
                        <li class="nav-item">
                            <a id="logout" class="nav-link active white text-2vw" href="#">Logout</a>
                        </li>
                        <li class="nav-item">
                            <a id="sign_in" class="nav-link active white text-2vw" href="#">Sign in</a>
                        </li>
                    </ul>
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
    static frames(){
        return `
            <div  class="col-md-7 col-12 bg-light-gray p-3 float-md-right user-info-section">
                <!-- 
                //=============================================
                // user_info
                //=============================================
                -->
                <div id="user_info_frame">
            
                </div>
            </div>
            <div class="col-md-5 col-12 bg-light-gray p-3 float-md-left product-info-section">
                <!-- 
                //=============================================
                // product_info
                //=============================================
                -->
                <div id="product_info_frame">
            
                </div>
            </div>
            <div class="col-md-7 col-12 bg-light-gray p-3 float-md-right">
                <!-- 
                //=============================================
                // item_info
                //=============================================
                -->
                <div id="item_info_frame">
            
                </div>
            </div>
        `
    }
    static user_info(){
        return `
            <div class="row mx-1 px-2 justify-content-center bg-heavy-gray rounded">
                <div class="col-xl col-sm-5 col-10 m-3 p-3 bg-light-gray rounded" value="${user_id}">${Leandro}</div>
                <div class="col-xl col-sm-5 col-10 m-3 p-3 bg-light-gray rounded">${18} yrs old</div>
                <div class="col-xl col-sm-5 col-10 m-3 p-3 bg-light-gray rounded">${123} days</div>
                <div class="col-xl col-sm-5 col-10 m-3 p-3 bg-light-gray rounded">${412414182094} yen</div>
            </div>
        `
    }
    //slider問題
    static product_info(){
        return `
            <div class="row  mx-2 justify-content-center bg-heavy-gray rounded ">
                <div class="col-11 my-3 bg-light-gray rounded">
                    <div class="text-center p-2 white">${1,000} burgers</div>
                    <div class="text-center p-2 white">${25} yen per day </div>
                </div>
                <div class="col-11 my-2  d-flex justify-content-center">
                    <div id="slide_main" class="d-flex justify-content-center">
                        <img src="https://cdn.pixabay.com/photo/2012/04/14/15/37/cheeseburger-34315_1280.png" alt="" width="70%">
                    </div>
                    <div id="slide_extra" class="d-flex justify-content-center">
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
                        <button id="slide_left_btn" class="btn btn-light"><</button>
                        <button id="slide_right_btn" class="btn btn-light">></button>
                    </div>
                </div>
            </div>
        `
    }
    static item_index(){
        return `
            <div class="row mx-1 px-2 justify-content-center bg-heavy-gray rounded">

                <section id="item_${1}"  value="${1}" class="mt-2 p-2 rounded ">
                    <div class="m-2 p-2 d-flex shadow bg-light-gray rounded">
                        <div class="col-3">
                            <img src="https://cdn.pixabay.com/photo/2012/04/14/15/37/cheeseburger-34315_1280.png" alt="" width="100%" height="" class="rounded">
                        </div>
                        <div class="p-2 col-6 ">
                            <p>${bark}</p>
                            <p>owning : ${10}</p>
                            <p>${90319} yen</p>
                        </div>
                        <div class="mt-auto mb-auto col-3">
                            <button id="item_show_btn" class="btn btn-primary w-100">show</button>
                        </div>
                    </div>
                </section>
                <section id="item_${1}"  value="${1}" class="mt-2 p-2 rounded ">
                    <div class="m-2 p-2 d-flex shadow bg-light-gray rounded">
                        <div class="col-3">
                            <img src="https://cdn.pixabay.com/photo/2012/04/14/15/37/cheeseburger-34315_1280.png" alt="" width="100%" height="" class="rounded">
                        </div>
                        <div class="p-2 col-6 ">
                            <p>${bark}</p>
                            <p>owning : ${10}</p>
                            <p>${90319} yen</p>
                        </div>
                        <div class="mt-auto mb-auto col-3">
                            <button id="item_show_btn" class="btn btn-primary w-100">show</button>
                        </div>
                    </div>
                </section>
                <section id="item_${1}"  value="${1}" class="mt-2 p-2 rounded ">
                    <div class="m-2 p-2 d-flex shadow bg-light-gray rounded">
                        <div class="col-3">
                            <img src="https://cdn.pixabay.com/photo/2012/04/14/15/37/cheeseburger-34315_1280.png" alt="" width="100%" height="" class="rounded">
                        </div>
                        <div class="p-2 col-6 ">
                            <p>${bark}</p>
                            <p>owning : ${10}</p>
                            <p>${90319} yen</p>
                        </div>
                        <div class="mt-auto mb-auto col-3">
                            <button id="item_show_btn" class="btn btn-primary w-100">show</button>
                        </div>
                    </div>
                </section>
                <section id="item_${1}"  value="${1}" class="mt-2 p-2 rounded ">
                    <div class="m-2 p-2 d-flex shadow bg-light-gray rounded">
                        <div class="col-3">
                            <img src="https://cdn.pixabay.com/photo/2012/04/14/15/37/cheeseburger-34315_1280.png" alt="" width="100%" height="" class="rounded">
                        </div>
                        <div class="p-2 col-6 ">
                            <p>${bark}</p>
                            <p>owning : ${10}</p>
                            <p>${90319} yen</p>
                        </div>
                        <div class="mt-auto mb-auto col-3">
                            <button id="item_show_btn" class="btn btn-primary w-100">show</button>
                        </div>
                    </div>
                </section>
                <section id="item_${1}"  value="${1}" class="mt-2 p-2 rounded ">
                    <div class="m-2 p-2 d-flex shadow bg-light-gray rounded">
                        <div class="col-3">
                            <img src="https://cdn.pixabay.com/photo/2012/04/14/15/37/cheeseburger-34315_1280.png" alt="" width="100%" height="" class="rounded">
                        </div>
                        <div class="p-2 col-6 ">
                            <p>${bark}</p>
                            <p>owning : ${10}</p>
                            <p>${90319} yen</p>
                        </div>
                        <div class="mt-auto mb-auto col-3">
                            <button id="item_show_btn" class="btn btn-primary w-100">show</button>
                        </div>
                    </div>
                </section>

            </div>
        `
    }

    static item_show(){
        
    }

}
