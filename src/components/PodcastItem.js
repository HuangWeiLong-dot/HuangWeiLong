import React from 'react';
import { getJsDelivrUrl } from '../config/config';
import '../styles/style.css';

const PodcastItem = ({ podcast }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      // Handle different date formats
      let date;
      if (typeof dateString === 'string' && dateString.includes('/')) {
        // Format: "2025/11/7"
        const parts = dateString.split('/');
        date = new Date(parts[0], parts[1] - 1, parts[2]);
      } else {
        date = new Date(dateString);
      }
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (e) {
      return dateString;
    }
  };

  const audioUrl = podcast.audioPath 
    ? getJsDelivrUrl(podcast.audioPath)
    : null;

  return (
    <div className="media-item">
      {podcast.thumbnailPath && (
        <div className="media-thumbnail">
          <img 
            src={getJsDelivrUrl(podcast.thumbnailPath)} 
            alt={podcast.title || 'Podcast thumbnail'}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}
      <div className="media-content">
        <h3>{podcast.title || 'Untitled Podcast'}</h3>
        {podcast.description && (
          <p>{podcast.description}</p>
        )}
        {podcast.date && (
          <div className="media-date">{formatDate(podcast.date)}</div>
        )}
        {podcast.duration && (
          <div className="media-duration" style={{ marginTop: '5px', color: '#666', fontSize: '0.9em' }}>
            Duration: {podcast.duration}
          </div>
        )}
        {audioUrl && (
          <audio 
            controls 
            style={{ width: '100%', marginTop: '15px' }}
            preload="metadata"
          >
            <source src={audioUrl} type="audio/mpeg" />
            <source src={audioUrl} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
    </div>
  );
};

export default PodcastItem;

