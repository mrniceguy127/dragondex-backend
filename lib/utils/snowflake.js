// ID generation using Twotter's snowflake algorithm.
// Details: https://github.com/twitter-archive/snowflake/tree/snowflake-2010

const { machineIdSync } = require('node-machine-id');

class Snowflake {
  constructor() {
    let machineId = machineIdSync(); // Get machine ID
    let machineId32BitSlice = machineId.slice(0, 4); // Get first 4 characters of machine ID
    let machineId32BitInt = parseInt(machineId32BitSlice, 16); // Convert to integer
    let snowflakeMID = machineId32BitInt % (1024 - 1); // Make so can be used in a size of 10 bits

    this.mid = snowflakeMID; // Machine ID for snowflake IDs
    this.epoch = 1546300800000 // Jan 1, 2019 12:00:00 AM UTC
    this.counter = 0; // Counter for ids
  }

  // Increment counter, reset if over 2^12 - 1
  incCounter() {
    this.counter++;
    if (this.counter > Math.pow(2, 12) - 1) {
      this.counter = 0;
    }
  }

  // Generate snowflake ID.
  gen() {
    let timestamp = Date.now() - this.epoch; // 42 bits of id are for the timestamp
    let snowflakeLow32Bits = (0x000003ff & timestamp); // Get timestamp with high 32 bits set to 0
    let snowflakeHigh32Bits = (timestamp - snowflakeLow32Bits) / Math.pow(2, 10); // Get timestamp with low 10 bits set to 0
    let formattedMID = this.mid + ''; // Machine ID with formatting for snowflake ID.

    while (4 - formattedMID.length > 0) { // Format machine ID
      formattedMID = '0' + formattedMID;
    }

    let formattedCounter = this.counter + ''; // Counter with formatting for snowflake ID

    this.incCounter(); // Increment counter

    while (4 - formattedCounter.length > 0) { // Format counter
      formattedCounter = '0' + formattedCounter;
    }

    let snowflake = '' + ((snowflakeHigh32Bits * Math.pow(2, 10)) + snowflakeLow32Bits) + formattedMID + formattedCounter; // Put snowflake together

    return snowflake;
  }
}

module.exports = Snowflake;



//Test if unique for many id gens at once.
/*
async function logId(id) {
  console.log(id);
}

let sf = new Snowflake();
let ids = [];
for (let i = 0; i < 14098; i++) {
  let id = sf.gen();
  logId(id);
  if (ids.includes(id)) {
    console.log("Uh-oh! There was a match!");
    process.exit();
  }
  ids.push(id);
}
*/
