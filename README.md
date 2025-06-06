# Sushruta

## Generic Response Entity

```json
{
    "statusCode": Integer,
    "data": {},
    "message": "",
    "success": True | False
}
```

## Generic Error Entity

```json
{
    "statusCode" : Integer, 
    "data" : null,
    "message" : "",
    "success" : false,
    "errors" : {},
}
```

## Grpah

### Generic Data Response Entity

```json
{
    "x": [], // x-lables
    "beforeMeal": [], // y-labels for before meal
    "afterMeal": [] // y-labels for after meal
}
```

#### Daily

```json
{
    "x": ["Reading 1", "Reading 2", ...], // x-lables
    "beforeMeal": [], // y-labels for before meal
    "afterMeal": [] // y-labels for after meal
}
```

##### `api/v1/graph/daily/latest` ✅

```json
{
    "statusCode": 200,
    "data": {
        "x":[],
        "beforeMeal":[],
        "afterMeal": []
    },
    "message": "Successfully fetched latest day",
    "success": true
}
```

##### `api/v1/graph/daily/readingTakenRemaining` ✅

```json
{
    "statusCode": 200,
    "data": [
        {
            "_id": "675d1be44544db4161af090d",
            "glucoseLevelReading": "110.3601",
            "createdAt": "2024-12-14T05:47:16.050Z",
            "readingTaken": ""
        }
    ],
    "message": "fetched all reading taken field remaining documents!",
    "success": true
}
```

##### `api/v1/graph/daily/:date`

#### Weekly

```json
{
    "x": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], // x-lables
    "beforeMeal": [], // y-labels for before meal
    "afterMeal": [] // y-labels for after meal
}
```

##### `api/v1/graph/weekly/latest`

#### Monthly

```json
{
    "x": ["Week 1", "Week 2", "Week 3", ...], // x-lables
    "beforeMeal": [], // y-labels for before meal
    "afterMeal": [] // y-labels for after meal
}
```

#### Yearly

```json
{
    "x": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], // x-lables
    "beforeMeal": [], // y-labels for before meal
    "afterMeal": [] // y-labels for after meal
}
```

## User

### `api/v1/user/` `Method: GET`

```json
{
    "statusCode": 200,
    "data": {
        "_id": "675d12fe44abc6bd1fa2c83e",
        "username": "guest",
        "age": 21,
        "height": 170,
        "weight": 78,
        "updatedAt": "2024-12-14T05:17:48.508Z"
    },
    "message": "user fetched successfully",
    "success": true
}
```

### `api/v1/user/` `Method: POST`

#### Request Body

```json
{
        "_id": "675d12fe44abc6bd1fa2c83e",
        "username": "guest",
        "age": 21,
        "height": 170,
        "weight": 78
}
```

#### Response Body

```json
{
    "statusCode": 200,
    "data": {
        "_id": "675d12fe44abc6bd1fa2c83e",
        "username": "guest",
        "age": 21,
        "height": 170,
        "weight": 78,
        "updatedAt": "2024-12-14T05:25:27.217Z"
    },
    "message": "user fetched successfully",
    "success": true
}
```#   n e w - d i a b t e c h - b a c k e d - a p i  
 