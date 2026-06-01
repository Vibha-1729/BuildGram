# BuildGram 📸

A RESTful Instagram-like API built with **Go** and the **Gin** web framework. BuildGram simulates the core features of a social media photo-sharing platform — users, posts, likes, and comments.

All data is stored **in-memory** (no database) using Go slices, protected against race conditions with a `sync.Mutex`. The server also includes a custom request logger middleware that prints each request's method, path, and response time in microseconds.

---

## How to Run

### Prerequisites
- [Go 1.22+](https://go.dev/dl/)
- Git

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/Vibha-1729/BuildGram.git
cd BuildGram

# 2. Install dependencies
go mod tidy

# 3. Start the server
go run main.go
```

The server starts at **`http://localhost:8080`**

You'll see Gin's startup output, and the custom logger will print each request like:
```
[BuildGram] POST /api/v1/users | 312.50µs
```

---

## Project Structure

```
BuildGram/
├── main.go        # Entry point — router setup, route registration, middleware, server start
├── models/        # Data structs: User, Post, Comment
├── store/         # In-memory "database" — global slices, counters, and sync.Mutex
├── go.mod         # Module definition and Gin dependency
└── go.sum         # Auto-generated dependency checksums (do not edit)
```

---

## API Reference

All routes are prefixed with `/api/v1`. The server runs on `localhost:8080`.

All responses return JSON with a `status` field (`"success"` or `"error"`) and a `data` or `message` field.

### Users

| Method | Path | Description | Required Body Fields |
|--------|------|-------------|----------------------|
| `POST` | `/api/v1/users` | Create a new user | `username`, `email` |
| `GET` | `/api/v1/users/:id` | Get a user by ID | — |

**Create a user**
```bash
curl.exe http://localhost:8080/api/v1/users --header "Content-Type: application/json" --request "POST" --data '{\"username\": \"ankit_123\", \"email\": \"ankit@example.com\"}'
```

**Get a user**
```bash
curl.exe http://localhost:8080/api/v1/users/1
```

---

### Posts

| Method | Path | Description | Required Body Fields |
|--------|------|-------------|----------------------|
| `POST` | `/api/v1/posts` | Create a new post | `userID`, `imageURL` |
| `GET` | `/api/v1/posts` | Get all posts | — |
| `GET` | `/api/v1/posts/:id` | Get a post with its comments | — |

**Create a post**
```bash
curl.exe http://localhost:8080/api/v1/posts --header "Content-Type: application/json" --request "POST" --data '{\"userID\": 1, \"imageURL\": \"https://example.com/ankit_personal.jpg\", \"caption\": \"Ankit s Personal Photo\"}'
func createPost(c *gin.Context) {
```

**Get all posts**
```bash
curl.exe http://localhost:8080/api/v1/posts  --header "Content-Type: application/json" --request "GET"
```

**Get a post with comments**
```bash
curl.exe http://localhost:8080/api/v1/posts/1
```

---

### Engagement

| Method | Path | Description | Required Body Fields |
|--------|------|-------------|----------------------|
| `POST` | `/api/v1/posts/:id/like` | Like a post | — |
| `POST` | `/api/v1/posts/:id/comments` | Add a comment to a post | `userID`, `text` |

**Like a post**
```bash
curl.exe http://localhost:8080/api/v1/posts/1/like --request "POST"
```

**Add a comment**
```bash
curl.exe http://localhost:8080/api/v1/posts/1/comments --header "Content-Type: application/json" --request "POST" --data '{\"userID\": 2, \"text\": \"This is stunning!\"}'
```
