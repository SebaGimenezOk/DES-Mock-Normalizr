import fs from ('fs');
import { v4 as uuid } from "uuid";
import _ from "lodash";

class Cfilesystem {
    constructor(name){
        this.name = name;
    }
    async create(obj){
        try {
            const data = await fs.readFile(`./src/services/databases/storage/${this.name}.json`, {
                encoding: "utf-8",
            });
            const dataP = await JSON.parse(data);
            Object.assign(obj, {
                id: uuid()
            });
            dataP.push(obj)
            await fs.writeFile(`./src/services/databases/storage/${this.name}.json`, JSON.stringify(dataP, null, 2));
            return obj;
        } catch(err) {
            console.error(err);
            return {
                succes: false,
                messsage: err.messsage
            };
        }
    }
    async getAll(){
        try {
            const data = await fs.readFile(`./src/services/databases/storage/${this.name}.json`, {
                encoding: "utf-8",
            });
            return await (JSON.parse(data));
        } catch(err) {
            if (err.code === "ENOENT") return [];
            console.error(err);
            return {
                succes: false,
                messsage: err.messsage
            };
        }
    }
    async getById(id){
        try {
            const data = await this.getAll();
            let dataP = await JSON.parse(data);
            let result = dataP.find(i => i.id == id);
            if (_.isNil(result)) throw new Error("item not found");
            return result;
        } catch(err) {
            console.error(err);
            return {
                succes: false,
                messsage: err.messsage
            };
        }
    }
    async update(update, id){
        try {
            update.id = id;
            const data = await this.getAll();
            let dataP = await JSON.parse(data);
            let result = dataP.filter(i => i.id != id);
            if (_.isNil(result)) throw new Error("item not found");
            result.push(update);
            await fs.writeFile(`./src/services/databases/storage/${this.name}.json`, JSON.stringify(result, null, 2));
            return result;
        } catch(err) {
            console.error(err);
            return {
                succes: false,
                messsage: err.messsage
            };
        }
    }
    async supr(id){
        try {
            const data = this.getAll();
            let dataP = await JSON.parse(data);
            let result = dataP.filter(i => i.id != id);
            await fs.writeFile(`./src/services/databases/storage/${this.name}.json`, JSON.stringify(result, null, 2));
        } catch(err) {
            console.error(err);
            return {
                succes: false,
                messsage: err.messsage
            };
        }
    }
}

export default Cfilesystem;