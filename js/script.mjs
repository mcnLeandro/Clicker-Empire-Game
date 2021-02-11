

//=================================================
//DBクラス (DB Class)
//=================================================
class DB {
    static table = {};
    static idCounter = 1;

    constructor(id) {
        this.id = id;
    }

    static initializeTable(key) {
        this.table[key] = {};
    }
    static add(obj) {
        let i = this.idCounter++;
        let className = this.name;

        if (!this.table[className]) this.initializeTable(className);

        obj.id = i;
        this.table[className][i] = obj;
    }
    static find(id) {
        let className = this.name;
        return this.table[className][id]
    }
    static where(key1,value1, key2, value2){
        let className = this.name
        let models = this.table[className]

        let arr = []
        Object.keys(models).forEach(id =>{
            let model = models[id]
            if(model[key1] == value1 && model[key2] == value2) arr.push(model);
        })

        return arr;
    }
    static all() {
        let className = this.name;
        return this.table[className]
    }

    
    toKeyFormat(string) {
        let newString = string[0];
        let uppers = string.substring(1, string.length - 1).match(/[A-Z]/g)
        string = string.substring(1, string.length)
    
        if(uppers == null)return (newString + string).toLowerCase();
        uppers.forEach(value => {
            let upperIndex = string.indexOf(value)
            newString += string.substring(0, upperIndex)
            newString += "_" + string[upperIndex]
            string = string.substring(upperIndex+1,string.length)
        });
    
        return (newString + string).toLowerCase();
    }
    belongsTo(model){
        let modelName = this.toKeyFormat(model.name)
        this[modelName] = () => model.find(this[`${modelName}_id`]);
    }
    hasmany(model){
        let modelName = this.toKeyFormat(model.name)
        this[`${modelName}s`] = () => {

            let newObj = {}

            if(!DB.table[model.name]) DB.initializeTable(model.name)

            Object.keys(DB.table[model.name]).forEach(record=> {
                let modelObjs = DB.table[model.name]
                let thisClassName = this.constructor.name.toLocaleLowerCase()

                if(modelObjs[record][`${thisClassName}_id`] == this.id){
                    newObj[record] = modelObjs[record]
                }

            })

            return newObj;
        };
    }

    //=========================================================
    // DBの表示関数 (functions to show DB)
    //=========================================================

    static getStringOf(data){
        if (data == null ) data = "null"

        if (typeof (data) == "string")   data = data
        if (typeof (data) == "number")   data = String(data);
        if (typeof (data) == "function") data = "f()"
        if (typeof (data) == "object")   data = "{Object}"

        return data;
    }
    static getMaxColumnLengthArr(obj) {
        let arr = []

        Object.keys(obj["1"]).forEach(key => {

            let len = String(key).length

            Object.keys(obj).forEach(id => {

                let data = obj[id][key];
                let dataLen = DB.getStringOf(data).length
                len = dataLen > len ? dataLen : len;
            })

            arr.push(len + 2)

        })

        return arr
    }
    static addCharNTime(n, char) {
        let string = "";
        for (let i = 0; i < n; i++) string += char;
        return string;
    }
    static getColumnString(data, len) {
        data = this.getStringOf(data)

        let string = " " + data + " "

        string += this.addCharNTime(len - string.length, " ")

        return string;
    }
    static getRecordString(obj, lenArr) {
        let i = 0;
        let string = "|";

        Object.keys(obj).forEach(col => {

            let len = lenArr[i++]
            let data = DB.getColumnString(obj[col], len);

            string += data + DB.addCharNTime(len - data.length," ") +"|"

        })
        string += "\n"

        string += "|"
        lenArr.forEach(len => string += DB.addCharNTime(len,"-") + "|" ) 
        string += "\n"

        return string + ""


    }
    static getColumnRecordString(model,lenArr){
        let string = "";
        let line = "|";

        lenArr.forEach(len => line += DB.addCharNTime(len,"=") + "|" ) 
        line += "\n"


        string += line

        let i = 0;
        string += "|"
        Object.keys(model[1]).forEach(column => {
            let len = lenArr[i++]
            string += " " + column + DB.addCharNTime(len - (column.length+1)," ") + "|"
        })

        string += "\n"

        string += line

        return string;
    }
    static getModelString(model) {
        let lenArr = this.getMaxColumnLengthArr(this.table[model])
        let totalLen = lenArr.reduce((total, x) => total + x) + lenArr.length + 1;

        let table = ""

        //モデル
        table += this.addCharNTime(totalLen, "_") + "\n"
        table += "|" + this.addCharNTime(totalLen - 2, " ") + "|" + "\n"
        table += "| " + model + this.addCharNTime(totalLen - (model.length + 3), " ") + "|" + "\n"

        //カラム一覧
        table += this.getColumnRecordString(this.table[model],lenArr)

        //レコード
        Object.keys(this.table[model]).forEach(id => {
            let record = DB.table[model][id]
            table += this.getRecordString(record,lenArr)
        })


        table += "|" + this.addCharNTime(totalLen - 2, "_") + "|" + "\n"


        return table;

    }
    static showDB() {
        let string = ""
        Object.keys(this.table).forEach(model => {
            let table =  DB.getModelString(model)

            string += "\n"
            string += table
            string += "\n"
            string += "\n"
        })
        return string;
    }
}

