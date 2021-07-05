import express from 'express';
import Controller from "./controller";

export const myRoute = express.Router();

myRoute.get('/', (req,res ) => {
    Controller.getMany( req.query ).then(
        _res => res.send(_res)
    );
});

myRoute.get('/:key', async (req,res ) => {
    try {
        const result = await Controller.get(req.params.key);

        res.send(result)
    }
    catch( e) {
        console.error(e);
        res.status(400).send({error:"Key not found"})
    }
    
});

const put_and_patch = async (req: any,res: any ) => {

    try {
        
        await Controller.put(req.params.key, req.body );
        res.status(201).send();
    }
    catch( e ) {
        console.error(e);
        res.status(500).send({ommaronna:'vacca'});
    } 
    

}

myRoute.put('/:key', put_and_patch )
myRoute.patch('/:key', put_and_patch )
myRoute.delete('/:key', async (req,res ) => {
    
    try {
        await Controller.delete(req.params.key);
        res.status(200).send();
    }
    catch( e) {
        console.error(e);
        res.status(500).send({error:"ommaronna"})
    }
});