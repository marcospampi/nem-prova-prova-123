import { db } from "../database";
import { escape } from 'mysql2/promise'
import { Entry } from "./dictionary.type";

class Controller {

    /**
     * @description Adatta value di entry a seconda del tipo
     */
    private _adapt( entry: Entry ): Entry {
        return {
            ...entry, 
            value: entry.type == 'json' ?  JSON.parse(entry.value as any) : entry.value
        };
    }

    constructor( ) {}

    getMany( ) {
        return db.array<Entry>(`SELECT * FROM dictionary`).then(
            result => result.map( this._adapt.bind( this ) )
        );
    }

    get( key: string ): Promise<Entry> {
        return db.get<Entry>(`
            SELECT * FROM dictionary
            WHERE \`key\` = ${ escape(key) }
        `).then( this._adapt.bind( this ) );
    }

    put( key: string, _value: object|string ) {
        const type: 'json'|'text' = ( typeof(_value) == 'object') ? 'json' : 'text';
        const value = type == 'json' ? JSON.stringify(_value) : _value;

        return db.query(`
                REPLACE INTO dictionary SET ?
            `, {key, type, value }
        )
    }

    async delete( key: string ): Promise<void> {
        await db.query(`DELETE FROM dictionary WHERE \`key\` = ${escape(key)} `);
    }
}

export default new Controller();