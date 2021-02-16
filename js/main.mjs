import { View } from './view.mjs'
import { DB } from './db.mjs'
import { User,Time,BoughtItem,Product,Item,Type,Img } from './model.mjs'
import { ModelHelper } from './model.mjs'
import { Controller } from './controller.mjs'


//==============================================
//DBの初期化 (initilize DB )
//==============================================

[
    new Img("Hamburger","https://cdn.pixabay.com/photo/2012/04/14/15/37/cheeseburger-34315_1280.png"),
    new Img("Lemonade","https://cdn.pixabay.com/photo/2012/04/15/20/36/juice-35236_960_720.png"),
    new Img("Ice Creame","https://cdn.pixabay.com/photo/2020/03/19/07/19/ice-cream-4946596_960_720.png"),
].forEach(img => Img.add(img));

[
    new Product(1,"Hamburger" , 0, 25 , 0),
    new Product(2,"Lemonade"  , 0, 50 , 0),
    new Product(3,"Ice Creame", 0, 150, 0),
].forEach(product => Product.add(product));

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






Controller.top()


///5.ログイン機能を作る
///6. productInfoの前にslideの作成をする必要があるのでめんどくさくてもtest用のHTML作成するなりして復習しながらslide完成させる。またProductが空の場合も考慮する。
///7. indexからのshowを表示できるようにする。addEventListenner
///8。商品が購入できるようにする。
///9. investimenntのprice変動問題を解決する
///10. UsersProductの挙動を確認する。
///11.もう一度このやることリストを作り直す。 
// 12. img探しをする