import { View } from './view.mjs'
import { DB } from './db.mjs'
import { User,Time,UsersItem,UsersProduct,Product,Item,Type,Img } from './model.mjs'
import { ModelHelper } from './model.mjs'
import { Controller } from './controller.mjs'


//==============================================
//DBの初期化 (initilize DB )
//==============================================

[
    new User("Debug",20,50000000000000000000000000000000,0)
].forEach(user => User.add(user));

[
    new Time(1,1,1000)
].forEach(time => Time.add(time));

[
    new Img("Hamburger" ,"https://cdn.pixabay.com/photo/2012/04/14/15/37/cheeseburger-34315_1280.png"),
    new Img("Lemonade"  ,"https://cdn.pixabay.com/photo/2012/04/15/20/36/juice-35236_960_720.png"),
    new Img("Ice Creame","https://cdn.pixabay.com/photo/2020/03/19/07/19/ice-cream-4946596_960_720.png"),
].forEach(img => Img.add(img));

[
    new Type( "Product"     , ModelHelper.productTypeIntroductionTemplate    ,ModelHelper.productTypeEffectionTemplate    ),
    new Type( "Ability"     , ModelHelper.abilityTypeIntroductionTemplate    ,ModelHelper.abilityTypeEffectionTemplate    ),
    new Type( "Manpower"    , ModelHelper.manpowerTypeIntroductionTemplate   ,ModelHelper.manpowerTypeEffectionTemplate   ),
    new Type( "Investiment" , ModelHelper.investimentTypeIntroductionTemplate,ModelHelper.investimentTypeEffectionTemplate),
    new Type( "Real estate" , ModelHelper.realEstateTypeIntroductionTemplate ,ModelHelper.realEstateTypeEffectionTemplate )
].forEach(type => Type.add(type));

[
    new Product(1,"Hamburger" , 0, 25 , 0),
    new Product(2,"Lemonade"  , 0, 50 , 0),
    new Product(3,"Ice Creame", 0, 150, 0),
].forEach(product => Product.add(product));

[
    new Item( 1 , 1 , "Hamburger"               , 1   , 0             ,[1]          ),
    new Item( 1 , 2 , "Lemonade"                , 1   , 30000         ,[2]          ),
    new Item( 1 , 3 , "Ice Cream"               , 1   , 60000         ,[3]          ),
    new Item( 2 , 1 , "Flip machine"            , 500 , 15000         ,[1,25]       ),
    new Item( 2 , 1 , "Lemonade Stand"          , 1000, 30000         ,[2,50]       ),
    new Item( 2 , 1 , "Ice Cream Truck"         , 500 , 100000        ,[3,150]      ),
    new Item( 3 , 1 , "Hamburger Coworker"      , 10  , 30000         ,[1]          ),
    new Item( 3 , 1 , "Lemonade Coworker"       , 10  , 30000         ,[2]          ),
    new Item( 3 , 1 , "Ice Cream Coworker"      , 10  , 30000         ,[3]          ),
    new Item( 4 , 1 , "ETF Stock"               , null, 300000        ,[0.1,10]     ),
    new Item( 4 , 1 , "ETF Bonds"               , null, 300000        ,[0.07,0]     ),
    new Item( 5 , 1 , "House"                   , 100 , 20000000      ,[32000]      ),
    new Item( 5 , 1 , "TownHouse"               , 100 , 40000000      ,[64000]      ),
    new Item( 5 , 1 , "Mansion"                 , 20  , 250000000     ,[500000]     ),
    new Item( 5 , 1 , "Industrial Space"        , 10  , 1000000000    ,[2200000]    ),
    new Item( 5 , 1 , "Hotel Skyscraper"        , 5   , 10000000000   ,[25000000]   ),
    new Item( 5 , 1 , "Bullet-Speed Sky Railway", 1   , 10000000000000,[30000000000])
].forEach(item => Item.add(item));






// Controller.top()
Controller.session(1)

///2。商品が購入できるようにする。
///3. investimenntのprice変動問題を解決する
///4. UsersProductの挙動を確認する。humburgerを買う
///5. もう一度このやることリストを作り直す。 
///6. ログイン機能を作る
///7.HTMLのオーバーフローについてはもう一度検討する必要がある。
///7. img探しをする