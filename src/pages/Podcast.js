import React from 'react';
import { usePodcasts } from '../hooks/useMedia';
import PodcastItem from '../components/PodcastItem';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/style.css';

const Podcast = () => {
  const { podcasts, loading, error } = usePodcasts();

  return (
    <main className="main-content">
      <div className="podcast-content">
        <div className="page-header">
          <h2>Podcast</h2>
          <p>Listen to my latest podcast episodes and interviews</p>
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
            <p><strong>Error loading podcasts:</strong> {error}</p>
            <p style={{ marginTop: '10px', fontSize: '0.9em' }}>
              Please check your API configuration and ensure the MongoDB API is running.
            </p>
            <p style={{ marginTop: '10px', fontSize: '0.9em' }}>
              <strong>Debug:</strong> Check <a href="http://localhost:3001/api/debug" target="_blank" rel="noopener noreferrer" style={{ color: '#c33', textDecoration: 'underline' }}>http://localhost:3001/api/debug</a> for database structure information.
            </p>
          </div>
        )}
        
        {!loading && !error && podcasts.length === 0 && (
          <div style={{
            padding: '40px',
            textAlign: 'center',
            color: '#999'
          }}>
            <p>No podcasts available yet. Check back soon!</p>
          </div>
        )}
        
        {!loading && !error && podcasts.length > 0 && (
          <div className="media-grid">
            {podcasts.map((podcast) => (
              <PodcastItem key={podcast._id || podcast.id} podcast={podcast} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Podcast;