//=================================================
//Model classes
//=================================================

class User extends DB {
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
class Time extends DB {
    constructor(id, user_id, day){
        super(id)

        this.user_id  = user_id

        this.day = day

        super.belongsTo(User)
    }
}
class BoughtItem extends DB {
    constructor(id, user_id, item_id, amount){
        super(id)

        this.user_id = user_id
        this.item_id = item_id

        this.amount  = amount

        super.belongsTo(User)
        super.belongsTo(Item)
    }
}
class Product extends DB {
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
class Item extends DB {
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
class Type extends DB {
    constructor(id, name, effection){
        super(id)

        this.name = name
        this.effection = () => effection

        super.hasmany(Item)
    }
}
class Img extends DB {
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

class ModelHelper{
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

//==============================================
//DBの初期化 (initilize DB )
//==============================================

[
    new Img(null,"Hamburger","https://cdn.pixabay.com/photo/2012/04/14/15/37/cheeseburger-34315_1280.png")
].forEach(img => Img.add(img));


[
    new Item(null, 1 , 1 , "Hamburger"               , "Release Hamburger"                                , 1   , 30000         ),
    new Item(null, 1 , 1 , "Lemonade"                , "Release Lemonade"                                 , 1   , 60000         ),
    new Item(null, 1 , 1 , "Ice Cream"               , "Release Ice Cream"                                , 1   , 90000         ),
    new Item(null, 2 , 1 , "Flip machine"            , "Increase earning from making Hamburger by 25 yen" , 500 , 15000         ),
    new Item(null, 2 , 1 , "Lemonade Stand"          , "Increase earning from making Lemonade by 50 yen"  , 1000, 30000         ),
    new Item(null, 2 , 1 , "Ice Cream Truck"         , "Increase earning from making Ice Cream by 150 yen", 500 , 100000        ),
    new Item(null, 3 , 1 , "Hamburger Coworker"      , "Employ worker for making Hamburger"               , 10  , 3000          ),
    new Item(null, 3 , 1 , "Lemonade Coworker"       , "Employ worker for making Lemonade"                , 10  , 3000          ),
    new Item(null, 3 , 1 , "Ice Cream Coworker"      , "Employ worker for making Ice Cream"               , 10  , 3000          ),
    new Item(null, 4 , 1 , "ETF Stock"               , "Get 0.1% of total price of  this item you bought" , null, 300000        ),
    new Item(null, 4 , 1 , "ETF Bonds"               , "Get 0.07% of total price of  this item you bought", null, 300000        ),
    new Item(null, 5 , 1 , "House"                   , "Get 32000 yen per day"                            , 100 , 20000000      ),
    new Item(null, 5 , 1 , "TownHouse"               , "Get 64000 yen per day"                            , 100 , 40000000      ),
    new Item(null, 5 , 1 , "Mansion"                 , "Get 500000 yen per day"                           , 20  , 250000000     ),
    new Item(null, 5 , 1 , "Industrial Space"        , "Get 2200000 yen per day"                          , 10  , 1000000000    ),
    new Item(null, 5 , 1 , "Hotel Skyscraper"        , "Get 25000000 yen per day"                         , 5   , 10000000000   ),
    new Item(null, 5 , 1 , "Bullet-Speed Sky Railway", "Get 30000000000 yen per day"                      , 1   , 10000000000000)
].forEach(item => Item.add(item));


[
    new Type(null, "Product"     , ModelHelper.productTypeEffection    ),
    new Type(null, "Ability"     , ModelHelper.abilityTypeEffection    ),
    new Type(null, "Manpower"    , ModelHelper.manpowerTypeEffection   ),
    new Type(null, "Investiment" , ModelHelper.investimentTypeEffection),
    new Type(null, "Real estate" , ModelHelper.realEstateTypeEffection )
].forEach(type => Type.add(type))

console.log(DB.showDB())