<<<<<<< HEAD
# SRM Full Stack Engineering Challenge - BFHL API

A full-stack application that processes graph data to build tree hierarchies with cycle detection, built with Node.js, Express, and React.

## 🚀 Tech Stack

- **Backend**: Node.js + Express.js
- **Frontend**: React.js + CSS
- **API**: RESTful POST endpoint
- **Deployment**: Render (Backend) + Vercel (Frontend)

## 📁 Project Structure

```
bajaj_oa/
├── backend/
│   ├── server.js          # Express server with BFHL logic
│   ├── package.json       # Backend dependencies
│   └── .gitignore         # Backend gitignore
├── frontend/
│   ├── public/
│   │   └── index.html     # HTML template
│   ├── src/
│   │   ├── App.js         # React main component
│   │   ├── App.css        # Styling
│   │   ├── index.js       # React entry point
│   │   └── index.css      # Global styles
│   ├── package.json       # Frontend dependencies
│   └── .gitignore         # Frontend gitignore
└── README.md              # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js >= 18.0.0
- npm or yarn

### Local Development

#### 1. Clone the repository
```bash
git clone <repository-url>
cd bajaj_oa
```

#### 2. Backend Setup
```bash
cd backend
npm install
npm start
```
Backend will run on `http://localhost:5000`

#### 3. Frontend Setup (New Terminal)
```bash
cd frontend
npm install
npm start
```
Frontend will run on `http://localhost:3000`

## 📡 API Endpoint

### POST /bfhl

**Request Body:**
```json
{
  "data": ["A->B", "A->C", "B->D"]
}
```

**Response:**
```json
{
  "user_id": "john_doe_24042026",
  "email_id": "john.doe@srmist.edu.in",
  "college_roll_number": "RA2111003010001",
  "hierarchies": [
    {
      "root": "A",
      "tree": {
        "B": {
          "D": {}
        },
        "C": {}
      },
      "has_cycle": false,
      "depth": 3
    }
  ],
  "invalid_entries": [],
  "duplicate_edges": [],
  "summary": {
    "total_trees": 1,
    "total_cycles": 0,
    "largest_tree_root": "A"
  }
}
```

## 🧪 Test Examples

### Valid Input
```json
{
  "data": ["A->B", "A->C", "B->D", "D->E", "F->G"]
}
```

### Invalid Entries (will be filtered)
```json
{
  "data": ["hello", "1->2", "AB->C", "A-B", "A->", "A->A", ""]
}
```

### Duplicate Edges
```json
{
  "data": ["A->B", "A->B", "A->B"]
}
```

### Cycle Detection
```json
{
  "data": ["A->B", "B->C", "C->A"]
}
```

## 🌐 Deployment

### Backend Deployment (Render)

1. **Push code to GitHub**
2. **Go to [render.com](https://render.com)**
3. **Create new Web Service**
4. **Connect your GitHub repository**
5. **Settings:**
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Environment Variables**: 
     - `PORT`: 8080 (or any available port)
6. **Deploy**

Your backend URL will be: `https://your-app.onrender.com`

### Frontend Deployment (Vercel)

1. **Update API URL in frontend/src/App.js**
   - Change `http://localhost:5000/bfhl` to your deployed backend URL
   - Example: `https://your-app.onrender.com/bfhl`

2. **Push changes to GitHub**

3. **Go to [vercel.com](https://vercel.com)**
4. **Import your repository**
5. **Settings:**
   - **Root Directory**: `frontend`
   - **Framework Preset**: Create React App
6. **Deploy**

Your frontend URL will be: `https://your-app.vercel.app`

### Environment Variables (Optional)

Create `.env` file in backend directory:
```
PORT=5000
NODE_ENV=production
```

## 📝 Features

### Backend Logic
- ✅ Validates entries (format: X->Y where X,Y are uppercase letters A-Z)
- ✅ Handles duplicate edges (stores once)
- ✅ Builds multiple independent trees
- ✅ Root detection (nodes never appearing as children)
- ✅ Cycle detection
- ✅ Depth calculation (longest root-to-leaf path)
- ✅ Summary statistics
- ✅ CORS enabled
- ✅ Response under 3 seconds

### Frontend Features
- ✅ Beautiful modern UI with dark theme
- ✅ Textarea input for JSON data
- ✅ Sample example button
- ✅ Loading spinner
- ✅ Pretty result cards
- ✅ Tree visualization
- ✅ Error handling
- ✅ Responsive design
- ✅ Copy JSON button
- ✅ Animations
- ✅ Clean typography

## 🔒 Security Notes

- Update `user_id`, `email_id`, and `college_roll_number` in `backend/server.js` with your actual details
- Never commit real credentials to GitHub
- Use environment variables for sensitive data

## 📊 Performance

- API response time: < 3 seconds
- Handles large datasets efficiently
- Optimized tree building algorithm

## 🐛 Troubleshooting

### Backend not starting
```bash
# Check if port 5000 is in use
# Change PORT in .env or use different port
PORT=5001 npm start
```

### Frontend can't connect to backend
- Ensure backend is running
- Check CORS settings
- Verify API URL in App.js

### Build errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📄 License

This project is for educational purposes.

## 👥 Author

SRM Full Stack Engineering Challenge Submission

---

**Note**: Update the user information in `backend/server.js` before deployment:
- `userId`: Your name_ddmmyyyy format
- `emailId`: Your email
- `collegeRollNumber`: Your roll number
=======
# srm-fullstack-project
SRM Full Stack Engineering Challenge submission built with Node.js, Express.js, and React.js. Includes REST API (/bfhl) for hierarchy processing, cycle detection, duplicate handling, and responsive frontend UI. Hosted using Render and Vercel.
>>>>>>> f12ffefc6ca49b790263335f027fb37537d9b04a
