import { createPool, FieldPacket, Pool, QueryOptions, PoolOptions } from 'mysql2/promise';
import { readFileSync } from "fs";


const options: PoolOptions = JSON.parse(readFileSync('config.json', 'utf-8'));

class Database {
    get pool() { return this._pool };
    constructor(private _pool: Pool) { }

    public query<T>(
        sql: string
    ): Promise<[T, FieldPacket[]]>;
    public query<T>(
        sql: string,
        values: any | any[] | { [param: string]: any }
    ): Promise<[T, FieldPacket[]]>;
    public query<T>(
        options: QueryOptions
    ): Promise<[T, FieldPacket[]]>;
    public query<T>(
        options: QueryOptions,
        values: any | any[] | { [param: string]: any }
    ): Promise<[T, FieldPacket[]]>;
    public query ( ...args: any[] ) {
        return (<any>this.pool.query)( ...args );
    }

    public execute<T>(
        sql: string
    ): Promise<[T, FieldPacket[]]>;
    public execute<T>(
        sql: string,
        values: any | any[] | { [param: string]: any }
    ): Promise<[T, FieldPacket[]]>;
    public execute<T>(
        options: QueryOptions
    ): Promise<[T, FieldPacket[]]>;
    public execute<T>(
        options: QueryOptions,
        values: any | any[] | { [param: string]: any }
    ): Promise<[T, FieldPacket[]]>;
    public execute ( ...args: any[] ) {
        return (<any>this.pool.execute)( ...args );
    }

    public array<T>(
        sql: string
    ): Promise<T[]>;
    public array<T>(
        sql: string,
        values: any | any[] | { [param: string]: any }
    ): Promise<T[]>;
    public array<T>(
        options: QueryOptions
    ): Promise<T[]>;
    public array<T>(
        options: QueryOptions,
        values: any | any[] | { [param: string]: any }
    ): Promise<T[]>;
    public array ( ...args: any[] ) {
        return (<any>this.query)( ...args ).then( ([el]: any[]) => el );
    }

    public get<T>(
        sql: string
    ): Promise<T>;
    public get<T>(
        sql: string,
        values: any | any[] | { [param: string]: any }
    ): Promise<T>;
    public get<T>(
        options: QueryOptions
    ): Promise<T>;
    public get<T>(
        options: QueryOptions,
        values: any | any[] | { [param: string]: any }
    ): Promise<T>;
    public get ( ...args: any[] ) {
        return (<any>this.array)( ...args ).then( ([el]: any[]) => el );
    }
    
}

export const db = new Database( createPool( options ) );