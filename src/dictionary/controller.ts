import { db } from "../database";
import { escape } from 'mysql2/promise'
import { Entry } from "./dictionary.type";

class Controller {

    constructor( ) {}

    getMany( ) {
        return db.query<Entry[]>(`SELECT * FROM dictionary`).then(
            ([result]) => result.map( el => el.type == 'json' ? {...el, value: JSON.parse(el.value as any)}: el )
        );
    }

    get( key: string ): Promise<Entry> {
        return db.query<Entry[]>(`
            SELECT * FROM dictionary
            WHERE \`key\` = ${ escape(key) }
        `).then( ([[res]]) => ({
            ...res, 
            value: res.type == 'json' ?  JSON.parse(res.value as any) : res.value
        }));
    }

    put( key: string, _value: object|string ) {
        let type: 'json'|'text';

        if ( typeof(_value) == 'object' ) {
            type = 'json';
        }
        else {
            type = "text";
        };

        let value = type == 'json' ? JSON.stringify(_value) : _value;
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