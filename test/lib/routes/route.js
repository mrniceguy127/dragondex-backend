const chai = require('chai');
const { assert, expect } = chai;
const { Route, APIRoute } = require('../../../lib/routes');

describe('Route class tests', () => {
  it('should be abstract', () => {
    expect(() => new Route()).to.throw(Error, /Cannot instantiate an abstract class!/);
  });
});

describe('API route class tests', () => {
  it('should instantiate', () => {
    expect(() => new APIRoute()).to.not.throw(Error, /Cannot instantiate an abstract class!/);
  });

  it('should have correct base', () => {
    let apiRoute = new APIRoute();
    apiRoute.base == '/api/v1';
  });

  it('should be extendable', () => {
    class TestAPIRoute extends APIRoute {
      constructor(app) {
        super(app);
        this.path = '///test';
        this.type = 'POST';
      }
    }

    let testAPIRoute = new TestAPIRoute();
    assert.equal(testAPIRoute.path, '///test');
    assert.equal(testAPIRoute.type, 'POST');
  });

  it('should return full path', () => {
    class TestAPIRoute extends APIRoute {
      constructor(app) {
        super(app);
        this.path = '///test';
        this.type = 'POST';
      }
    }

    let testAPIRoute = new TestAPIRoute();
    assert.equal(testAPIRoute.getFullPath(), '/api/v1/test');
  });
});
