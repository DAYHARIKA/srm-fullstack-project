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


My backend URL: `(https://bfhl-backend-api-cr9z.onrender.com/)`

My frontend URL : `(https://srm-fullstack-project.vercel.app/)`


