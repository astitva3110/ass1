
# Soical media

An api for social media




## Installation

Install Authentication Application with npm

1.First clone the Repository by pasting the command given below in the terminal.
```bash
  git clone https://github.com/astitva3110/ass1.git
```
 2.Set-up mongodb in pc 

## Running Tests

1.Register (POST)

```bash
  localhost:3000/auth/signup
```
```bash
{
    "username":"astitva rai",
    "email":"astitva16@gmail.com",
    "password":"12@Ajj"
}
```
Output
```bash

    {
    "username": "astitva rai",
    "email": "astitva16@gmail.com",
    "appName": "",
    "password": "$2b$10$FlC4LpVqv.8adnMMo9cVYeS1.j.zGLM/gOLqODJztdLK6IVSTkoCi",
    "post": [],
    "_id": "663bcaf99fb8415db9c9c63f",
    "createdAt": "2024-05-08T18:56:57.575Z",
    "updatedAt": "2024-05-08T18:56:57.575Z",
    "__v": 0

}

```
2.Login(post)
```bash
localhost:3000/auth/login
```
```bash
{
    "email":"astitva16@gmail.com",
    "password":"12@Ajj"
}
```
3.Create post(post)
```bash
localhost:3000/post/create/663b532761783da482940e30
```
```bash
{
 "text":"my new post"
 }
```
Output
```bash 
{
    "name": "663b532761783da482940e30",
    "text": "my new post",
    "likes": [],
    "_id": "663bc6937c27f5d0d26e5336",
    "createdAt": "2024-05-08T18:38:11.302Z",
    "updatedAt": "2024-05-08T18:38:11.302Z",
    "__v": 0
}
```

4.Update Post(put)
```bash
localhost:3000/post/update/663bc6937c27f5d0d26e5336
```
```bash 
{
    "newText":"updated Post",
    "userId":"663b532761783da482940e30"
}
```
Output
```bash
 {
    "message": "Post Is Updated",
    "Post": {
        "_id": "663bc6937c27f5d0d26e5336",
        "name": "663b532761783da482940e30",
        "text": "updated Post",
        "likes": [],
        "createdAt": "2024-05-08T18:38:11.302Z",
        "updatedAt": "2024-05-08T18:38:11.302Z",
        "__v": 0
    }
}
```

5.like(post)
```bash
localhost:3000/post/likePost/663bc6937c27f5d0d26e533
```
```bash
{
       "user_id":"663b532761783da482940e30"
}
```
Output
```bash
{
    "message": "post is liked",
    "Post": {
        "_id": "663bc6937c27f5d0d26e5336",
        "name": "663b532761783da482940e30",
        "text": "updated Post",
        "likes": [
            "663b532761783da482940e30"
        ],
        "createdAt": "2024-05-08T18:38:11.302Z",
        "updatedAt": "2024-05-08T18:38:40.401Z",
        "__v": 1
    }
}
```


4.Unlike(post)
```bash
localhost:3000/post/unlikePost/663bc6937c27f5d0d26e5336
```
```bash 
{
       "user_id":"663b532761783da482940e30"
}
```
Output
```bash
{
    "message": "post  is unliked",
    "Post": {
        "_id": "663bc6937c27f5d0d26e5336",
        "name": "663b532761783da482940e30",
        "text": "updated Post",
        "likes": [],
        "createdAt": "2024-05-08T18:38:11.302Z",
        "updatedAt": "2024-05-08T18:38:40.401Z",
        "__v": 1
    }
}
```
6.Comment(post)

```bash
  localhost:3000/comment/add/663bc6937c27f5d0d26e5336
```
```bash
  {
    "text":"First comment ",
    "user_id":"663b532761783da482940e30"
}
```

Output
```bash
{
    "messsge": "Comment is added",
    "newcomment": {
        "user": "663b532761783da482940e30",
        "post": "663bc6937c27f5d0d26e5336",
        "text": "First comment ",
        "likes": [],
        "_id": "663bc6c67c27f5d0d26e5342",
        "replies": [],
        "__v": 0
    }
}

```
7.Add replies (post)

```bash
  localhost:3000/comment/addReplies/663bc6c67c27f5d0d26e5342
```
```bash
  {
    "text":"First Repiles",
    "user_id":"663b532761783da482940e30"
}

```
Output

```bash
{
    "messsge": "Replies is added",
    "replie": {
        "text": "First Repiles",
        "user": "663b532761783da482940e30"
    }
}
```

Update Comment(put)
```bash
localhost:3000/comment/update/663bc6c67c27f5d0d26e5342
```
```bash
  {
    "text":"Update Comment",
    "user_id":"663b532761783da482940e30"
}

```
Output
```bash
{
    "message": "Comment is updated successfully",
    "comment": {
        "_id": "663bc6c67c27f5d0d26e5342",
        "user": "663b532761783da482940e30",
        "post": "663bc6937c27f5d0d26e5336",
        "text": "Update Comment",
        "likes": [],
        "replies": [
            {
                "user": "663b532761783da482940e30",
                "text": "First Repiles",
                "_id": "663bc6d67c27f5d0d26e5346"
            }
        ],
        "__v": 1
    }
}
```
## Features

- Unique App Name for Users
- JWT token is implemented.
- Replies and comment update feature is implemented  




