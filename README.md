# Resourse
## Reviews

Webpage that allows users to review different shows and movies they've seen. This project uses RESTful API to allow for review posting, updating, and deleting. It uses Javascript, HTML/CSS, and Python/Flask.

![Review Webpage](images/mediareviews)

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
