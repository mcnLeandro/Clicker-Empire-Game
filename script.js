

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
            console.log(string)
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
        if (typeof (data) == "string")   data = data
        if (typeof (data) == "number")   data = String(data);
        if (typeof (data) == "function") data = String(data())
        if (typeof (data) == "object")   data = String(Object.keys(data))

        return data;
    }
    //データがひとつもない場合はエラーになるので修正が必要
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
    //これも一つもデータがない状態だとエラーになる
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
    constructor(id,user_id, item_id, amount, price, makerAmount){
        super(id)

        this.user_id = user_id
        this.item_id = item_id
        this.amount  = amount
        this.price   = price
        this.makerAmount = makerAmount

        super.belongsTo(User)
        super.belongsTo(Item)
    }
}
class Item extends DB {
    constructor(id, type_id, name, introduction, imageUrl, stock, price){
        super(id)

        this.type_id = type_id
        this.name = name
        this.introduction = introduction
        this.imageUrl = imageUrl
        this.stock = stock
        this.price = price

        super.hasmany(BoughtItem)
        super.hasmany(Product)
    }
}
class Type extends DB {
    constructor(id, name, effection){
        super(id)

        this.name = name
        this.effection = effection

        super.hasmany(Item)
    }
}

//==============================================
//DBの初期化 (initilize DB )
//==============================================

