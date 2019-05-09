const { assert } = require('chai');
const { Snowflake } = require('../../../lib/utils');

describe('Snowflake ID generation tests', () => {
  it('should be unique', () => {
    let sf = new Snowflake();
    let sfs = [];

    let amountOfSnowflakes = 10000;
    let i;
    for (i = 0; i < amountOfSnowflakes; i++) {
      let id = sf.gen();
      assert.notInclude(sfs, id);
    }
  });
});
