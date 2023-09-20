import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

const VideoItem = ({ video, onDelete, onVote }) => {

  // const Id = video.url.split('v=')[1];

  let Id = '';

  const videoIdMatch = video.url.match(/(?:\?|&)v=([^&]+)/);
  if (videoIdMatch) {
    Id = videoIdMatch[1];
  }
  

  return (
    <Container>
    <div className="video-item">
      <div className='iframe'>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${Id}`}
        title="YouTube video player"
        // frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture web-share"
        allowFullScreen
      ></iframe>
      </div>

      <h5>{video.title}</h5>

      <div className='video-vote-container'>
      

      <i onClick={() => onVote(video.id, "up")} type="button" className="fa fa-thumbs-up" style={{ fontSize: '24px' }}></i>

      <h5 className='votes'>Rating: {video.rating}</h5>

      <i onClick={() => onVote(video.id, "down")} type="button" className="fa fa-thumbs-down" style={{ fontSize: '24px' }}>
      </i>
      

      <button
        onClick={() => onDelete(video.id)}
        type="button"
        className="btn btn-danger"
      >
        Delete
      </button>
      </div>
    </div>
    </Container>

  );
};

export default VideoItem;