const sql = require("mssql");

module.exports = new (class DB {
    constructor() {
        this.sqlConfig = {
            user: process.env.DB_USER,
            password: process.env.DB_PWD,
            database: process.env.DB_NAME,
            server: '185.220.224.56',
            pool: {
                max: 10,
                min: 0,
                idleTimeoutMillis: 30000
            },
            options: {
                encrypt: false, // for azure
                trustServerCertificate: true // change to true for local dev / self-signed certs
            }
        };
        this.connect(this.sqlConfig).then(r => console.log(("Database Connected Successfully.")));
    }

    async connect() {
        if (!this.pool) this.pool = await sql.connect(this.sqlConfig);
        return this.pool
    }


})();
