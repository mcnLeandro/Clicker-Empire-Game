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

    constructor(user_id, day, dayLongMS){
        super(null)

        this.user_id  = user_id

        this.day = day
        this.dayLongMS = dayLongMS

        super.belongsTo(User)
    }

    getYear(){

    }
    getMonth(){

    }
    getDate(){

    }

}
export class UsersItem extends DB {

    constructor(user_id, item_id, amount){
        super(null)

        this.user_id = user_id
        this.item_id = item_id

        this.amount  = amount

        super.belongsTo(User)
        super.belongsTo(Item)
    }

}
export class UsersProduct extends DB{

    constructor(user_id, product_id){
        super(null)

        this.user_id = user_id
        this.product_id = product_id

        let product = Product.find(product_id)
        this.img_id  = product.img_id

        this.name        = product.name
        this.amount      = product.amount
        this.earning     = product.earning
        this.makerAmount = product.makerAmount


        super.belongsTo(User)
        super.belongsTo(Product)
        super.belongsTo(Img)
    }

}
export class Product extends DB {

    constructor(img_id, name, amount, earning, makerAmount){
        super(null)

        this.img_id  = img_id

        this.name        = name
        this.amount      = amount
        this.earning     = earning
        this.makerAmount = makerAmount

        super.hasmany(UsersProduct)
        super.belongsTo(Img)
    }

}
export class Item extends DB {

    constructor(type_id, img_id, name, stock, price, effectionParamsArr){
        super(null)

        this.type_id  = type_id
        this.img_id = img_id

        this.name = name
        this.stock = stock
        this.price = price

        let type = Type.find(type_id)
        this.introduction = type.introductionTemplate(...effectionParamsArr)
        this.effection = type.effectionTemplate(...effectionParamsArr)
        
        super.belongsTo(Type)
        super.belongsTo(Img)
        super.hasmany(UsersItem)
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
//ちょっとダサいかもしれないけど今回はこれで行く
//==============================================

export class ModelHelper{

    static productTypeEffectionTemplate(product_id){
        return function() {

            User.currentUser().totalMoney -= this.price
            
            Controller.createNewUsersItem(this.id);
            Controller.createNewUsersProduct(product_id)

            View.productInfoWithSlider()


        }
    }
    static abilityTypeEffectionTemplate(product_id, additonalPrice){
        return function() {

            let user = User.currentUser()
            user.totalMoney -= this.price

            Controller.createNewUsersItem(this.id);
    
            let usersProduct = UsersProduct.where("user_id",user.id,"product_id",product_id)[0];
            usersProduct.earning += additonalPrice;

        }
    }
    static manpowerTypeEffectionTemplate(product_id){
        return function() {

            let user = User.currentUser()
            user.totalMoney -= this.price

            Controller.createNewUsersItem(this.id);
    
            let usersProduct = UsersProduct.where("user_id",user.id,"product_id",product_id)[0];
            usersProduct.makerAmount += 1;
            
            View.productInfoWithSlider()
        }
    }
    //3000 *= 10 roop問題あり
    static investimentTypeEffectionTemplate(returnPercentage, itemPriceChange){
        return function() {

            let user = User.currentUser()
            user.totalMoney -= this.price

            Controller.createNewUsersItem(this.id);
    
            let usersItem = UsersItem.where("user_id",user.id,"item_id",this.id)[0];
            let itemPrice = usersItem.item().price;
            let itemAmount = usersItem.amount;
    
            let additionalReturn = Math.round(itemPrice * (itemAmount) * (returnPercentage/100)) - Math.round(itemPrice * (itemAmount-1) * (returnPercentage/100));
    
            user.earningPerDay += additionalReturn;

        }
    }
    static realEstateTypeEffectionTemplate(additionalReturn){
        return function() {

            let user = User.currentUser()
            user.totalMoney -= this.price

            Controller.createNewUsersItem(this.id);
    
            user.earningPerDay += additionalReturn;

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

}