// 配置文件
export const config = {
  // GitHub Repository 配置
  github: {
    username: process.env.REACT_APP_GITHUB_USERNAME || 'YOUR_GITHUB_USERNAME',
    repo: process.env.REACT_APP_GITHUB_REPO || 'YOUR_REPO_NAME',
    branch: process.env.REACT_APP_GITHUB_BRANCH || 'main',
    // jsDelivr CDN 基础URL格式
    // https://cdn.jsdelivr.net/gh/{username}/{repo}@{branch}/{path}
    getCdnUrl: (path) => {
      const { username, repo, branch } = config.github;
      
      // 清理路径：移除前导斜杠，确保路径格式正确
      const cleanPath = path ? path.replace(/^\/+/, '') : '';
      
      if (!cleanPath) {
        return '';
      }
      
      const url = `https://cdn.jsdelivr.net/gh/${username}/${repo}@${branch}/${cleanPath}`;
      return url;
    }
  },
  
  // MongoDB API 配置
  api: {
    // 使用环境变量配置 API 基础URL
    // 可以是自己的后端API，或 MongoDB Atlas Data API，或 MongoDB Realm Functions
    baseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api',
    endpoints: {
      podcasts: '/podcasts',
      videos: '/videos'
    }
  }
};

// jsDelivr CDN 辅助函数
export const getJsDelivrUrl = (filePath) => {
  return config.github.getCdnUrl(filePath);
};

// 获取完整的 API URL
export const getApiUrl = (endpoint) => {
  return `${config.api.baseUrl}${endpoint}`;
};

