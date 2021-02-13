//=================================================
//DBクラス (DB Class)
//=================================================
export class DB {
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
        return this.table[className][i]
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

