// API 服务层
import { getApiUrl } from '../config/config';

/**
 * 从 MongoDB API 获取 Podcast 列表
 */
export const fetchPodcasts = async () => {
  try {
    const response = await fetch(getApiUrl('/podcasts'));
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    // Handle different response formats
    // If response is an array, return it directly
    if (Array.isArray(data)) {
      return data;
    }
    
    // If response has a 'data' field (from debug response), return that
    if (data.data && Array.isArray(data.data)) {
      return data.data;
    }
    
    // If response has debug info, log it
    if (data.message || data.debug) {
      console.warn('API response warning:', data.message, data.debug);
    }
    
    // Return empty array as fallback
    return [];
  } catch (error) {
    console.error('Error fetching podcasts:', error);
    throw error;
  }
};

/**
 * 从 MongoDB API 获取单个 Podcast
 */
export const fetchPodcastById = async (id) => {
  try {
    const response = await fetch(getApiUrl(`/podcasts/${id}`));
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching podcast:', error);
    throw error;
  }
};

/**
 * 从 MongoDB API 获取 Video 列表
 */
export const fetchVideos = async () => {
  try {
    const response = await fetch(getApiUrl('/videos'));
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    // Handle different response formats
    // If response is an array, return it directly
    if (Array.isArray(data)) {
      return data;
    }
    
    // If response has a 'data' field (from debug response), return that
    if (data.data && Array.isArray(data.data)) {
      return data.data;
    }
    
    // If response has debug info, log it
    if (data.message || data.debug) {
      console.warn('API response warning:', data.message, data.debug);
    }
    
    // Return empty array as fallback
    return [];
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
};

/**
 * 从 MongoDB API 获取单个 Video
 */
export const fetchVideoById = async (id) => {
  try {
    const response = await fetch(getApiUrl(`/videos/${id}`));
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching video:', error);
    throw error;
  }
};

/**
 * 提交联系表单
 */
export const submitContactForm = async (formData) => {
  try {
    const url = getApiUrl('/contact');
    console.log('Submitting contact form to:', url);
    console.log('Form data:', formData);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Error response:', errorData);
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    // 如果是网络错误，提供更友好的错误信息
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      throw new Error('Unable to connect to server. Please make sure the backend server is running on http://localhost:3001');
    }
    throw error;
  }
};

/**
 * 通用 API 请求函数
 */
const apiRequest = async (endpoint, options = {}) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(getApiUrl(endpoint), config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API request error for ${endpoint}:`, error);
    throw error;
  }
};

export default apiRequest;

