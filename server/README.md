# Backend API Server

这是一个简单的 Express + MongoDB API 服务器，用于为个人网站提供媒体元数据。

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

在 `server/` 目录下创建 `.env` 文件并配置：

**对于 MongoDB Atlas (云数据库 - 推荐):**
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/personal-website?retryWrites=true&w=majority
DB_NAME=personal-website
PORT=3001
```

**对于本地 MongoDB:**
```env
MONGODB_URI=mongodb://localhost:27017
DB_NAME=personal-website
PORT=3001
```

📖 **详细设置指南**: 查看 `MONGODB_ATLAS_SETUP.md` 了解如何配置 MongoDB Atlas

### 3. 启动服务器

```bash
# 开发模式（自动重启）
npm run dev

# 生产模式
npm start
```

## API 端点

### Health Check
- `GET /api/health` - 检查服务器状态

### Podcasts
- `GET /api/podcasts` - 获取所有 podcast
- `GET /api/podcasts/:id` - 获取单个 podcast

### Videos
- `GET /api/videos` - 获取所有 video
- `GET /api/videos/:id` - 获取单个 video

## MongoDB 数据模型

### Podcast 文档

```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  date: Date,
  audioPath: String,        // 例如: "podcasts/episode-1.mp3"
  thumbnailPath: String,    // 例如: "podcasts/thumbnails/episode-1.jpg"
  duration: Number,         // 秒数
  tags: [String]
}
```

### Video 文档

```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  date: Date,
  videoPath: String,        // 例如: "videos/video-1.mp4"
  thumbnailPath: String,    // 例如: "videos/thumbnails/video-1.jpg"
  duration: Number,         // 秒数
  tags: [String]
}
```

## 示例数据插入

使用 MongoDB Compass 或 mongo shell 插入示例数据：

```javascript
// 连接到数据库
use personal-website

// 插入示例 Podcast
db.podcasts.insertOne({
  title: "My First Podcast",
  description: "This is my first podcast episode",
  date: new Date("2024-01-15"),
  audioPath: "podcasts/episode-1.mp3",
  thumbnailPath: "podcasts/thumbnails/episode-1.jpg",
  duration: 3600,
  tags: ["technology", "programming"]
})

// 插入示例 Video
db.videos.insertOne({
  title: "My First Video",
  description: "This is my first video",
  date: new Date("2024-01-15"),
  videoPath: "videos/video-1.mp4",
  thumbnailPath: "videos/thumbnails/video-1.jpg",
  duration: 1200,
  tags: ["tutorial", "react"]
})
```

## 部署

### 使用 MongoDB Atlas

1. 在 [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) 创建免费集群
2. 获取连接字符串
3. 更新 `.env` 文件中的 `MONGODB_URI`

### 部署到服务器

可以使用以下平台部署：
- Heroku
- Railway
- Render
- Vercel (需要 serverless functions)
- AWS EC2
- DigitalOcean

确保设置环境变量 `MONGODB_URI` 和 `DB_NAME`。

