const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SRM Backend API is Running");
});

// POST /bfhl endpoint
app.post('/bfhl', (req, res) => {
  const startTime = Date.now();
  
  try {
    const { data } = req.body;
    
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        error: "Invalid input. 'data' must be an array."
      });
    }

    // User information (to be updated with actual details)
    const userId = "KunamDayHarika_09072005";
    const emailId = "dayharika_kunam@srmap.edu.in";
    const collegeRollNumber = "AP231100011607";

    // Process the data
    const result = processGraphData(data);

    const response = {
      user_id: userId,
      email_id: emailId,
      college_roll_number: collegeRollNumber,
      hierarchies: result.hierarchies,
      invalid_entries: result.invalid_entries,
      duplicate_edges: result.duplicate_edges,
      summary: result.summary
    };

    const processingTime = Date.now() - startTime;
    if (processingTime > 3000) {
      console.warn(`Warning: Processing took ${processingTime}ms`);
    }

    res.json(response);
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

function processGraphData(data) {
  const validPattern = /^([A-Z])->([A-Z])$/;
  const invalidEntries = [];
  const validEdges = [];
  const edgeSet = new Set();
  const duplicateEdges = [];

  // Step 1: Validate entries and collect duplicates
  for (const entry of data) {
    const trimmed = typeof entry === 'string' ? entry.trim() : entry;
    
    if (typeof trimmed !== 'string') {
      invalidEntries.push(entry);
      continue;
    }

    const match = trimmed.match(validPattern);
    
    if (!match) {
      invalidEntries.push(entry);
      continue;
    }

    const parent = match[1];
    const child = match[2];

    // Check for self-loop
    if (parent === child) {
      invalidEntries.push(entry);
      continue;
    }

    const edgeKey = `${parent}->${child}`;
    
    if (edgeSet.has(edgeKey)) {
      if (!duplicateEdges.includes(edgeKey)) {
        duplicateEdges.push(edgeKey);
      }
    } else {
      edgeSet.add(edgeKey);
      validEdges.push({ parent, child });
    }
  }

  // Step 2: Build trees
  const hierarchies = [];
  const childSet = new Set();
  const parentMap = new Map();

  // Collect all children and track first parent for each child
  for (const edge of validEdges) {
    childSet.add(edge.child);
    
    if (!parentMap.has(edge.child)) {
      parentMap.set(edge.child, edge.parent);
    }
  }

  // Find roots (nodes that never appear as children)
  const allNodes = new Set();
  for (const edge of validEdges) {
    allNodes.add(edge.parent);
    allNodes.add(edge.child);
  }

  const roots = [...allNodes].filter(node => !childSet.has(node));

  // Build adjacency list
  const adjacency = new Map();
  for (const node of allNodes) {
    adjacency.set(node, []);
  }

  for (const edge of validEdges) {
    // Only add edge if this parent is the first encountered parent for this child
    if (parentMap.get(edge.child) === edge.parent) {
      adjacency.get(edge.parent).push(edge.child);
    }
  }

  // Process each root to build tree
  const processedNodes = new Set();
  let totalCycles = 0;
  const treeDepths = new Map();

  for (const root of roots) {
    if (processedNodes.has(root)) continue;

    const { tree, hasCycle, depth, visited } = buildTree(root, adjacency, new Set());
    
    if (hasCycle) {
      hierarchies.push({
        root: root,
        tree: {},
        has_cycle: true
      });
      totalCycles++;
    } else {
      hierarchies.push({
        root: root,
        tree: tree,
        has_cycle: false,
        depth: depth
      });
      treeDepths.set(root, depth);
    }

    visited.forEach(node => processedNodes.add(node));
  }

  // Handle remaining unprocessed nodes (cycles or disconnected components)
  for (const node of allNodes) {
    if (!processedNodes.has(node)) {
      const { tree, hasCycle, depth, visited } = buildTree(node, adjacency, new Set());
      
      if (hasCycle) {
        hierarchies.push({
          root: node,
          tree: {},
          has_cycle: true
        });
        totalCycles++;
      } else {
        hierarchies.push({
          root: node,
          tree: tree,
          has_cycle: false,
          depth: depth
        });
        treeDepths.set(node, depth);
      }

      visited.forEach(n => processedNodes.add(n));
    }
  }

  // Calculate summary
  const totalTrees = hierarchies.filter(h => !h.has_cycle).length;
  
  let largestTreeRoot = null;
  let maxDepth = 0;

  for (const [root, depth] of treeDepths) {
    if (depth > maxDepth || (depth === maxDepth && root < largestTreeRoot)) {
      maxDepth = depth;
      largestTreeRoot = root;
    }
  }

  const summary = {
    total_trees: totalTrees,
    total_cycles: totalCycles,
    largest_tree_root: largestTreeRoot
  };

  return {
    hierarchies,
    invalid_entries: invalidEntries,
    duplicate_edges: duplicateEdges,
    summary
  };
}

function buildTree(root, adjacency, visited) {
  if (visited.has(root)) {
    return { tree: {}, hasCycle: true, depth: 0, visited };
  }

  visited.add(root);

  const children = adjacency.get(root) || [];
  
  if (children.length === 0) {
    return { tree: {}, hasCycle: false, depth: 1, visited };
  }

  const tree = {};
  let maxChildDepth = 0;
  let hasCycle = false;

  for (const child of children) {
    const result = buildTree(child, adjacency, new Set([...visited]));
    
    if (result.hasCycle) {
      hasCycle = true;
    }
    
    tree[child] = result.tree;
    maxChildDepth = Math.max(maxChildDepth, result.depth);
  }

  return {
    tree,
    hasCycle,
    depth: maxChildDepth + 1,
    visited
  };
}

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
