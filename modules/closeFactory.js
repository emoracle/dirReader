module.exports = function (filePath, toPath, conn, fs, logger) {
  return function () {
    logger.info("move", filePath, " to", toPath);
    fs.renameSync(filePath, toPath);
    conn.commit(function (err) {
      if (err) {
        logger.error("commit-error :", err.message);
      }
    });
  };
};