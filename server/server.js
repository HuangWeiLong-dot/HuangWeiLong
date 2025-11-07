/**
 * Backend API Server for Personal Website
 * 
 * This server provides REST API endpoints to fetch media metadata from MongoDB
 * 
 * Setup:
 * 1. Install dependencies: npm install
 * 2. Create .env file with MongoDB connection string
 * 3. Run: npm start (or npm run dev for development)
 */

require('dotenv').config();
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME || 'Assets'; // Database name is Assets
const PODCASTS_COLLECTION = 'podcasts'; // podcasts collection
const VIDEOS_COLLECTION = 'videos'; // videos collection

if (!MONGODB_URI) {
  console.error('❌ Error: MONGODB_URI is not defined in environment variables');
  console.error('💡 Please create a .env file in the server/ directory with MONGODB_URI');
  process.exit(1);
}

// Configure MongoDB client with Server API version for Atlas
const client = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Connect to MongoDB
let db;
let isConnected = false;

(async () => {
  try {
    await client.connect();
    db = client.db(DB_NAME);
    isConnected = true;
    console.log('✅ Connected to MongoDB');
    console.log(`📊 Database: ${DB_NAME}`);
    console.log(`📁 Collections: ${PODCASTS_COLLECTION}, ${VIDEOS_COLLECTION}`);
    console.log(`🔗 Connection: ${MONGODB_URI.includes('mongodb+srv') ? 'MongoDB Atlas' : 'Local MongoDB'}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.error('\n📝 Connection troubleshooting:');
    console.error('   1. Check your MONGODB_URI in server/.env file');
    console.error('   2. For MongoDB Atlas, the format should be:');
    console.error('      mongodb+srv://username:password@cluster.xxxxx.mongodb.net/database?retryWrites=true&w=majority');
    console.error('   3. Important: Replace <db_password> with your actual database password!');
    console.error('   4. Make sure:');
    console.error('      - Replace <db_password> placeholder with your actual password');
    console.error('      - Add database name in the connection string (after .net/ and before ?)');
    console.error('        Example: ...mongodb.net/personal-website?retryWrites=true&w=majority');
    console.error('      - Or set DB_NAME environment variable if database name is not in the connection string');
    console.error('      - Password special characters need URL encoding (@ → %40, # → %23, etc.)');
    console.error('      - Your IP address is whitelisted in MongoDB Atlas Network Access');
      console.error('   5. Example connection string:');
      console.error('      mongodb+srv://huangweilong:yourpassword@media-assets.tpjoure.mongodb.net/Assets?retryWrites=true&w=majority&appName=Media-Assets');
    console.error('\n💡 Current MONGODB_URI format check:');
    if (MONGODB_URI.includes('mongodb+srv://')) {
      const match = MONGODB_URI.match(/mongodb\+srv:\/\/([^:]+):([^@]+)@([^/\?]+)/);
      if (match) {
        console.error(`   - Username: ${match[1]}`);
        const passwordDisplay = match[2] === '<db_password>' || match[2].includes('password') 
          ? match[2] + ' (⚠️  Please replace with actual password!)' 
          : '*'.repeat(match[2].length);
        console.error(`   - Password: ${passwordDisplay}`);
        console.error(`   - Cluster: ${match[3]}`);
        
        // Check if password placeholder is still there
        if (match[2] === '<db_password>' || match[2].includes('password')) {
          console.error(`   ⚠️  ERROR: You need to replace <db_password> with your actual database password!`);
        }
        
        // Check if database name is in the connection string
        const dbMatch = MONGODB_URI.match(/@[^/]+\/([^?]+)/);
        if (!dbMatch || dbMatch[1].trim() === '') {
          console.error('   ⚠️  Warning: Database name not found in connection string');
        console.error('   💡 Add database name after cluster address: ...mongodb.net/Assets?...');
        console.error('   💡 Database name should be "Assets" (capital A)');
        console.error('   💡 Or set DB_NAME environment variable to "Assets"');
        }
        
        // Validate cluster format
        if (!match[3].includes('.mongodb.net')) {
          console.error(`   ⚠️  Warning: Cluster address "${match[3]}" doesn't look like a valid Atlas cluster`);
        } else {
          console.error(`   ✅ Cluster address format looks correct`);
        }
      } else {
        console.error(`   ⚠️  Could not parse connection string format`);
      }
    }
    // Don't exit - allow server to start and show error messages to API calls
    isConnected = false;
  }
})();

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'API server is running',
    database: {
      connected: isConnected,
      name: DB_NAME,
      collections: [PODCASTS_COLLECTION, VIDEOS_COLLECTION]
    }
  });
});

