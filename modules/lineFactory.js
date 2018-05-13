const  callProcedure = require("./callProcedure");

module.exports = function (oracledb, conn, filePath, logger) {
  return function (line) {
    callProcedure(oracledb, conn, line, filePath, logger);
  };
};