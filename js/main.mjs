import { View } from './view.mjs'
import { DB } from './db.mjs'
import { User,Time,UsersItem,UsersProduct,Product,Item,Type,Img } from './model.mjs'
import { ModelHelper } from './model.mjs'
import { Controller } from './controller.mjs'


//==============================================
//DBの初期化 (initilize DB )
//==============================================


function initialize(){
    [
        new Img("Hamburger" ,"https://cdn.pixabay.com/photo/2012/04/14/15/37/cheeseburger-34315_1280.png"),
        new Img("Lemonade"  ,"https://cdn.pixabay.com/photo/2012/04/15/20/36/juice-35236_960_720.png"),
        new Img("Ice Creame","https://cdn.pixabay.com/photo/2020/01/30/12/37/ice-cream-4805333_960_720.png"),

        new Img( "Flip machine", "https://cdn.pixabay.com/photo/2019/06/30/20/09/grill-4308709_960_720.png" ),
        new Img( "Lemonade Stand", "https://cdn.pixabay.com/photo/2019/06/20/16/15/lemonade-stand-4287495_960_720.png" ),
        new Img( "Ice Cream Truck", "https://1.bp.blogspot.com/-xcVRGLdi_vM/WKFi9LKxuGI/AAAAAAABBqo/e-1SdPAhoLgU2KEgN9alnve9X7Qb1I_sACLcB/s800/car_reitousya.png" ),

        new Img("chef1", "https://previews.123rf.com/images/barks/barks1908/barks190800079/129348039-young-male-worker-avatar-flat-illustration-upper-body-chef-cook.jpg"),
        new Img("chef2", "https://previews.123rf.com/images/barks/barks1908/barks190800089/129348785-young-male-worker-avatar-flat-illustration-upper-body-chef-cook.jpg"),
        new Img("chef3", "https://previews.123rf.com/images/barks/barks2101/barks210100096/162354674-circular-worker-avatar-icon-illustration-upper-body-chef-cook.jpg"),

        new Img("chart", "https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png"),
        
        new Img( "House","https://cdn.pixabay.com/photo/2016/03/31/18/42/home-1294564_960_720.png" ),
        new Img( "Town House", "https://cdn.pixabay.com/photo/2019/06/15/22/30/modern-house-4276598_960_720.png" ),
        new Img( "Mansion" , "https://cdn.pixabay.com/photo/2017/10/30/20/52/condominium-2903520_960_720.png" ),
        new Img( "Industrial Space", "https://cdn.pixabay.com/photo/2012/05/07/17/35/factory-48781_960_720.png" ),
        new Img( "HotelSkyscraper" , "https://cdn.pixabay.com/photo/2012/05/07/18/03/skyscrapers-48853_960_720.png" ),
        new Img( "Bullet-Speed Sky Railway", "https://cdn.pixabay.com/photo/2013/07/13/10/21/train-157027_960_720.png" ),
    ].forEach(img => Img.add(img));

    [
        new Type( "Product"     , ModelHelper.productTypeIntroductionTemplate    ,ModelHelper.productTypeEffectionTemplate    ),
        new Type( "Ability"     , ModelHelper.abilityTypeIntroductionTemplate    ,ModelHelper.abilityTypeEffectionTemplate    ),
        new Type( "Manpower"    , ModelHelper.manpowerTypeIntroductionTemplate   ,ModelHelper.manpowerTypeEffectionTemplate   ),
        new Type( "Investiment" , ModelHelper.investimentTypeIntroductionTemplate,ModelHelper.investimentTypeEffectionTemplate),
        new Type( "Real estate" , ModelHelper.realEstateTypeIntroductionTemplate ,ModelHelper.realEstateTypeEffectionTemplate )
    ].forEach(type => Type.add(type));

    [
        new Product(1,"Hamburger" , 25 ),
        new Product(2,"Lemonade"  , 50 ),
        new Product(3,"Ice Creame", 150),
    ].forEach(product => Product.add(product));

    [
        new Item( 1 , 1 , "Hamburger"               , 1   , 0             , true  ,[1]          ),
        new Item( 1 , 2 , "Lemonade"                , 1   , 60000         , true  ,[2]          ),
        new Item( 1 , 3 , "Ice Cream"               , 1   , 90000         , true  ,[3]          ),

        new Item( 2 , 4 , "Flip machine"            , 500 , 15000         , false ,[1,25]       ),
        new Item( 2 , 5 , "Lemonade Stand"          , 1000, 30000         , false ,[2,50]       ),
        new Item( 2 , 6 , "Ice Cream Truck"         , 500 , 100000        , false ,[3,150]      ),

        new Item( 3 , 7 , "Hamburger Coworker"      , 10  , 15000         , false ,[1]          ),
        new Item( 3 , 8 , "Lemonade Coworker"       , 10  , 20000         , false ,[2]          ),
        new Item( 3 , 9 , "Ice Cream Coworker"      , 10  , 30000         , false ,[3]          ),

        new Item( 4 , 10, "ETF Stock"               , null, 300000        , true  ,[0.1,10]     ),
        new Item( 4 , 10, "ETF Bonds"               , null, 300000        , true  ,[0.07,0]     ),

        new Item( 5 , 11, "House"                   , 100 , 20000000      , true  ,[32000]      ),
        new Item( 5 , 12, "Town House"               , 100 , 40000000      , true  ,[64000]      ),
        new Item( 5 , 13, "Mansion"                 , 20  , 250000000     , true  ,[500000]     ),
        new Item( 5 , 14, "Industrial Space"        , 10  , 1000000000    , true  ,[2200000]    ),
        new Item( 5 , 15, "Hotel Skyscraper"        , 5   , 10000000000   , true  ,[25000000]   ),
        new Item( 5 , 16, "Bullet-Speed Sky Railway", 1   , 10000000000000, true  ,[30000000000])
    ].forEach(item => Item.add(item));
}


// DB.initializeDB(initialize)
initialize()
Controller.top()