// Debug endpoint to check database structure
app.get('/api/debug', async (req, res) => {
  if (!isConnected || !db) {
    return res.status(503).json({ 
      error: 'Database not connected',
      message: 'MongoDB connection is not available.'
    });
  }
  
  try {
    // Get collection stats
    const stats = await db.stats();
    
    // Check if collections exist
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    
    // Get counts from each collection
    let podcastsCount = 0;
    let videosCount = 0;
    let samplePodcast = null;
    let sampleVideo = null;
    
    if (collectionNames.includes('podcasts')) {
      const podcastsCollection = db.collection('podcasts');
      podcastsCount = await podcastsCollection.countDocuments({});
      samplePodcast = await podcastsCollection.findOne({});
    }
    
    if (collectionNames.includes('videos')) {
      const videosCollection = db.collection('videos');
      videosCount = await videosCollection.countDocuments({});
      sampleVideo = await videosCollection.findOne({});
    }
    
    const debugInfo = {
      connection: {
        database: DB_NAME,
        connected: isConnected
      },
      stats: {
        databaseSize: stats.dataSize,
        totalCollections: stats.collections
      },
      collections: {
        all: collectionNames,
        hasPodcastsCollection: collectionNames.includes('podcasts'),
        hasVideosCollection: collectionNames.includes('videos'),
        podcastsCount: podcastsCount,
        videosCount: videosCount
      },
      sampleDocuments: {
        podcast: samplePodcast ? {
          _id: samplePodcast._id,
          keys: Object.keys(samplePodcast),
          fieldTypes: Object.keys(samplePodcast).reduce((acc, key) => {
            if (key !== '_id') {
              acc[key] = {
                type: typeof samplePodcast[key],
                isArray: Array.isArray(samplePodcast[key]),
                value: typeof samplePodcast[key] === 'string' && samplePodcast[key].length > 50 ? 
                       samplePodcast[key].substring(0, 50) + '...' : 
                       samplePodcast[key]
              };
            }
            return acc;
          }, {})
        } : null,
        video: sampleVideo ? {
          _id: sampleVideo._id,
          keys: Object.keys(sampleVideo),
          fieldTypes: Object.keys(sampleVideo).reduce((acc, key) => {
            if (key !== '_id') {
              acc[key] = {
                type: typeof sampleVideo[key],
                isArray: Array.isArray(sampleVideo[key]),
                value: typeof sampleVideo[key] === 'string' && sampleVideo[key].length > 50 ? 
                       sampleVideo[key].substring(0, 50) + '...' : 
                       sampleVideo[key]
              };
            }
            return acc;
          }, {})
        } : null
      },
      analysis: {
        structureType: 'separate-collections',
        recommendation: podcastsCount > 0 && videosCount > 0 ? 
                       'Data structure looks correct. Podcasts and videos are in separate collections.' :
                       podcastsCount === 0 && videosCount === 0 ?
                       'Both collections are empty. Please add data to podcasts and videos collections.' :
                       'One or both collections may be empty. Check your data.'
      }
    };
    
    res.json(debugInfo);
  } catch (error) {
    res.status(500).json({ 
      error: 'Debug error', 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Get all podcasts
app.get('/api/podcasts', async (req, res) => {
  if (!isConnected || !db) {
    return res.status(503).json({ 
      error: 'Database not connected', 
      message: 'MongoDB connection is not available. Please check your connection string in server/.env file.' 
    });
  }
  try {
    const collection = db.collection(PODCASTS_COLLECTION);
    const docCount = await collection.countDocuments({});
    console.log(`📊 Podcasts collection document count: ${docCount}`);
    
    // Get all podcasts from the podcasts collection
    const podcasts = await collection
      .find({})
      .toArray();
    
    console.log(`🎙️  Found ${podcasts.length} podcasts`);
    
    // Sort by date (newest first) if date field exists
    if (podcasts.length > 0) {
      podcasts.sort((a, b) => {
        try {
          // Handle different date formats
          const dateA = a.date ? new Date(a.date) : new Date(0);
          const dateB = b.date ? new Date(b.date) : new Date(0);
          return dateB - dateA; // Newest first
        } catch (e) {
          return 0; // If date parsing fails, maintain order
        }
      });
    }
    
    console.log(`✅ Returning ${podcasts.length} podcasts`);
    res.json(podcasts);
  } catch (error) {
    console.error('Error fetching podcasts:', error);
    res.status(500).json({ error: 'Failed to fetch podcasts', message: error.message });
  }
});

// Get single podcast by ID
app.get('/api/podcasts/:id', async (req, res) => {
  if (!isConnected || !db) {
    return res.status(503).json({ 
      error: 'Database not connected', 
      message: 'MongoDB connection is not available. Please check your connection string in server/.env file.' 
    });
  }
  try {
    const { id } = req.params;
    const collection = db.collection(PODCASTS_COLLECTION);
    const { ObjectId } = require('mongodb');
    
    let query;
    try {
      query = { _id: new ObjectId(id) };
    } catch (e) {
      query = { _id: id };
    }
    
    const podcast = await collection.findOne(query);
    if (!podcast) {
      return res.status(404).json({ error: 'Podcast not found' });
    }
    
    res.json(podcast);
  } catch (error) {
    console.error('Error fetching podcast:', error);
    res.status(500).json({ error: 'Failed to fetch podcast', message: error.message });
  }
});

// Get all videos
app.get('/api/videos', async (req, res) => {
  if (!isConnected || !db) {
    return res.status(503).json({ 
      error: 'Database not connected', 
      message: 'MongoDB connection is not available. Please check your connection string in server/.env file.' 
    });
  }
  try {
    const collection = db.collection(VIDEOS_COLLECTION);
    const docCount = await collection.countDocuments({});
    console.log(`📊 Videos collection document count: ${docCount}`);
    
    // Get all videos from the videos collection
    const videos = await collection
      .find({})
      .toArray();
    
    console.log(`🎥 Found ${videos.length} videos`);
    
    // Sort by date (newest first) if date field exists
    if (videos.length > 0) {
      videos.sort((a, b) => {
        try {
          // Handle different date formats
          const dateA = a.date ? new Date(a.date) : new Date(0);
          const dateB = b.date ? new Date(b.date) : new Date(0);
          return dateB - dateA; // Newest first
        } catch (e) {
          return 0; // If date parsing fails, maintain order
        }
      });
    }
    
    console.log(`✅ Returning ${videos.length} videos`);
    res.json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ error: 'Failed to fetch videos', message: error.message });
  }
});

// Get single video by ID
app.get('/api/videos/:id', async (req, res) => {
  if (!isConnected || !db) {
    return res.status(503).json({ 
      error: 'Database not connected', 
      message: 'MongoDB connection is not available. Please check your connection string in server/.env file.' 
    });
  }
  try {
    const { id } = req.params;
    const collection = db.collection(VIDEOS_COLLECTION);
    const { ObjectId } = require('mongodb');
    
    let query;
    try {
      query = { _id: new ObjectId(id) };
    } catch (e) {
      query = { _id: id };
    }
    
    const video = await collection.findOne(query);
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }
    
    res.json(video);
  } catch (error) {
    console.error('Error fetching video:', error);
    res.status(500).json({ error: 'Failed to fetch video', message: error.message });
  }
});

// Submit contact form
app.post('/api/contact', async (req, res) => {
  if (!isConnected || !db) {
    return res.status(503).json({ 
      error: 'Database not connected', 
      message: 'MongoDB connection is not available. Please check your connection string in server/.env file.' 
    });
  }
  
  try {
    const { name, email, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Validation error', 
        message: 'Name, email, and message are required fields.' 
      });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Validation error', 
        message: 'Invalid email format.' 
      });
    }
    
    // Create message document
    const messageDoc = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      createdAt: new Date(),
      read: false
    };
    
    // Save to MongoDB
    // 存储位置: Assets 数据库 -> messages 集合
    const messagesCollection = db.collection('messages');
    const result = await messagesCollection.insertOne(messageDoc);
    
    console.log(`✅ New contact message received from ${name} (${email})`);
    console.log(`📝 Message saved to MongoDB: Assets.messages (ID: ${result.insertedId})`);
    
    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully!',
      id: result.insertedId
    });
    
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ 
      error: 'Failed to submit message', 
      message: error.message 
    });
  }
});

