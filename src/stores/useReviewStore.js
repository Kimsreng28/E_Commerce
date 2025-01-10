import { defineStore } from "pinia";

export const useReviewStore = defineStore("review", {
  state: () => ({
    reviews: [],
  }),
  getters: {
    recentReviews(state) {
      // Filter reviews to show only those within the last 2 days
      return state.reviews.filter((review) => {
        const reviewDate = new Date(review.date);
        const diffInDays = (new Date() - reviewDate) / (1000 * 60 * 60 * 24);
        return diffInDays <= 2;
      });
    },
  },
  actions: {
    loadReviews() {
      const savedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
      console.log("Loaded reviews from localStorage:", savedReviews);
      this.reviews = savedReviews.map((review) => ({
        ...review,
        date: new Date(review.date), // Convert date back to a Date object
      }));
      console.log("Reviews after loading:", this.reviews); // Debugging line
    },

    saveReviews() {
      localStorage.setItem("reviews", JSON.stringify(this.reviews));
    },

    addReview(productId, comment, rating, image = null) {
      if (!comment || rating < 1 || rating > 5) {
        throw new Error("Invalid comment or rating.");
      }

      const newReview = {
        id: Date.now(), // Assign a unique id to the review
        productId,
        comment,
        rating,
        image: image || null, // Allow the image field to be null if not provided
        date: new Date().toISOString(),
      };
      this.reviews.push(newReview);
      this.saveReviews();
    },

    updateReview(reviewId, updatedReview) {
      const index = this.reviews.findIndex((review) => review.id === reviewId);
      if (index !== -1) {
        this.reviews[index] = { ...this.reviews[index], ...updatedReview };
        this.saveReviews();
      } else {
        throw new Error("Review not found.");
      }
    },

    deleteReview(reviewId) {
      this.reviews = this.reviews.filter((review) => review.id !== reviewId);
      this.saveReviews();
    },
  },
});
