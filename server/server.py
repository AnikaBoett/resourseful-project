from flask import Flask, request
from reviews import ReviewsDB

app = Flask(__name__)

@app.route("/reviews/<int:review_id>", methods=["OPTIONS"])
def handle_cors_options(review_id):
    return "", 204, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "PUT, DELETE",
        "Access-Control-Allow-Headers": "Content-Type"
    }

@app.route("/reviews", methods=["GET"])
def retrieve_media():
    db = ReviewsDB("dummydb.db")
    mediaReviews = db.getReviews()  # Assuming db.readAllRecords() returns a list
    return mediaReviews, 200, {"Access-Control-Allow-Origin": "*"}

@app.route("/reviews/<int:review_id>", methods=["GET"])
def retrieve_review(review_id):
    db = ReviewsDB("dummydb.db")
    review = db.getReview(review_id)
    if review:
        return review, 200, {"Access-Control-Allow-Origin": "*"}
    else:
        return f"Review with {review_id} not found", 404, {"Access-Control-Allow-Origin": "*"} 

@app.route("/reviews", methods=["POST"])
def create_media():
    print("The request data is: ", request.form)
    date = request.form["date"]
    title = request.form["title"]
    medium = request.form["medium"]
    rating = request.form["rating"]
    review = request.form["review"]
    db = ReviewsDB("dummydb.db")
    db.createReview(date, title, medium, rating, review)
    return "Created", 201, {"Access-Control-Allow-Origin": "*"}

@app.route("/reviews/<int:review_id>", methods=["PUT"])
def update_review(review_id):
    print("Update review with ID ", review_id)
    db = ReviewsDB("dummydb.db")
    review = db.getReview(review_id)
    if review:
        date = request.form["date"]
        title = request.form["title"]
        medium = request.form["medium"]
        rating = request.form["rating"]
        review = request.form["review"]

        db.updateReview(review_id, date, title, medium, rating, review)
        return "Update", 200, {"Access-Control-Allow-Origin": "*"}
    else:
        return f"Review with {review_id} not found", 404, {"Access-Control-Allow-Origin": "*"}

@app.route("/reviews/<int:review_id>", methods=["DELETE"])
def delete_review(review_id):
    print("Deleting review with ID ", review_id)
    db = ReviewsDB("dummydb.db")
    review = db.getReview(review_id)
    if review:
        db.deleteReview(review_id)
        return f"Review with {review_id} deleted", 200, {"Access-Contril-Allow-Origin": "*"}
    else:
        return f"Review with {review_id} not found", 404, {"Access-Control-Allow-Origin": "*"}


def run():
    print("Server is running on port 8081")
    app.run(port=8081, debug=True)

if __name__ == "__main__":
    app.run(port=8081)