# Managing Sessions Without External Packages

Yes, you can manage sessions in Express without using external packages like `express-session`. Here's how to implement basic session management using native Node.js/Express features:

## Implementation Approach

We'll use:
1. Cookies to store session IDs
2. A memory store for session data
3. Middleware to handle session creation/validation

Here's the modified code:

```javascript
const fsPromises = require('fs/promises')
const fs = require('fs')
const crypto = require('crypto')
const validations = require('./validations')
const express = require('express')
const app = express()

// Session storage (in-memory for this example - use Redis in production)
const sessions = {}

// Middleware setup
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: true }))

// Custom session middleware
app.use((req, res, next) => {
  // Generate or get session ID from cookie
  let sessionId = req.headers.cookie?.split('; ')
    .find(cookie => cookie.startsWith('sessionId='))
    ?.split('=')[1]
  
  if (!sessionId || !sessions[sessionId]) {
    // Create new session
    sessionId = crypto.randomBytes(16).toString('hex')
    sessions[sessionId] = {
      createdAt: Date.now(),
      data: {}
    }
    // Set cookie
    res.setHeader('Set-Cookie', `sessionId=${sessionId}; HttpOnly; Max-Age=${24 * 60 * 60}`)
  }
  
  // Attach session to request
  req.session = sessions[sessionId].data
  req.sessionId = sessionId
  
  next()
})

// Access logging middleware
app.use((req, res, next) => {
  const log = `REQUEST TIME: ${new Date()} :::: METHOD: ${req.method} :::: URL: ${req.url}\n`
  fs.appendFile('./access_logs.txt', log, 'utf8', (err) => {
    if (err) throw err;
  });
  next();
})

// Authentication middleware
const requireAuth = (req, res, next) => {
  if (req.session && req.session.user) {
    return next()
  }
  return res.status(401).json({ message: 'Unauthorized' })
}

/**
 * AUTH ROUTES
 */

// Register new user
app.post('/register', validations.registerUserRequest, async (req, res) => {
  try {
    const { username, password, email } = req.body
    const contents = await fsPromises.readFile('./database.json', { encoding: 'utf8' })
    const data = JSON.parse(contents)

    // Check if user already exists
    const userExists = data.users.some(user => user.username === username || user.email === email)
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // In a real app, you should hash the password
    // For simplicity, we're storing plaintext in this example
    // In production: const hashedPassword = await bcrypt.hash(password, 10)
    
    const newUser = {
      id: data.users.length + 1,
      username,
      email,
      password, // REMOVE THIS IN PRODUCTION - STORE ONLY HASHED PASSWORDS
      created_at: new Date(),
      deleted_at: null
    }

    data.users.push(newUser)
    await fsPromises.writeFile('./database.json', JSON.stringify(data))

    res.status(201).json({ message: 'User registered successfully' })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ message: 'Server error' })
  }
})

// Login user
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    const contents = await fsPromises.readFile('./database.json', { encoding: 'utf8' })
    const data = JSON.parse(contents)

    const user = data.users.find(user => user.username === username && !user.deleted_at)
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // In a real app, you would compare hashed passwords:
    // const passwordMatch = await bcrypt.compare(password, user.password)
    // For this example, we're doing plaintext comparison (NOT FOR PRODUCTION)
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Create session
    req.session.user = {
      id: user.id,
      username: user.username,
      email: user.email
    }

    res.json({ message: 'Logged in successfully', user: req.session.user })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ message: 'Server error' })
  }
})

// Logout user
app.post('/logout', requireAuth, (req, res) => {
  if (sessions[req.sessionId]) {
    delete sessions[req.sessionId]
  }
  res.setHeader('Set-Cookie', 'sessionId=; HttpOnly; expires=Thu, 01 Jan 1970 00:00:00 GMT')
  res.json({ message: 'Logged out successfully' })
})

// Get current user
app.get('/me', requireAuth, (req, res) => {
  res.json({ user: req.session.user })
})

/**
 * PROTECTED USER ROUTES
 */
// (Same as before, but now using our custom session system)
app.get('/users', requireAuth, async (req, res) => {
  /* ... existing implementation ... */
})

// ... other protected routes with requireAuth ...

// Session cleanup (optional)
setInterval(() => {
  const now = Date.now()
  for (const [sessionId, session] of Object.entries(sessions)) {
    // Expire sessions older than 24 hours
    if (now - session.createdAt > 24 * 60 * 60 * 1000) {
      delete sessions[sessionId]
    }
  }
}, 60 * 60 * 1000) // Run hourly

const PORT = 3000
app.listen(PORT, () => {
  console.log('Server started at', `http://localhost:${PORT}`)
})
```

## Key Components of This Implementation:

1. **Session Storage**:
   - Uses an in-memory object (`sessions`) to store session data
   - Each session has a unique ID and contains user data

2. **Session Middleware**:
   - Checks for existing session cookie
   - Creates new session if none exists
   - Attaches session data to the request object

3. **Cookie Management**:
   - Uses `Set-Cookie` header to manage session IDs
   - Implements HttpOnly cookies for security
   - Sets appropriate expiration

4. **Authentication Flow**:
   - Login sets user data in the session
   - Logout destroys the session
   - Protected routes check for valid sessions

## Important Security Notes:

1. **Password Handling**:
   - The example shows plaintext password storage for simplicity
   - In production, ALWAYS use password hashing (like bcrypt)

2. **Session Storage**:
   - In-memory storage is simple but not production-ready
   - For production, use a proper session store (Redis, database)

3. **Cookie Security**:
   - Add `Secure` flag if using HTTPS
   - Consider `SameSite` attributes for CSRF protection

4. **Session Expiration**:
   - Implemented both via cookie max-age and server-side cleanup

## Advantages of This Approach:

1. No external dependencies
2. Full control over session behavior
3. Lightweight implementation

## Disadvantages:

1. More manual work to implement security features
2. Lacks some conveniences of mature session packages
3. In-memory storage isn't suitable for production scaling

This implementation gives you the core session management functionality without external packages, while maintaining security best practices.