// Document manager for art documents

const DocumentManager = require('../document-manager.js');

class ArtManager extends DocumentManager {
  constructor(query) {
    super('art', query)
  }

  // Returns Promise<ArtDoc>
  async getDocument() {
    return Promise.resolve({ id: 'this-is-an-art-id' });
  }

  // Downloads the art data to this.data.
  async downloadData() {
    return new Promise((res, rej) => {
      this.getDocument().then(data => {
        this.data = data;
        res();
      }).catch(err => {
        rej(err);
      });
    });
  }

  // Format the data stored in this.data in some desired way.
  getFormattedData() {
    return this.data;
  }
};

module.exports = ArtManager;
