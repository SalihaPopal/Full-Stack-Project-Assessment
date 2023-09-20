import React, { useState, useEffect } from 'react';
import AddVideoForm from './AddVideoForm';
import videosData from './videosData';
import VideoList from './VideoList';


function Handlers({ video, onUpVote, onDownVote, onDelete }) {
  const [videos, setVideos] = useState([]); 
  const [searchVideo, setSearchVideo] = useState("");

  useEffect(() => {
    const filtered = videosData.filter((video) =>  
    video.title.toLowerCase().includes(searchVideo.toLowerCase())
    );
    setVideos(filtered);
  },[searchVideo]);
  

  // const handleAddVideo = (newVideo, title, url, rating) => {
  //   setVideos((prevVideos) =>
  //     prevVideos.map((video) => {
  //       if (video.id === newVideo.id) { // Use === for comparison
  //         return {
  //           ...newVideo, 
  //           title: title, 
  //           url: url,     
  //           rating: videos.rating 
  //         };
  //       }
  //       return video;
  //     })
  //   );
  // };

  const handleAddVideo = async (newVideo, title, url, rating) => {
    // Simulate an async operation, like an API request
    try {
      const response = await fetch("https://full-stack-back-end.onrender.com/", {
        method: 'POST',
        body: JSON.stringify(newVideo),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Assuming the response contains the updated video data
        const updatedVideo = await response.json();

        setVideos((prevVideos) =>
          prevVideos.map((video) =>
            video.id === updatedVideo.id ? updatedVideo : video
          )
        );
      } else {
        // Handle the error condition
        console.error('Failed to add video:', response.status);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  

  const handleVote = (id, type) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) => {
        if (video.id === id) {
          return {
            ...video,
            rating: type === "up" ? video.rating + 1 : video.rating - 1,
          };
        }
        return video;
      })
    );
  };

  const handleDelete = (id) => {
    setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));
  };


  return (
    <div>  
      <div className='search-container'> 
      <label htmlFor='searchInput' className='searchInput'>Search video:
      <input
        type="text"
        name='search'
        id="searchInput"
        placeholder="Search for a video..."
        value={searchVideo}
        onChange={(e) => setSearchVideo(e.target.value)}
      />
      </label>
      </div>
      <AddVideoForm onAddVideo={handleAddVideo}/>
      <VideoList videos={videos} onVote={handleVote} onDelete={handleDelete} />
    </div>
  )
}

export default Handlers;

