import express from 'express';

import { myRoute } from "./dictionary/view"
export function main( ): void {
    
    const app = express();
    const port = 8080;
    const host = 'localhost';
    
    app.use( express.json(), express.text() );

    app.get('/', (req,res) => {
        res.send({buongiornissimo:'caffe'});
    });

    app.use( '/dict', myRoute );

    app.listen( port, host , () => console.log(`Listening at ${host}:${port}`));

}
