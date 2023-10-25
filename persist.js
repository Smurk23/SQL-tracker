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
    getAllEmployees() {
        return this.db.promise().query(
            'SELECT EMPLOYEE.ID, EMPLOYEE.FIRST_NAME, EMPLOYEE.LAST_NAME, EMPLOYEE.MANAGER_ID;'
        );
    }
}

module.exports = new Persist(db);