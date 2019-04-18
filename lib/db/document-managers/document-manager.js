// Eases the process of getting document data from the database.

class DocumentManager {
  constructor(type, query) {
    this.type = type + '';
    this.query = query;
    this.data = {};
  }

  // Returns Promise<Doc>
  getDocument() {
    return Promise.resolve({});
  }

  // Downloads doc data to this.data.
  downloadData() {
    this.getDocument().then(data => this.data = data);
  }

  // Format the data stored in this.data in some desired way.
  getFormattedData() {
    return this.data;
  }
};

module.exports = DocumentManager;
