import db from "../database";
import { escape } from 'mysql2/promise'
import { Entry } from "./dictionary.type";

class Controller {


    constructor( ) {}

    getMany( query: any = undefined ) {
        console.log( query )
        return db.find({
            selector: query ?? {}
        });
        //return db.allDocs({
        //    include_docs: true
        //}).then( data => ({...data, rows: data.rows.map(e => e.doc)}));
        //
        //return db.array<Entry>(`SELECT * FROM dictionary`).then(
        //    result => result.map( this._adapt.bind( this ) )
        //);
    }

    get( key: string ): Promise<Entry> {
        return db.get(key);
        //return db.get<Entry>(`
        //    SELECT * FROM dictionary
        //    WHERE \`key\` = ${ escape(key) }
        //`).then( this._adapt.bind( this ) );
    }

    put( _id: string, value: object|string ) {
        return db.put({
            _id, ...(typeof(value) == 'string' ? { value } : value )
        });
      
    }

    async delete( key: string ): Promise<void> {
        await db.get( key ).then( doc => db.remove(doc) )
        //await db.query(`DELETE FROM dictionary WHERE \`key\` = ${escape(key)} `);
    }
}

export default new Controller();