# Esempio applicativo web NodeJS + Express + MariaDB

## Che devi fare per iniziare:
Assicurati di non avere nessuna installazione Windows nel proprio computer, nel caso disillastarla ( o come sp@**10 si dice, cancellarla, nsomma mbare non devi usare windows, pena ti ignoro le issues ); Assicurati di avere installato NodeJS >=15, MariaDB >=10.5 o MySQL >=8 ( evita possibilmente ).


### 1) Configura il database:
Facile facile, piglia la bash e scrivi:
```sh
mysql -u <nome> -p test.sql
```
insomma, il file `test.sql` lo puoi leggere da te e se sai un minimo di database e sql non hai problemi a comprendere.

### 2) Configura il progetto:
Copia e incolla `config.template.json` come `config.json` e compila dentro la configurazione del database, ignora `connectionLimit` se non sai cosa sia, e guarda la documentazione di `mysql2` che non te fa male.
Poi esegui:
```sh
# se hai solo npm
npm install

# se hai yarn
yarn install
```

### 3) Esegui il programma:
Ora dovresti essere in grado di eseguire `npm run build` o `yarn run build` per compilare, e `npm start` o `yarn start` per avviare.

Se mentri smanetti ti infastidisce fare la build e rieseguire di continuo, prova a usare lo script `watch`, che puoi chiamare con `npm run watch` o `yarn run watch`, appena salvi un file smanettato in _teoria_ dovrebbe riavviare, non è la soluzione più elegante ma funziona.

## FAQ:
#### PECCHÈ USARE MARIADB INVECE CHE MYSQL???
MySQL è proprietà Oracle e Oracle non vuole che MySQL venga utilizzato, perciò ha poche novità, insomma vuole che acquisti Oracle Database, mentre MariaDB ultimamente mi sta dando soddisfazioni con l'aggiunta del tipo ROW e delle big columns etc... poi si installa easy e non impazzisco con messaggi come `WHICH VERSION OF MYSQL YOU CHOSE??` mentre lancio un dist-upgrade. MANNAGGIA.
#### WINZOZ È MEGLIO!!1!!11!!!
Bazzecole.
#### COME LE PROVO LE API?
Con un po' di miele, scherzo, mentre scrivevo sto codice mi sono fatto una collezione con Postman, non so come si importa, ma il file è `prova.postman_collection.json`.