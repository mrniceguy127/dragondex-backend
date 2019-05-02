// ID generation using Twotter's Snowflake algorithm.
// Details: https://github.com/twitter-archive/snowflake/tree/snowflake-2010

const { machineIdSync } = require('node-machine-id');
const Integer = require('integer');
const { performance } = require('perf_hooks');

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
    let id = Integer(timestamp);
    id = id.shiftLeft(10);
    id = id.add(this.mid);
    id = id.shiftLeft(12);
    id = id.add(this.counter);

    this.incCounter();

    let snowflake = id.toString();

    return snowflake;
  }

  //Test if unique for many id gens at once and output benchmark time.
  test() {
    let time1 = performance.now();
    let numIds = 14098

    let ids = [];
    let duplicate = false;
    let i;

    for (i = 0; i < numIds; i++) {
      let id = this.gen();
      if (ids.includes(id)) {
        console.log("Uh-oh! There was a match!");
        duplicate = true;
        break;
      }
      ids.push(id);
    }

    if (!duplicate) {
      console.log("Success! No duplicates!");
    }


    let finalTime = performance.now() - time1;

    console.log("Created", i, "IDs in", finalTime, " ms.");
  }
}

module.exports = Snowflake;
