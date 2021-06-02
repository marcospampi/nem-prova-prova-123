export interface Entry {
    key: string;
    type: 'json'|'text';
    value: string|object;
}