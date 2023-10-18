let db = require('./connection');

class Persist {
    constructor(db) {
        this.db = db;
    }

    getAllDepartments() {
        return this.db.promise().query(
            'SELECT DEPARTMENT.ID, DEPARTMENT.NAME FROM DEPARTMENT;'  
        );
    }
}

module.exports = new Persist(db);