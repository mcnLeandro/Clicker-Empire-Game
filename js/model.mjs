import { DB } from './db.mjs'
import { View } from './view.mjs'
import { 
    BoughtItemsController,
    ProductsController,
} from './controller.mjs'

//=================================================
//Model classes
//=================================================
export class User extends DB {
    constructor(name, age, totalMoney, earningPerDay){
        super(null)

        this.name = name
        this.age  = age
        this.earningPerDay = earningPerDay
        this.totalMoney    = totalMoney

        super.belongsTo(Time)
        super.hasmany(Product)
        super.hasmany(BoughtItem)
    }
    static currentUser(){
        if(!document.getElementById("current-user-id").getAttribute("current-user-id"))return false
        let user_id = parseInt(document.getElementById("current-user-id").getAttribute("current-user-id"))
        return User.find(user_id)
    }
}
export class Time extends DB {
    constructor(user_id, day,dayLongMS){
        super(null)

        this.user_id  = user_id

        this.day = day
        this.dayLongMS = dayLongMS

        super.belongsTo(User)
    }
}
export class BoughtItem extends DB {
    constructor(user_id, item_id, amount){
        super(null)

        this.user_id = user_id
        this.item_id = item_id

        this.amount  = amount

        super.belongsTo(User)
        super.belongsTo(Item)
    }
}
export class Product extends DB {
    constructor(user_id, item_id,img_id, name, amount, earning, makerAmount){
        super(null)

        this.user_id = user_id
        this.item_id = item_id
        this.img_id  = img_id

        this.name        = name
        this.amount      = amount
        this.earning     = earning
        this.makerAmount = makerAmount

        super.belongsTo(User)
        super.belongsTo(Item)
    }
}
export class Item extends DB {
    constructor(type_id, img_id, name, introduction, stock, price){
        super(null)

        this.type_id  = type_id
        this.img_id = img_id

        this.name = name
        this.introduction = introduction
        this.stock = stock
        this.price = price

        super.belongsTo(Type)
        super.belongsTo(Img)
        super.hasmany(BoughtItem)
        super.hasmany(Product)
    }
}
export class Type extends DB {
    constructor(name, effection){
        super(null)

        this.name = name
        this.effection = () => effection

        super.hasmany(Item)
    }
}
export class Img extends DB {
    constructor(name, url){
        super(null)
        this.name = name
        this.url  = url
    }
}
//==============================================
//modelのヘルプ関数などを管理する。
//基本的にはtypeのeffection関数を管理することになる。
//ちょっとダサいかもしれないけど今回はこれで行く
//==============================================

export class ModelHelper{

    static productTypeEffection(item_id, productEarning){

        BoughtItemsController.create(item_id);
        ProductsController.create(item_id,productEarning)
    
    }
    static abilityTypeEffection(item_id, additonalPrice){

        BoughtItemsController.create(item_id);

        let user_id = User.currentUser().id
        let product = Product.where("user_id",user_id,"item_id",item_id)[0];
        product.earningPerDay += additonalPrice;

    }
    static manpowerTypeEffection(item_id){

        BoughtItemsController.create(item_id);

        let user_id = User.currentUser().id
        let product = Product.where("user_id",user_id,"item_id",item_id)[0];
        product.makerAmount += 1;

    }
    //3000 *= 10 roop問題あり
    static investimentTypeEffection(item_id, returnPercentage, itemPriceChange){

        BoughtItemsController.create(item_id);

        let user = User.currentUser()

        let boughtItem = BoughtItem.where("user_id",user.id,"item_id",item_id)[0];
        let itemPrice = boughtItem.item().price;
        let itemAmount = boughtItem.amount;

        let additionalReturn = Math.round(itemPrice * (itemAmount) * (returnPercentage/100)) - Math.round(itemPrice * (itemAmount-1) * (returnPercentage/100));

        user.earningPerDay += additionalReturn;

        
    }
    static realEstateTypeEffection(item_id, additionalReturn){

        BoughtItemsController.create(item_id);

        let user = User.currentUser()

        user.earningPerDay += additionalReturn;

    }
}