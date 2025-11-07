import React from 'react';
import { getJsDelivrUrl } from '../config/config';
import '../styles/style.css';

const VideoItem = ({ video }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const videoUrl = video.videoPath 
    ? getJsDelivrUrl(video.videoPath)
    : null;

  return (
    <div className="media-item">
      {video.thumbnailPath && (
        <div className="media-thumbnail">
          <img 
            src={getJsDelivrUrl(video.thumbnailPath)} 
            alt={video.title || 'Video thumbnail'}
          />
        </div>
      )}
      <div className="media-content">
        <h3>{video.title || 'Untitled Video'}</h3>
        {video.description && (
          <p>{video.description}</p>
        )}
        {video.date && (
          <div className="media-date">{formatDate(video.date)}</div>
        )}
        {videoUrl && (
          <video 
            controls 
            style={{ width: '100%', marginTop: '15px' }}
            preload="metadata"
            poster={video.thumbnailPath ? getJsDelivrUrl(video.thumbnailPath) : undefined}
          >
            <source src={videoUrl} type="video/mp4" />
            <source src={videoUrl} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  );
};

export default VideoItem;

