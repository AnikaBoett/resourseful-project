console.log("connected");
const apiURL = window.location.protocol === 'file:'
    ? 'http://localhost:8081' // Local API server during development
    : ''; //Production API

let submitButton = document.getElementById("submit-review-button");
let currentReviewId = null;

function addReview(data) {
    let reviewList = document.getElementById("reviewList");
    let reviewContainer = document.createElement("div");
    //For styling purposes
    reviewContainer.className = "reviewContainer";

    let titleDiv = document.createElement("div");
    titleDiv.className = "reviewTitle";
    titleDiv.textContent = `${data.title || "Untitled"}`;
    reviewContainer.appendChild(titleDiv);

    let dateDiv = document.createElement("div");
    dateDiv.className = "reviewDate";
    dateDiv.textContent = `${data.date || "N/A"}`;
    reviewContainer.appendChild(dateDiv);

    let mediaTypeDiv = document.createElement("div");
    mediaTypeDiv.className = "reviewMediaType";
    mediaTypeDiv.textContent = `${data.medium || "Unknown"}`;
    reviewContainer.appendChild(mediaTypeDiv);

    let ratingDiv = document.createElement("div");
    ratingDiv.className = "reviewRating";
    ratingDiv.textContent = `${data.rating + "/10"|| "N/A"}`;
    reviewContainer.appendChild(ratingDiv);

    let reviewTextDiv = document.createElement("div");
    reviewTextDiv.className = "reviewText";
    reviewTextDiv.textContent = `${data.review || "No review text"}`;
    reviewContainer.appendChild(reviewTextDiv);

    let editDeleteButtons = document.createElement("div");
    let editButton = document.createElement("button");
    editButton.className = "editButton";
    editButton.textContent = 'Edit';
    editButton.onclick = function () {
        openEditModal(data);
    };
    editDeleteButtons.appendChild(editButton);

    let deleteButton = document.createElement('button');
    deleteButton.className = "deleteButton";
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function () {
        if (confirm("Are you sure you want to delete this review?")) {
            deleteReview(data.id);
        } else {
            console.log("Review deletion cancelled.");
        }
    };
    editDeleteButtons.className = "buttonsGroup";
    editDeleteButtons.appendChild(deleteButton);

    reviewContainer.appendChild(editDeleteButtons);

    reviewList.appendChild(reviewContainer);

}

async function loadMediaFromServer() {
    fetch(`${apiURL}/reviews`)
        .then(function(response) {
            response.json()
                .then(function(data) {
                    console.log(data);
                    let mediaReviews = data;
                    mediaReviews.forEach(addReview)
                }
            )
        }
    )
}

async function addNewReview() {
    console.log("button clicked");
    //let myHeaders = new Headers();
    //myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    let reviewTitle = document.getElementById("inputMediaTitle");
    let watchedDate = document.getElementById("inputDate");
    let reviewMedium = document.getElementById("media-type");
    let reviewRating = document.getElementById("ratingScoreInput");
    let mediaReview = document.getElementById("input-review");

    let encodedData = "date=" + encodeURIComponent(watchedDate.value);
    encodedData += "&title=" + encodeURIComponent(reviewTitle.value);
    encodedData += "&medium=" + encodeURIComponent(reviewMedium.value);
    encodedData += "&rating=" + encodeURIComponent(reviewRating.value);
    encodedData += "&review=" + encodeURIComponent(mediaReview.value);

    
    fetch(`${apiURL}/reviews`, {
        method: "POST",
        body: encodedData,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(function(response){
        console.log("new review created!", response)
        addReview({ title: reviewTitle, date: watchedDate, medium: reviewMedium, rating: reviewRating, review: mediaReview});
    })
}

function openEditModal(data) {
    currentReviewId = data.id;
    document.getElementById("editTitle").value = data.title;
    document.getElementById("editDate").value = data.date;
    document.getElementById("editMedium").value = data.medium;
    document.getElementById("editRating").value = data.rating;
    document.getElementById("editReview").value = data.review;
    document.getElementById("editReviewModal").style.display = "block";
}

function closeEditModal() {
    document.getElementById("editReviewModal").style.display = "none";
}

document.querySelector(".close").onclick = closeEditModal;

let modal = document.getElementById("editReviewModal");
modal.querySelector(".close").onclick = function() {
    modal.style.display = "none";
};

document.getElementById("editReviewForm").onsubmit = async function(event) {
    event.preventDefault();

    let updatedTitle = document.getElementById("editTitle").value;
    let updatedDate = document.getElementById("editDate").value;
    let updatedMedium = document.getElementById("editMedium").value;
    let updatedRating = document.getElementById("editRating").value;
    let updatedReview = document.getElementById("editReview").value;

    let encodedData = "title=" + encodeURIComponent(updatedTitle);
    encodedData += "&date=" + encodeURIComponent(updatedDate);
    encodedData += "&medium=" + encodeURIComponent(updatedMedium);
    encodedData += "&rating=" + encodeURIComponent(updatedRating);
    encodedData += "&review=" + encodeURIComponent(updatedReview);

    fetch(`apiURL/reviews/${currentReviewId}` ,
        {
            method: "PUT", 
            body: encodedData,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(function(response){
            console.log("Review edited", response);
        }) 
}

async function deleteReview(id) {
    console.log("review id: ", id)
    fetch(`${apiURL}/reviews/${id}` ,
        {
            method: "DELETE", 
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(function(response){
            console.log("Review deleted", response);
        }) 
}


window.onload = function() {
    loadMediaFromServer();
    closeEditModal();
};

submitButton.onclick = addNewReview;