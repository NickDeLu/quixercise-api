var db = require('../database')
require('dotenv').config();

module.exports = class Exercise {

    constructor(id, userId, bodyPart, equipment, gifUrl, name, target) {
        this.id = id;
        this.userId = userId;
        this.bodyPart = bodyPart;
        this.equipment = equipment;
        this.gifUrl = gifUrl;
        this.name = name;
        this.target = target;
    }

    static getUserExercises(id) {
        return db.query('SELECT * FROM exercise where "userId" = $1', [id]);
    }

    static saveUserExercise(exercise) {
        return db.query('INSERT INTO exercise (id, "userId", "bodyPart", equipment, "gifUrl", name, target)  values ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
            [exercise.id, exercise.userId, exercise.bodyPart, exercise.equipment, exercise.gifUrl, exercise.name, exercise.target]);
    }

    static removeUserExercise(userId, exerciseId) {
        return db.query('DELETE FROM exercise where "userId" = $1 and id = $2', [userId, exerciseId]);
    }

}