// Get all messages (for viewing contact form submissions)
app.get('/api/messages', async (req, res) => {
  if (!isConnected || !db) {
    return res.status(503).json({ 
      error: 'Database not connected', 
      message: 'MongoDB connection is not available.' 
    });
  }
  
  try {
    const messagesCollection = db.collection('messages');
    const { read, limit = 50, skip = 0 } = req.query;
    
    // Build query
    let query = {};
    if (read !== undefined) {
      query.read = read === 'true';
    }
    
    // Get messages
    const messages = await messagesCollection
      .find(query)
      .sort({ createdAt: -1 }) // Newest first
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .toArray();
    
    // Get total count
    const totalCount = await messagesCollection.countDocuments(query);
    
    res.json({
      messages,
      total: totalCount,
      limit: parseInt(limit),
      skip: parseInt(skip)
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ 
      error: 'Failed to fetch messages', 
      message: error.message 
    });
  }
});

// Get single message by ID
app.get('/api/messages/:id', async (req, res) => {
  if (!isConnected || !db) {
    return res.status(503).json({ 
      error: 'Database not connected', 
      message: 'MongoDB connection is not available.' 
    });
  }
  
  try {
    const { id } = req.params;
    const messagesCollection = db.collection('messages');
    const { ObjectId } = require('mongodb');
    
    let query;
    try {
      query = { _id: new ObjectId(id) };
    } catch (e) {
      query = { _id: id };
    }
    
    const message = await messagesCollection.findOne(query);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    
    res.json(message);
  } catch (error) {
    console.error('Error fetching message:', error);
    res.status(500).json({ 
      error: 'Failed to fetch message', 
      message: error.message 
    });
  }
});

