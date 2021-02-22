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
export class Item extends DB {

    constructor(type_id, img_id, name, stock, price, effectionParamsArr){
        super(null)

        this.type_id  = type_id
        this.img_id = img_id

        this.name = name
        this.stock = stock
        this.price = price
        this.introduction = Type.find(type_id).introductionTemplate(...effectionParamsArr)
        this.effection = Type.find(type_id).effectionTemplate(...effectionParamsArr)
        
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

        this.owning  = owning == null ? 0 : owning ;
        this.stock   = Item.find(item_id).stock == null ? Infinity : Item.find(item_id).stock ;
        this.price   = Item.find(item_id).price

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
        this.img_id     = Product.find(product_id).img_id

        this.amount      = amount == null ? 0 : amount ; 
        this.earning     = Product.find(product_id).earning
        this.makerAmount = makerAmount == null ? 0 : makerAmount ;


        super.belongsTo(User)
        super.belongsTo(Product)
        super.belongsTo(Img)
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
//関数内のDB内のデータのアップデートはcontrollerでするべきだけどこれは次回の課題にしたい。
//==============================================

export class ModelHelper{

    static productTypeEffectionTemplate(product_id){
        return function() {

            Controller.createNewUsersProduct(product_id)

            View.productInfoWithSlider()

        }
    }
    static abilityTypeEffectionTemplate(product_id, additonalPrice){
        return function() {
    
            let usersProduct = UsersProduct.where("user_id",User.currentUser().id, "product_id",product_id);

            if(usersProduct.length != 0){
                //update
                usersProduct[0].earning += additonalPrice;
            }
            else{
                View.alert(`You have to release ${Product.find(product_id).name} before purchase this item !!`)
                return true
            }

        }
    }
    static manpowerTypeEffectionTemplate(product_id){
        return function() {
    
            let usersProduct = UsersProduct.where("user_id",User.currentUser().id, "product_id",product_id);
            if(usersProduct.length != 0){
                //update
                usersProduct.makerAmount += 1;
                
                View.productInfoWithSlider()
            }
            else{
                View.alert(`You have to release ${Product.find(product_id).name} before purchase this item !!`)
                return true
            }
        }
    }
    static investimentTypeEffectionTemplate(returnPercentage, itemPriceChangePercentage){
        return function() {

            let usersItem = UsersItem.where("user_id",User.currentUser().id, "item_id",this.id)[0];            
            let itemPriceChange = itemPriceChangePercentage != 0 ? itemPriceChangePercentage/100 : 0;

            //update
            usersItem.price *= (1 + itemPriceChange)


            let totalPurchaseAmount = ModelHelper.dynamicSummation(ModelHelper.multiplication ,this.price, 1+itemPriceChange,1, usersItem.amount )

            let newReturn = totalPurchaseAmount*(returnPercentage/100)
            let beforeReturn = (totalPurchaseAmount - usersItem.price)*(returnPercentage/100)
            beforeReturn  = usersItem.amount == 1 ? 0 : beforeReturn

            let additionalReturn = Math.round(newReturn - beforeReturn)

            //update
            User.currentUser().earningPerDay += additionalReturn

        }
    }
    static realEstateTypeEffectionTemplate(additionalReturn){
        return function() {
            
            //update
            User.currentUser().earningPerDay += additionalReturn;

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