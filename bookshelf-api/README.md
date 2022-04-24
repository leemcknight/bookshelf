### bookshelf-api

## Overview
The api layer consists of AWS API Gateway endpoints supporting all backend operations for the Bookshelf application.
## Notes
The api is defined and deployed through the serverless framework (https://www.serverless.com/).  Api Gateway endpoints route to lambda functions which host a node backend.  User authentication is handled through a cognito authrorizer.

## Object Model

### profile
`profile` objects contain information about users, including name, display name (what others see), profile description, profile pictures, and so on.  

### settings
`settings` objects contain user preference and confiration properties set by the user.  These include color mode (light or dark), sharing preferences, and notification settings.

### library
Each user has one virtual library.  Libraries are named containers of bookshelves.  

### bookshelf
A bookshelf is a virtual collection of books.  A user can have many bookshelves, and a single book can be on multiple bookshelves.

### book