// Mark message as read
app.put('/api/messages/:id/read', async (req, res) => {
  if (!isConnected || !db) {
    return res.status(503).json({ 
      error: 'Database not connected', 
      message: 'MongoDB connection is not available.' 
    });
  }
  
  try {
    const { id } = req.params;
    const { read = true } = req.body;
    const messagesCollection = db.collection('messages');
    const { ObjectId } = require('mongodb');
    
    let query;
    try {
      query = { _id: new ObjectId(id) };
    } catch (e) {
      query = { _id: id };
    }
    
    const result = await messagesCollection.updateOne(
      query,
      { $set: { read: read } }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Message not found' });
    }
    
    res.json({ 
      success: true, 
      message: `Message marked as ${read ? 'read' : 'unread'}` 
    });
  } catch (error) {
    console.error('Error updating message:', error);
    res.status(500).json({ 
      error: 'Failed to update message', 
      message: error.message 
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 API server running on http://localhost:${PORT}`);
  console.log('📡 Available endpoints:');
  console.log('   GET  /api/health - Health check');
  console.log('   GET  /api/debug - Database debug info');
  console.log('   GET  /api/podcasts - Get all podcasts');
  console.log('   GET  /api/podcasts/:id - Get single podcast');
  console.log('   GET  /api/videos - Get all videos');
  console.log('   GET  /api/videos/:id - Get single video');
  console.log('   POST /api/contact - Submit contact form');
  console.log('   GET  /api/messages - Get all messages (query: ?read=true/false&limit=50&skip=0)');
  console.log('   GET  /api/messages/:id - Get single message');
  console.log('   PUT  /api/messages/:id/read - Mark message as read/unread');
  if (!isConnected) {
    console.log('⚠️  Warning: MongoDB is not connected. API endpoints will return 503 errors.');
    console.log('📝 To connect to MongoDB Atlas:');
    console.log('   1. Create a .env file in the server/ directory');
    console.log('   2. Add: MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority');
    console.log('   3. Replace username, password, cluster, and database with your values');
  }
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n⚠️  Shutting down server...');
  await client.close();
  console.log('✅ MongoDB connection closed');
  process.exit(0);
});

