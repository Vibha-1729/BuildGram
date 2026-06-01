package models

import "time"

// album represents data about a record album.
type User struct {
	ID       int    `json:"id"`
	Username string `json:"username" binding:"required"`
	Email    string `json:"email" binding:"required"`
	Bio      string `json:"bio,omitempty"`
}

type Post struct {
	ID         int       `json:"id"`
	UserID     int       `json:"userID" binding:"required"`
	ImageURL   string    `json:"imageURL" binding:"required"`
	Caption    string    `json:"caption" binding:"required"`
	Timestamp  time.Time `json:"timestamp" `
	LikesCount int       `json:"likesCount"`
}

type Comment struct {
	ID        int       `json:"id"`
	UserID    int       `json:"userid" binding:"required"`
	PostID    int       `json:"postid"`
	Text      string    `json:"text" binding:"required"`
	Timestamp time.Time `json:"timestamp"`
}
