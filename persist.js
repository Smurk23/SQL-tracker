let db = require('./connection');

class Persist {
    constructor(db) {
        this.db = db;
    }

    async addRole(role) {
        return await this.db.query(
            'INSERT INTO role SET ?', role
        );
    }

    addDepartment(department) {
        return this.db.query(
            'INSERT INTO department SET ?', department
        );
    }

    getAllDepartments() {
        return this.db.query(
            'SELECT DEPARTMENT.ID, DEPARTMENT.NAME FROM DEPARTMENT;'  
        );
    }
    getAllEmployees() {
        return this.db.query(
            'SELECT EMPLOYEE.ID, EMPLOYEE.FIRST_NAME, EMPLOYEE.LAST_NAME, EMPLOYEE.MANAGER_ID;'
        );
    }
}

module.exports = new Persist(db);