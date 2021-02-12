import { DB } from './db.mjs'

//=================================================
//Model classes
//=================================================
export class User extends DB {
    constructor(id, name, age, totalMoney, earningPerDay){
        super(id)

        this.name = name
        this.age  = age
        this.totalMoney    = totalMoney
        this.earningPerDay = earningPerDay

        super.hasmany(Time)
        super.hasmany(Product)
        super.hasmany(BoughtItem)
    }
}
export class Time extends DB {
    constructor(id, user_id, day){
        super(id)

        this.user_id  = user_id

        this.day = day

        super.belongsTo(User)
    }
}
export class BoughtItem extends DB {
    constructor(id, user_id, item_id, amount){
        super(id)

        this.user_id = user_id
        this.item_id = item_id

        this.amount  = amount

        super.belongsTo(User)
        super.belongsTo(Item)
    }
}
export class Product extends DB {
    constructor(id,user_id, item_id, name, amount, earning, makerAmount){
        super(id)

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
    constructor(id,type_id, img_id, name, introduction, stock, price){
        super(id)

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
    constructor(id, name, effection){
        super(id)

        this.name = name
        this.effection = () => effection

        super.hasmany(Item)
    }
}
export class Img extends DB {
    constructor(id ,name, url){
        super(id)
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
    static BoughtItemAddtionProcess(user_id,item_id){

        if(BoughtItem.where("user_id",user_id, "item_id",item_id).length == 0){
            let newBoughtItem = new BoughtItem(null, user_id, item_id, 0)
            BoughtItem.add(newBoughtItem);
        }
        else{
            BoughtItem.where("user_id",user_id, "item_id",item_id)[0].amount += 1;
        }

    }


    static productTypeEffection(user_id,item_id, productEarning){

        ModelHelper.BoughtItemAddtionProcess(user_id,item_id);

        let itemName = Item.find(item_id).name
        let newProduct = new Product(null, user_id, item_id, itemName, 0 ,productEarning, 0);
        Product.add(newProduct);

    }
    static abilityTypeEffection(user_id, item_id, additonalPrice){

        ModelHelper.BoughtItemAddtionProcess(user_id,item_id);

        let product = Product.where("user_id",user_id,"item_id",item_id)[0];
        product.earningPerDay += additonalPrice;

    }
    static manpowerTypeEffection(user_id,item_id){

        ModelHelper.BoughtItemAddtionProcess(user_id,item_id);

        let product = Product.where("user_id",user_id,"item_id",item_id)[0];
        product.makerAmount += 1;

    }
    //3000 *= 10 roop問題あり
    static investimentTypeEffection(user_id, item_id, returnPercentage, itemPriceChange){

        ModelHelper.BoughtItemAddtionProcess(user_id,item_id);

        let boughtItem = BoughtItem.where("user_id",user_id,"item_id",item_id)[0];
        let itemPrice = boughtItem.item().price;
        let itemAmount = boughtItem.amount;

        let additionalReturn = Math.round(itemPrice * (itemAmount) * (returnPercentage/100)) - Math.round(itemPrice * (itemAmount-1) * (returnPercentage/100));

        let user = User.find(user_id);
        user.earningPerDay += additionalReturn;

        
    }
    static realEstateTypeEffection(user_id, item_id, additionalReturn){

        ModelHelper.BoughtItemAddtionProcess(user_id,item_id);

        let user = User.find(user_id)

        user.earningPerDay += additionalReturn;

    }
}