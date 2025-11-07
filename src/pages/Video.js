import React from 'react';
import { useVideos } from '../hooks/useMedia';
import VideoItem from '../components/VideoItem';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/style.css';

const Video = () => {
  const { videos, loading, error } = useVideos();

  return (
    <main className="main-content">
      <div className="video-content">
        <div className="page-header">
          <h2>Video</h2>
          <p>Watch my latest videos and presentations</p>
        </div>
        
        {loading && <LoadingSpinner />}
        
        {error && (
          <div style={{
            padding: '20px',
            backgroundColor: '#fee',
            border: '1px solid #fcc',
            borderRadius: '5px',
            marginTop: '20px',
            color: '#c33'
          }}>
            <p><strong>Error loading videos:</strong> {error}</p>
            <p style={{ marginTop: '10px', fontSize: '0.9em' }}>
              Please check your API configuration and ensure the MongoDB API is running.
            </p>
          </div>
        )}
        
        {!loading && !error && videos.length === 0 && (
          <div style={{
            padding: '40px',
            textAlign: 'center',
            color: '#999'
          }}>
            <p>No videos available yet. Check back soon!</p>
          </div>
        )}
        
        {!loading && !error && videos.length > 0 && (
          <div className="media-grid">
            {videos.map((video) => (
              <VideoItem key={video._id || video.id} video={video} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Video;

