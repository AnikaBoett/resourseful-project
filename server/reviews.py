import sqlite3

def dict_factory(cursor, row):
    fields = []
    #Extract column names from cursor description
    for column in cursor.description:
        fields.append(column[0])

    result_dict = {}
    for i in range(len(fields)):
        result_dict[fields[i]] = row[i]

    return result_dict


class ReviewsDB:

    def __init__(self, filename):
        #connect to the DB file
        self.connection = sqlite3.connect(filename)
        self.connection.row_factory = dict_factory
        self.cursor = self.connection.cursor()
        return

    def getReviews(self):
        self.cursor.execute("SELECT * FROM reviews")
        reviews = self.cursor.fetchall()
        return reviews
    
    def getReview(self, review_id):
        data = [review_id]
        self.cursor.execute("SELECT * FROM reviews WHERE id = ?", data)
        review = self.cursor.fetchone()
        return review

    def createReview(self, date, title, medium, rating, review):
        data = [date, title, medium, rating, review]
        self.cursor.execute("INSERT INTO reviews(date, title, medium, rating, review)Values(?, ?, ?, ?, ?)",data)
        self.connection.commit()

    def updateReview(self, review_id, date, title, medium, rating, review):
        data = [date, title, medium, rating, review, review_id]
        self.cursor.execute("UPDATE reviews SET date = ?, title = ?, medium = ?, rating = ?, review = ? WHERE id = ?", data)
        self.connection.commit()

    def deleteReview(self, review_id):
        cursor = self.connection.cursor()
        cursor.execute("DELETE FROM reviews WHERE id = ?", (review_id,))
        self.connection.commit()
        cursor.close()