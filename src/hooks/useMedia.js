import { useState, useEffect } from 'react';
import { fetchPodcasts, fetchVideos } from '../services/api';

/**
 * 获取 Podcast 列表的 Hook
 */
export const usePodcasts = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPodcasts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPodcasts();
        setPodcasts(data);
      } catch (err) {
        setError(err.message);
        console.error('Error loading podcasts:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPodcasts();
  }, []);

  return { podcasts, loading, error };
};

/**
 * 获取 Video 列表的 Hook
 */
export const useVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchVideos();
        setVideos(data);
      } catch (err) {
        setError(err.message);
        console.error('Error loading videos:', err);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  return { videos, loading, error };
};

