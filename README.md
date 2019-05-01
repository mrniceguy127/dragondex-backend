# Dragondex Backend

## API/Database Overview

### Technologies Used

We use MongoDB, a NoSQL non-relational database, to store our application's information.

We also are using a RESTful API to handle server requests.

## Document Structure

### Art Object

```javascript
{
  "id": "0000000033333333aaaaaaaaffffffff",
  "imageUrl": "https://example.org/notReal.jpg",
  "metadata": {
    "title": "This Is A Title",
    "description": "This might be a description."
  },
}
```

### User Object

```javascript
{
  "id": "bbbbbbbb5555555511111111cccccccc",
  "username": "pk558",
  "displayName": "Phoenix",
  "posts": [
    //Art1, Art2, Art3...
  ]
}
```
