/* eslint-disable max-classes-per-file */

module.exports.TABLE_ALREADY_EXISTS_ERROR = class TABLE_ALREADY_EXISTS_ERROR extends Error {
    constructor(tableName) {
        super(`Table ${tableName} already exists!`);
    }
};

module.exports.EMPTY_RESULT_ERROR = class EMPTY_RESULT_ERROR extends Error {};
module.exports.DUPLICATE_ENTRY_ERROR = class DUPLICATE_ENTRY_ERROR extends Error {};

// See more: https://www.postgresql.org/docs/current/errcodes-appendix.html
module.exports.SQL_ERROR_CODE = {
    TABLE_ALREADY_EXISTS: '42P07',
    DUPLICATE_ENTRY: '23000',
};


//
/* eslint-disable max-classes-per-file */

module.exports.TABLE_ALREADY_EXISTS_ERROR = class TABLE_ALREADY_EXISTS_ERROR extends Error {
    constructor(tableName) {
        super(`Table ${tableName} already exists!`);
    }
};

module.exports.EMPTY_RESULT_ERROR = class EMPTY_RESULT_ERROR extends Error { 
    constructor(message) {
        super(`No Records Found!`); 
    }
};
module.exports.DUPLICATE_ENTRY_ERROR = class DUPLICATE_ENTRY_ERROR extends Error { };

module.exports.MYSQL_ERROR_CODE = {
    TABLE_ALREADY_EXISTS: 1050,
    DUPLICATE_ENTRY: 1062,
};




module.exports.AppError = class AppError extends Error {
    constructor(msg, statusCode) {
        super(msg);

        this.statusCode = statusCode;
        this.error = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports.isEmpty = function (obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return JSON.stringify(obj) === JSON.stringify({});
}
