module.exports = function (oracledb, conn, content, fileName, logger) {
  conn.execute("BEGIN ucs_ilz.lees_mbus_in(:p_content, :p_filename, :p_uitput); END;", {
    p_content: {
      val: content,
      type: oracledb.STRING,
      dir: oracledb.BIND_IN
    },
    p_filename: {
      val: fileName,
      type: oracledb.STRING,
      dir: oracledb.BIND_IN
    },
    p_uitput: {
      type: oracledb.STRING,
      dir: oracledb.BIND_OUT
    }
  }, (err, result) => {
    if (err) {
      logger.error("DBexecute:", err.message);
    }
    else {
      logger.info("result :", result.outBinds.p_uitput);
    }
  });
};

