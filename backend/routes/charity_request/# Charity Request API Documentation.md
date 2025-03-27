# Charity Request API Documentation

## **Base URL**
```
http://localhost:<port>/api/charity_request
```

---

## **1. Create a Charity Request**

**Endpoint**:  
```
POST /create_request
```

**Description**:  
Creates a new charity request.

**Access**:  
Private (Requires authentication)

**Headers**:  
```json
{
  "Authorization": "Bearer <your_token>",
  "Content-Type": "application/json"
}
```

**Request Body**:  
```json
{
  "title": "Food Donation for Shelter",
  "description": "Requesting food supplies for the local shelter.",
  "category": "produce",
  "quantityRequested": 50,
  "unit": "kg"
}
```

**Response**:  
- **200 OK**:  
  ```json
  {
    "_id": "605c72f2b5f1b2a3d8e8c123",
    "title": "Food Donation for Shelter",
    "description": "Requesting food supplies for the local shelter.",
    "category": "produce",
    "quantityRequested": 50,
    "unit": "kg",
    "charity": "605c72f2b5f1b2a3d8e8c456",
    "status": "pending",
    "quantityFulfilled": 0,
    "donations": []
  }
  ```
- **400 Bad Request**:  
  ```json
  { "message": "All fields are required" }
  ```

---

## **2. Get All Charity Requests**

**Endpoint**:  
```
GET /requests
```

**Description**:  
Fetches all charity requests.

**Access**:  
Public

**Response**:  
- **200 OK**:  
  ```json
  [
    {
      "_id": "605c72f2b5f1b2a3d8e8c123",
      "title": "Food Donation for Shelter",
      "description": "Requesting food supplies for the local shelter.",
      "category": "produce",
      "quantityRequested": 50,
      "unit": "kg",
      "charity": {
        "_id": "605c72f2b5f1b2a3d8e8c456",
        "name": "Charity Name",
        "organization": "Charity Organization"
      },
      "status": "pending",
      "quantityFulfilled": 0,
      "donations": []
    }
  ]
  ```

---

## **3. Get a Single Charity Request**

**Endpoint**:  
```
GET /request/:id
```

**Description**:  
Fetches a single charity request by its ID.

**Access**:  
Public

**Path Parameters**:  
- `id` (string): The ID of the charity request.

**Response**:  
- **200 OK**:  
  ```json
  {
    "_id": "605c72f2b5f1b2a3d8e8c123",
    "title": "Food Donation for Shelter",
    "description": "Requesting food supplies for the local shelter.",
    "category": "produce",
    "quantityRequested": 50,
    "unit": "kg",
    "charity": {
      "_id": "605c72f2b5f1b2a3d8e8c456",
      "name": "Charity Name",
      "organization": "Charity Organization"
    },
    "status": "pending",
    "quantityFulfilled": 0,
    "donations": []
  }
  ```
- **404 Not Found**:  
  ```json
  { "message": "Request not found" }
  ```

---

## **4. Update a Charity Request**

**Endpoint**:  
```
PATCH /request/:id
```

**Description**:  
Updates an existing charity request.

**Access**:  
Private (Requires authentication)

**Headers**:  
```json
{
  "Authorization": "Bearer <your_token>",
  "Content-Type": "application/json"
}
```

**Path Parameters**:  
- `id` (string): The ID of the charity request.

**Request Body**:  
```json
{
  "title": "Updated Title",
  "description": "Updated description.",
  "category": "bakery",
  "quantityRequested": 100,
  "unit": "pieces"
}
```

**Response**:  
- **200 OK**:  
  ```json
  {
    "_id": "605c72f2b5f1b2a3d8e8c123",
    "title": "Updated Title",
    "description": "Updated description.",
    "category": "bakery",
    "quantityRequested": 100,
    "unit": "pieces",
    "charity": "605c72f2b5f1b2a3d8e8c456",
    "status": "pending",
    "quantityFulfilled": 0,
    "donations": []
  }
  ```
- **404 Not Found**:  
  ```json
  { "message": "Request not found" }
  ```
- **403 Forbidden**:  
  ```json
  { "message": "Not authorized" }
  ```

---

## **5. Delete a Charity Request**

**Endpoint**:  
```
DELETE /request/:id
```

**Description**:  
Deletes a charity request.

**Access**:  
Private (Requires authentication)

**Headers**:  
```json
{
  "Authorization": "Bearer <your_token>"
}
```

**Path Parameters**:  
- `id` (string): The ID of the charity request.

**Response**:  
- **200 OK**:  
  ```json
  { "message": "Request removed" }
  ```
- **404 Not Found**:  
  ```json
  { "message": "Request not found" }
  ```
- **403 Forbidden**:  
  ```json
  { "message": "Not authorized" }
  ```

---

## **6. Donate to a Charity Request**

**Endpoint**:  
```
PATCH /request/:id/donate
```

**Description**:  
Allows a user to donate to a charity request.

**Access**:  
Private (Requires authentication)

**Headers**:  
```json
{
  "Authorization": "Bearer <your_token>",
  "Content-Type": "application/json"
}
```

**Path Parameters**:  
- `id` (string): The ID of the charity request.

**Request Body**:  
```json
{
  "quantity": 10
}
```

**Response**:  
- **200 OK**:  
  ```json
  {
    "_id": "605c72f2b5f1b2a3d8e8c123",
    "title": "Food Donation for Shelter",
    "description": "Requesting food supplies for the local shelter.",
    "category": "produce",
    "quantityRequested": 50,
    "unit": "kg",
    "charity": "605c72f2b5f1b2a3d8e8c456",
    "status": "partially_fulfilled",
    "quantityFulfilled": 10,
    "donations": [
      {
        "donor": "605c72f2b5f1b2a3d8e8c789",
        "quantity": 10
      }
    ]
  }
  ```
- **404 Not Found**:  
  ```json
  { "message": "Request not found" }
  ```
- **400 Bad Request**:  
  ```json
  { "message": "Request is not pending" }
  ```

---
