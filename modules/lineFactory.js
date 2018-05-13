const  callProcedure = require("./callProcedure");

module.exports = function (oracledb, conn, filePath) {
  return function (line) {
    callProcedure(oracledb, conn, line, filePath);
  };
};