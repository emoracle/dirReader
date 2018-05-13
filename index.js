console.log("Omgeving : Dit is een " + ((process.arch === "x64") ? "64-bits" : "32 bits") + " node omgeving.\n");

const fs = require("fs"),
  oracledb = require("oracledb"),
  config = require("./conf/dirReader.json"),
  lineFactory = require("./modules/lineFactory"),
  closeFactory= require("./modules/closeFactory"),
  scandir = config.scanDirectory;

oracledb.autoCommit = false;

oracledb.getConnection(
  {
    user: config.user,
    password: config.password,
    connectString: config.connectString
  },
  (err, conn) => {
    if (err) {
      console.error("getconnectionerror: ", err.message);
      return;
    }
    conn.clientId = scandir;
    conn.module = config.moduleNaam;
    conn.action = scandir;

    const leesBestand = () => {

      console.log("Scanning :", scandir, "met een scaninterval van", config.scanInterval, "milliseconden");

      fs.readdir(scandir, (err, dir) => {
        let
          filePath,
          toPath,
          stat,
          lineReader;

        if (err) {
          console.error(err.message);
        }

        for (var i = 0; ( i < dir.length && i < config.numberOfFiles); i++) {
          filePath = scandir + "/" + dir[i];
          toPath = config.moveToDirectory + "/" + dir[i];
          stat = fs.statSync(filePath);

          if (stat.isFile()) {
            console.log("reading:", i, filePath);
            lineReader = require("readline").createInterface({
              input: require("fs").createReadStream(filePath)
            });            
            lineReader.on("line", lineFactory(oracledb, conn, filePath));
            lineReader.on("close" , closeFactory(filePath, toPath, conn, fs ) );
          }
        }
      });
    };
    setInterval(leesBestand, config.scanInterval);
  }
);

