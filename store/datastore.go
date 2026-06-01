package store

import (
	"example/web-service-gin/models"
	"sync"
)

var (
	Users    = []models.User{}
	Posts    = []models.Post{}
	Comments = []models.Comment{}

	UserCounter    = 1
	PostCounter    = 1
	CommentCounter = 1

	Mu sync.Mutex
)
