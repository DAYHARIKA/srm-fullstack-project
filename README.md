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
  "user_id": "KunamDayHarika_09072005",
  "email_id": "dayharika_kunam@srmap.edu.in",
  "college_roll_number": "AP231100011607",
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
6. **Deploy**

Your backend URL will be: `https://your-app.onrender.com`

### Frontend Deployment (Vercel)

1. **Go to [vercel.com](https://vercel.com)**
2. **Import your repository**
3. **Settings:**
   - **Root Directory**: `frontend`
   - **Framework Preset**: Create React App
   - **Environment Variables**:
     - `REACT_APP_API_URL` = `https://your-backend-url.onrender.com`
4. **Deploy**

Your frontend URL will be: `https://your-app.vercel.app`

## 🔧 Fixing "Failed to fetch" Error

The "Failed to fetch" error occurs when the frontend cannot connect to the backend. To fix:

1. **Get your Render backend URL** from your Render dashboard
2. **Add environment variable in Vercel:**
   - Go to your Vercel project → Settings → Environment Variables
   - Add: `REACT_APP_API_URL` = `https://your-backend-url.onrender.com`
   - Redeploy the frontend

3. **Alternative: Hardcode in App.js** (not recommended for production):
   - Open `frontend/src/App.js`
   - Line 26: Change `const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';`
   - To: `const API_URL = 'https://your-backend-url.onrender.com';`
   - Commit and push changes
