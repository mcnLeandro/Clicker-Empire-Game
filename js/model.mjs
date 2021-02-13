import { DB } from './db.mjs'
import { View } from './view.mjs'
//=================================================
//Model classes
//=================================================
export class User extends DB {
    constructor(name, age, totalMoney, earningPerDay){
        super(null)

        this.name = name
        this.age  = age
        this.totalMoney    = totalMoney
        this.earningPerDay = earningPerDay

        super.hasmany(Time)
        super.hasmany(Product)
        super.hasmany(BoughtItem)
    }

    static currentUser(){
        if(!document.querySelector("#userInfoFrame div"))return false
        let user_id = parseInt(document.querySelector("#userInfoFrame div").getAttribute("userId"))
        return User.find(user_id)
    }
}
export class Time extends DB {
    constructor(user_id, day){
        super(null)

        this.user_id  = user_id

        this.day = day

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
    constructor(user_id, item_id, name, amount, earning, makerAmount){
        super(null)

        this.user_id = user_id
        this.item_id = item_id

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
    constructor(id ,name, url){
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

    static BoughtItemAddtionProcess(item_id){
        let user_id = User.currentUser().id

        if(BoughtItem.where("user_id",user_id, "item_id",item_id).length == 0){

            let newBoughtItem = new BoughtItem(null, user_id, item_id, 0)
            BoughtItem.add(newBoughtItem);

        }
        else{
            BoughtItem.where("user_id",user_id, "item_id",item_id)[0].amount += 1;
        }

    }
    static productTypeEffection(item_id, productEarning){

        ModelHelper.BoughtItemAddtionProcess(item_id);

        let itemName = Item.find(item_id).name
        let user_id = User.currentUser().id
        let newProduct = new Product(null, user_id, item_id, itemName, 0 ,productEarning, 0);
        Product.add(newProduct);

    }
    static abilityTypeEffection(item_id, additonalPrice){

        ModelHelper.BoughtItemAddtionProcess(item_id);

        let user_id = User.currentUser().id
        let product = Product.where("user_id",user_id,"item_id",item_id)[0];
        product.earningPerDay += additonalPrice;

    }
    static manpowerTypeEffection(item_id){

        ModelHelper.BoughtItemAddtionProcess(item_id);

        let user_id = User.currentUser().id
        let product = Product.where("user_id",user_id,"item_id",item_id)[0];
        product.makerAmount += 1;

    }
    //3000 *= 10 roop問題あり
    static investimentTypeEffection(item_id, returnPercentage, itemPriceChange){

        ModelHelper.BoughtItemAddtionProcess(item_id);

        let user = User.currentUser()

        let boughtItem = BoughtItem.where("user_id",user.id,"item_id",item_id)[0];
        let itemPrice = boughtItem.item().price;
        let itemAmount = boughtItem.amount;

        let additionalReturn = Math.round(itemPrice * (itemAmount) * (returnPercentage/100)) - Math.round(itemPrice * (itemAmount-1) * (returnPercentage/100));

        user.earningPerDay += additionalReturn;

        
    }
    static realEstateTypeEffection(item_id, additionalReturn){

        ModelHelper.BoughtItemAddtionProcess(item_id);

        let user = User.currentUser()

        user.earningPerDay += additionalReturn;

    }
}