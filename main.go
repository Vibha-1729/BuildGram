package main

import (
	"fmt"
	"net/http"
	"strconv"
	"time"

	"example/web-service-gin/models"
	"example/web-service-gin/store"

	"github.com/gin-gonic/gin"
)

func RequestLogger() gin.HandlerFunc {
	return func(c *gin.Context) {
		// 1. Capture exact start time
		startTime := time.Now()

		// 2. Let the request finish running
		c.Next()

		// 3. Calculate exact elapsed time
		latency := time.Since(startTime)

		method := c.Request.Method
		path := c.Request.URL.Path

		// 4. Force Go to display the real time in microseconds (µs)
		// %.2f formats it as a precise decimal number
		latencyInMicroseconds := float64(latency.Nanoseconds()) / 1000.0

		fmt.Printf("[BuildGram] %s %s | %.2fµs\n", method, path, latencyInMicroseconds)
	}
}

func main() {
	router := gin.New()
	router.Use(RequestLogger())
	router.Use(gin.Recovery())

	// Create the v1 Router Group
	v1 := router.Group("/api/v1")
	{
		// User Routes
		v1.POST("/users", createUser)
		v1.GET("/users/:id", getUserByID) // We will build this next

		// Post Routes
		v1.POST("/posts", createPost)
		v1.GET("/posts", getAllPosts)
		v1.GET("/posts/:id", getPostWithComments)

		// Engagement Routes
		v1.POST("/posts/:id/like", likePost)
		v1.POST("/posts/:id/comments", addComment)
	}

	router.Run("localhost:8080")
}

// POST /api/v1/users
// curl.exe http://localhost:8080/api/v1/users --header "Content-Type: application/json" --request "POST" --data '{\"username\": \"ankit_123\", \"email\": \"ankit@example.com\"}'
func createUser(c *gin.Context) {
	var newUser models.User

	// Call BindJSON to bind the received JSON to
	// newUser.
	if err := c.BindJSON(&newUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  "error",
			"message": "Invalid input. Username and Email are required fields.",
		})
		return
	}

	// Safely generate a unique ID using our DataStore Mutex
	store.Mu.Lock()
	newUser.ID = store.UserCounter
	store.UserCounter++

	// Add the new user to the slice.
	store.Users = append(store.Users, newUser)
	store.Mu.Unlock()

	c.IndentedJSON(http.StatusCreated, gin.H{
		"status": "success",
		"data":   newUser,
	})
}

// GET /api/v1/users/:id
// curl.exe http://localhost:8080/api/v1/users/1
func getUserByID(c *gin.Context) {
	idStr := c.Param("id")
	id, _ := strconv.Atoi(idStr)
	// Loop over the list of users, looking for
	// a user whose ID value matches the parameter.
	for _, a := range store.Users {
		if a.ID == id {
			c.IndentedJSON(http.StatusOK, gin.H{
				"status": "success",
				"data":   a,
			})
			return
		}
	}
	c.IndentedJSON(http.StatusNotFound, gin.H{
		"status":  "error",
		"message": "user not found",
	})
}

// POST /api/v1/posts
// curl.exe http://localhost:8080/api/v1/posts --header "Content-Type: application/json" --request "POST" --data '{\"userID\": 1, \"imageURL\": \"https://example.com/ankit_personal.jpg\", \"caption\": \"Ankit s Personal Photo\"}'
func createPost(c *gin.Context) {
	var newPost models.Post

	// Call BindJSON to bind the received JSON to
	// newPost.
	if err := c.BindJSON(&newPost); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  "error",
			"message": "imageURL is required",
		})
		return
	}

	// Safely generate a unique ID using our DataStore Mutex
	store.Mu.Lock()
	newPost.ID = store.PostCounter
	store.PostCounter++
	newPost.Timestamp = time.Now()
	// Add the new post to the slice.

	store.Posts = append(store.Posts, newPost)
	store.Mu.Unlock()

	c.IndentedJSON(http.StatusCreated, gin.H{
		"status": "success",
		"data":   newPost,
	})
}

// GET /api/v1/posts
// curl.exe http://localhost:8080/api/v1/posts  --header "Content-Type: application/json" --request "GET"
func getAllPosts(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, gin.H{
		"status": "success",
		"data":   store.Posts,
	})
}

// GET /api/v1/posts/:id
// curl.exe http://localhost:8080/api/v1/posts/1
func getPostWithComments(c *gin.Context) {
	idStr := c.Param("id")
	id, _ := strconv.Atoi(idStr)

	var foundPost models.Post
	postFound := false

	for _, p := range store.Posts {
		if p.ID == id {
			foundPost = p
			postFound = true
			break
		}
	}

	// If the post doesn't exist, return a 404 error right away
	if !postFound {
		c.IndentedJSON(http.StatusNotFound, gin.H{
			"status":  "error",
			"message": "post not found",
		})
		return
	}

	var associatedComments []models.Comment
	for _, comp := range store.Comments {
		if comp.PostID == id {
			associatedComments = append(associatedComments, comp)
		}
	}

	c.IndentedJSON(http.StatusOK, gin.H{
		"status": "success",
		"data": gin.H{
			"post":     foundPost,
			"comments": associatedComments,
		},
	})

}

// POST /api/v1/posts/:id/like
// curl.exe http://localhost:8080/api/v1/posts/1/like --request "POST"
func likePost(c *gin.Context) {
	idStr := c.Param("id")
	id, _ := strconv.Atoi(idStr)

	var foundPost models.Post
	postFound := false

	store.Mu.Lock()
	for i, p := range store.Posts {
		if p.ID == id {
			store.Posts[i].LikesCount++
			foundPost = store.Posts[i]
			postFound = true
			break
		}
	}
	store.Mu.Unlock()

	// If the post doesn't exist, return a 404 error right away
	if !postFound {
		c.IndentedJSON(http.StatusNotFound, gin.H{
			"status":  "error",
			"message": "post not found",
		})
		return
	}

	c.IndentedJSON(http.StatusOK, gin.H{
		"status": "success",
		"data": gin.H{
			"id":        foundPost.ID,
			"likeCount": foundPost.LikesCount,
		},
	})
}

// POST /api/v1/posts/:id/comments
// curl.exe http://localhost:8080/api/v1/posts/1/comments --header "Content-Type: application/json" --request "POST" --data '{\"userID\": 2, \"text\": \"This is stunning!\"}'
func addComment(c *gin.Context) {
	// 1. Read the target Post ID directly out of the URL path parameter
	postIDStr := c.Param("id")
	postID, _ := strconv.Atoi(postIDStr)

	var newComment models.Comment

	// 2. Bind the incoming JSON request data (userID and text)
	if err := c.BindJSON(&newComment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  "error",
			"message": "userId & text is required",
		})
		return
	}

	// 3. Update the data tracking tags safely inside the Mutex
	store.Mu.Lock()

	// Assign the unique individual ID for THIS specific comment
	newComment.ID = store.CommentCounter
	store.CommentCounter++

	// Link this comment to the correct Post ID we grabbed from the URL path
	newComment.PostID = postID

	// Add the current real-world server time
	newComment.Timestamp = time.Now()

	// Append it directly to our global database comment slice
	store.Comments = append(store.Comments, newComment)
	store.Mu.Unlock()

	// 4. Return the newly created comment object
	c.IndentedJSON(http.StatusCreated, gin.H{
		"status": "success",
		"data":   newComment,
	})
}
