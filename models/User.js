var db = require('../database')
require('dotenv').config();

module.exports = class User {

    constructor(email, pwd, target_weight, weight, height, BMI) {
        this.email = email;
        this.pwd = pwd;
        this.target_weight = target_weight;
        this.weight = weight;
        this.height = height;
        this.BMI = BMI;
    }

    static getUser(id) {
        return db.query('SELECT * FROM _user where id = $1', [id]);
    }

    static getUserFromEmail(email) {
        return db.query('SELECT * FROM _user where email = $1', [email]);
    }

    static updateUser(user) {
        return db.query('UPDATE _user SET email = $1, target_weight = $2, weight = $3, height = $4, BMI = $5, fullname = $6 WHERE id = $7 RETURNING *', [user.email
            , user.target_weight, user.weight, user.height, user.BMI, user.fullname, user.id]);
    }

    static createUser(user) {
        return db.query('INSERT INTO _user (email, pwd, target_weight, weight, height, BMI, fullname) values ($1,$2,$3,$4,$5,$6,$7) RETURNING *', [user.email
            , user.pwd, user.target_weight, user.weight, user.height, user.BMI, user.fullname]);
    }
}
