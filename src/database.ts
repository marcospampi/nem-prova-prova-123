import { readFileSync } from "fs";
import PouchDB from "pouchdb";
import PouchDBFind from "pouchdb-find";

PouchDB.plugin( PouchDBFind );
export default new PouchDB('dictionary', { adapter: 'leveldb'} );