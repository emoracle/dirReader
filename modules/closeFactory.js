module.exports = function (filePath, toPath, conn, fs) {
  return function () {
    console.log("move", filePath, " to", toPath);
    fs.renameSync(filePath, toPath);
    conn.commit(function (err) {
      if (err) {
        console.error("commit-error :", err.message);
      }
    });
  };
};