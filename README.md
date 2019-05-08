# Dragondex Backend

## API/Database Overview

### Technologies Used

We use MongoDB, a NoSQL non-relational database, to store our application's information.

We also are using a RESTful API to handle server requests.

We use the AWS S3 free tier for image hosting.

## Document Structure

### Art Object

```json
{
  "id": "0000000033333333aaaaaaaaffffffff",
  "imageUrl": "https://example.org/notReal.jpg",
  "metadata": {
    "title": "This Is A Title",
    "description": "This might be a description."
  },
  "postedBy": {}
}
```

### User Object

```json
{
  "id": "bbbbbbbb5555555511111111cccccccc",
  "username": "pk558",
  "displayName": "Phoenix",
  "posts": []
}
```

## API

### Objects

#### Art Object

| Field     | Type      | Description                      |
| --------- | --------- | -------------------------------- |
| id        | String    | The unique ID of the artwork.    |
| imageUrl  | String    | A URL linking to an image of the artwork. |
| metadata  | **Art Metadata Object** | Metadata associated with the artwork. |
| postedBy | **User Object** | The user who uploaded the artwork. Not necessarily the artist. |

#### Art Metadata Object

| Field     | Type      | Description                      |
| --------- | --------- | -------------------------------- |
| title     | String    | The title of the artwork.        |
| description | String  | A description of the artwork.    |

#### User Object

| Field     | Type      | Description                      |
| --------- | --------- | -------------------------------- |
| id        | String    | The unique ID of the user.       |
| username  | String    | A unique username.               |
| displayName | String  | A display name provided by the user. |
| posts     | Array of **Art Objects** | An array of the user's uploaded artworks. |

#### Art Details Object

| Field     | Type      | Description                      |
| --------- | --------- | -------------------------------- |
| title       | String    | The title of the artwork.      |
| description | String    | A description of the artwork.  |

### Routes

#### Base URL

```
/api/v1
```

#### GET Art
| Path        | `/api/v1/art`                              |
| ----------- | ------------------------------------------ |
| Response    | Returns an `Art` object.                   |
| Example     | `GET /api/v1/art/<ID here>`                |

#### GET User
| Path        | `/api/v1/user`                             |
| ----------- | ------------------------------------------ |
| Response    | Returns a `User` object.                   |
| Example     | `GET /api/v1/user/<ID here>`               |

#### POST Art File
| Path        | `/api/v1/upload/artfile`                   |
| ----------- | ------------------------------------------ |
| Content-Type | `multipart/form-data`                     |
| Request Content | A field called `artwork`, which is an image file of mime type `image/png` or `image/jpg`. |
| Response    | Returns a JSON object with a success property or an error property, depending on whether the operation succeeded. |
| Example     | `POST /api/v1/upload/artfile/\<artworkId>` |

#### POST Art Details

| Path        | `/api/v1/upload/artdetails`                |
| ----------- | ------------------------------------------ |
| Content-Type        | `application/json`                 |
| Request Content | A field called `artwork`, which is an image file of mime type `image/png` or `image/jpg`. |
| Response    | Returns a JSON object with a success property or an error property, depending on whether the operation succeeded. |
| Example     | `POST /api/v1/upload/artdetails/`          |
