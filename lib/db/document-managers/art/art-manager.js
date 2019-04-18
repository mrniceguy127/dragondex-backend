// Document manager for art documents

const DocumentManager = require('../document-manager.js');

class ArtManager extends DocumentManager {
  constructor(query) {
    super('art', query)
  }

  // Returns Promise<ArtDoc>
  getDocument() {
    return Promise.resolve({ id: 'this-is-an-art-id' });
  }

  // Downloads the art data to this.data.
  downloadData() {
    this.getDocument().then(data => this.data = data);
  }

  // Format the data stored in this.data in some desired way.
  getFormattedData() {
    return this.data;
  }
};

module.exports = ArtManager;
