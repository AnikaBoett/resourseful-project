# Resourse
## Reviews

Attributes
- Title
- Date
- Medium
- Rating
- Review

# Schema
```
CREATE TABLE reviews (
    id INTEGER PRIMARY KEY,
    title TEXT,
    date TEXT,
    medium TEXT,
    rating INTEGER,
    review TEXT
);
```

# Restful Endpoints
| Name                 |  Method  |    Path         |
| :------------------- | :------: | --------------: |
| Retrieve all reviews |   GET    | /reviews        |
| Retrieve a review    |   GET    | /reviews/<*id*> |
| Create a review      |   POST   | /reviews        |
| Update a review      |   PUT    | /reviews/<*id*> |
| Delete a review      |   DELETE | /reviews/<*id*> |
