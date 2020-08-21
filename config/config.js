require('dotenv').config()

var db = {
    DATABASE_HOST: 'postgres' || 'localhost',
    DATABASE_NAME: process.env.DATABASE_NAME || 'postgres',
    DATABASE_USERNAME: process.env.DATABASE_USERNAME || 'postgres',
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || 'eatsleepcode',
    DATABASE_PORT: process.env.DATABASE_PORT || 5432,
    DATABASE_DIALECT: 'postgres',
    NODE_ENV: process.env.NODE_ENV || 'development',
    SCHEMA: "public",
}

var keys = {
    infura_project_id: "f8150708112b44239cfa591fa44724f0",
    account_pvt_key: "4e54d858fc92a6d15d874e5eaca76bee6b5003930fc6f5580ef230c78375c5d3"
}

var accounts = {
    deployer: "0x1b82d8c1D98304D3f6C5C139d34f96E4D6f0dc3b"
}

var config = {
    db: {
        env: db
    },
    keys,
    accounts,
}

module.exports = config