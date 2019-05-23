# Dragondex Backend

## API/Database Overview

### Technologies Used

We use MongoDB, a NoSQL non-relational database, to store our application's information.

We also are using a RESTful API to handle server requests.

We use the AWS S3 free tier for image hosting.

## Environment Variables

| Name | Description | Example |
| ---- | ----------- | ------- |
| GOOGLE_CLIENT_ID | The client ID of the Google OAuth2 Application. | `1191382839-some-client-id.apps.googleusercontent.com` |
| GOOGLE_CLIENT_SECRET | The client secret of the Google OAuth2 Application. | someClIEntSecrET12345 |
| SESSION_SECRET | The session secret for user sessions. | SoMeSeSsIoNsEcREtT&78965&*^87 |
| USE_AUTH | **SET TO `true` IN PRODUCTION**. You can set this to `false` in a testing environment. | `true` or `false` |
| USE_AWS | Whether or not to use AWS S3 for image hosting. Provide credentials as documented by Amazon AWS (e.g. via the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` environment variables). | `true` or `false` |
| PORT | The server port to listen on. | `3000` |

## Documents

### Art Object

#### Structure

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

#### Properties

\---

### User Object

#### Structure

```json
{
  "id": "bbbbbbbb5555555511111111cccccccc",
  "username": "pk558",
  "displayName": "Phoenix",
  "posts": [],
  "collectedArt": []
}
```

#### Properties

\---

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
| username  | String    | A username. *Not unique*.        |
| displayName | String  | A display name provided by the user. |
| posts     | Array of **Art Objects** | An array of the user's uploaded artworks. |
| collectedArt | Array of **Art** IDs | An array of Art IDs that are a part of the user's collection. |

#### Art Details Object

| Field     | Type      | Description                      |
| --------- | --------- | -------------------------------- |
| title       | String    | The title of the artwork.      |
| description | String    | A description of the artwork.  |

### Routes

#### Base API URL

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
| Content-Type | `application/json`                        |
| Response    | Returns a `User` object.                   |
| Example     | `GET /api/v1/user/<ID here>`               |

#### POST Art File
| Path        | `/api/v1/upload/artfile`                   |
| ----------- | ------------------------------------------ |
| Content-Type | `multipart/form-data`                     |
| Request Content | A field called `artwork`, which is an image file of mime type `image/png` or `image/jpg`. |
| Response    | Returns a JSON object with a success property or an error property, depending on whether the operation succeeded. |
| Example     | `POST /api/v1/upload/artfile/<artworkId>` |

#### POST Art Details

| Path        | `/api/v1/upload/artdetails`                |
| ----------- | ------------------------------------------ |
| Content-Type | `application/json`                        |
| Request Content | An optional key called "title" that is the title of the artwork. An optional key called "description" that describes the art piece. Also can contain an optional key called "userId" if opting out of `USE_AUTH` in the environment variables to specify a user to modify. |
| Response    | A JSON object of the artwork.              |
| Example     | `POST /api/v1/upload/artdetails/`          |

### POST Update User Collection

| Path        | `/api/v1/update/artcollection`             |
| ----------- | ------------------------------------------ |
| Content-Type | `application/json`                        |
| Request Content | A key called "id", which is the ID of the artwork to add to the collection. Also can contain an optional key called "userId" if opting out of `USE_AUTH` in the environment variables to specify user to modify. |
| Response    | A JSON object with a property called "collectedArt" that is an array of all the Art IDs in the updated art collection. |
| Example     | `POST /api/v1/upload/artdetails/`          |
