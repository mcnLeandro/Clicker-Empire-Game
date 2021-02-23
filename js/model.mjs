import { DB } from './db.mjs'
import { View } from './view.mjs'
import { Controller, Render} from './controller.mjs'

//=================================================
//Model classes
//=================================================
export class User extends DB {

    constructor(name, age, earningPerDay, totalMoney){
        super(null)

        this.name = name
        this.age  = age
        this.earningPerDay = earningPerDay
        this.totalMoney    = totalMoney

        super.belongsTo(Time)
        super.hasmany(UsersProduct)
        super.hasmany(UsersItem)
    }

    static currentUser(){
        if(!document.getElementById("current-user-id").getAttribute("current-user-id"))return false
        let user_id = parseInt(document.getElementById("current-user-id").getAttribute("current-user-id"))
        return User.find(user_id)
    }

}
export class Time extends DB {

    constructor(user_id, day, month , year, dayLongMS){
        super(null)

        this.user_id  = user_id

        this.day = day
        this.month = month
        this.year = year
        this.dayLongMS = dayLongMS

        super.belongsTo(User)
    }
    autoTimeupdator(){

        this.day += 1

        if(this.day > 30){
            this.month += 1
            this.day = 0
        }
        if(this.month > 12){
            this.year += 1
            this.month = 0
            this.user().age += 1
        }

    }
    getDate(){
        return `${this.day} / ${this.month} / ${this.year}`
    }

}
export class Item extends DB {

    constructor(type_id, img_id, name, stock, price, isUnlocked, effectionParamsArr){
        super(null)

        this.type_id = type_id
        this.img_id  = img_id

        this.name  = name
        this.stock = stock
        this.price = price
        this.isUnlocked   = isUnlocked
        this.introduction = Type.find(type_id).introductionTemplate(...effectionParamsArr)
        this.effection    = Type.find(type_id).effectionTemplate(...effectionParamsArr)
        
        super.belongsTo(Type)
        super.belongsTo(Img)
        super.hasmany(UsersItem)
    }

}
export class UsersItem extends DB {

    constructor(user_id, item_id, owning){

        super(null)

        this.user_id = user_id
        this.item_id = item_id

        this.owning     = owning == null ? 0 : owning ;
        this.stock      = Item.find(item_id).stock == null ? Infinity : Item.find(item_id).stock ;
        this.price      = Item.find(item_id).price
        this.isUnlocked = Item.find(item_id).isUnlocked

        super.belongsTo(User)
        super.belongsTo(Item)
    }

}
export class Product extends DB {

    constructor(img_id, name, earning){
        super(null)

        this.img_id  = img_id

        this.name    = name
        this.earning = earning

        super.hasmany(UsersProduct)
        super.belongsTo(Img)
    }

}
export class UsersProduct extends DB{

    constructor(user_id, product_id, amount, makerAmount){
        super(null)

        this.user_id    = user_id
        this.product_id = product_id

        this.amount      = amount == null ? 0 : amount ; 
        this.earning     = Product.find(product_id).earning
        this.makerAmount = makerAmount == null ? 0 : makerAmount ;


        super.belongsTo(User)
        super.belongsTo(Product)
    }
    makersEarning(){
        let makersEarning = this.earning * this.makerAmount
        return isNaN(makersEarning)? 0 : makersEarning
    }
}
export class Type extends DB {

    constructor(name, introductionTemplate, effectionTemplate){
        super(null)

        this.name = name
        this.introductionTemplate = introductionTemplate
        this.effectionTemplate = effectionTemplate
        
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
//基本的にはtypeのeffection関数とintroduction関数を管理することになる。
//用途がはっきりしないクラスになってしまうけど今回はこれで行く
//==============================================

export class ModelHelper{

    static productTypeEffectionTemplate(product_id){
        return function() {

            Controller.createNewUsersProduct(product_id)

            let usersItem = UsersItem.where("user_id",User.currentUser().id, "item_id",this.id)[0];

            Controller.lockUsersItem(usersItem.id)
            Controller.unlockSpecificUsersItems(product_id)

            View.productInfoWithSlider()

        }
    }
    static abilityTypeEffectionTemplate(product_id, additonalPrice){
        return function() {
    
            let usersProduct = UsersProduct.where("user_id",User.currentUser().id, "product_id",product_id)[0];

            let usersProductEarning = usersProduct.earning + additonalPrice;
            Controller.updateUsersProduct(usersProduct.id, "earning", usersProductEarning)

            View.productInfoWithSlider()

        }
    }
    static manpowerTypeEffectionTemplate(product_id){
        return function() {
    
            let usersProduct = UsersProduct.where("user_id",User.currentUser().id, "product_id",product_id)[0];

            let usersProductMakerAmount = usersProduct.makerAmount + 1;
            Controller.updateUsersProduct(usersProduct.id, "makerAmount", usersProductMakerAmount)
            
            View.productInfoWithSlider()

        }
    }
    static investimentTypeEffectionTemplate(returnPercentage, itemPriceChangePercentage){
        return function() {

            let usersItem = UsersItem.where("user_id",User.currentUser().id, "item_id",this.id)[0]; 
            let itemPriceChange = itemPriceChangePercentage != 0 ? itemPriceChangePercentage/100 : 0;
            let usersItemPrice = usersItem.price * (1 + itemPriceChange)

            Controller.updateUsersItem(usersItem.id,"price",usersItemPrice)

            let totalPurchaseAmount = ModelHelper.dynamicSummation(ModelHelper.multiplication ,this.price, 1+itemPriceChange,1, usersItem.owning )
            let newReturn = totalPurchaseAmount*(returnPercentage/100)
            let beforeReturn = usersItem.amount == 1 ? 0 :  (totalPurchaseAmount - usersItem.price)*(returnPercentage/100)
            let additionalReturn = Math.round(newReturn - beforeReturn)
            let usersEarningPerDay = User.currentUser().earningPerDay + additionalReturn

            Controller.updateUser(null,"earningPerDay", usersEarningPerDay)

        }
    }
    static realEstateTypeEffectionTemplate(additionalReturn){
        return function() {

            let value = User.currentUser().earningPerDay + additionalReturn;
            Controller.updateUser(null,"earningPerDay", value)

        }
    }


    static productTypeIntroductionTemplate(product_id){
        let productName = Product.find(product_id).name
        return function() {

            return `Release ${productName}.`
        }
    }
    static abilityTypeIntroductionTemplate(product_id, additonalPrice){
        let productName = Product.find(product_id).name
        return function() {

            return `Increase earning from making ${productName} by ${additonalPrice.toLocaleString()} yen.`

        }
    }
    static manpowerTypeIntroductionTemplate(product_id){
        let productName = Product.find(product_id).name
        return function() {

            return `Hire an employee to make ${productName}.`

        }
    }
    static investimentTypeIntroductionTemplate(returnPercentage, priceChangePercentage){
        return function() {

            return `Get ${returnPercentage}% of total price of this item you bought. The Item's price will increase by ${priceChangePercentage}% when you purchase the item. `

        }
    }
    static realEstateTypeIntroductionTemplate(additionalReturn){
        return function() {

            return `Get ${additionalReturn.toLocaleString()} yen per day.`

        }
    }

    static multiplication(num1,num2){
        return num1 * num2
    };

    static dynamicSummation(f, num1, num2, start, end){
        if(start > end) return 0;
        let num = f(num1,num2)
        return num1 + ModelHelper.dynamicSummation(f, num, num2, start+1, end);
    }
    
}