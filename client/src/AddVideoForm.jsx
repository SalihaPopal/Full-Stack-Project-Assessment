import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
// import ReactPlayer from 'react-player';


const AddVideoForm = ({video, onAddVideo }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const methods = useForm()
  // const [success, setSuccess] = useState(false)

    const handleCancelVideo = () => {
    setTitle('');
    setUrl('');
    // setUrl('https://www.youtube.com/watch?v=LXb3EKWsInQ');
    setErrorMessage('');
  };

    const validateUrl = (url) => {
    // Simple validation for YouTube URLs
    return /^https?:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]+$/.test(url);
  };

  const handleAddVideo = (e) => {
    e.preventDefault();

    let errorMassage = '';

     if (title.trim() === '') {
      setErrorMessage('Please enter a title');
      return;
    }
     else if (!validateUrl(url)) {
      setErrorMessage('Please enter a valid YouTube URL');
      return;
    }

    if (errorMassage){
      setErrorMessage("errorMassage");
    } else {
    const newVideo = {
      id: Date.now(), // Generate a unique ID
      title: title,
      url: url,
      rating: video.rating,
    };
    handleCancelVideo();
    onAddVideo(newVideo);
    setTitle('');
    setUrl('');
    setErrorMessage('');
  };
} 
  return (
    <>
    <div className="add-video-form">
      <h5 className='addVideo'>Add Video</h5>

      <FormProvider {...methods}>
      <form onSubmit={handleAddVideo}>
          <div className='title'>
          <label>Title
          <input 
          type='text'
          name='title' 
          className='form-controls' 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder='Title' //required
                    validation={{
                      required: {
                        value: true,
                        message: 'required'
                      }}} />
          </label>
          {errorMessage && <p className='err-m' >{errorMessage}</p>}
          </div>

          <div className='url'>
          <label>URL
          <input 
          type='url' 
          name='url'
          className='form-controls' 
          value={url} 
          onChange={(e) => setUrl(e.target.value)} 
          placeholder='Url' // required
                    validation={{
                      required: {
                        value: true,
                        message: 'required'
                      }}}            
 />
          </label>
          </div>  

        <div className='cancel-add-btn'>
        <button className='btn btn-warning btn-md' type="submit" onClick={handleCancelVideo}>Cancel</button>
        <button className='btn btn-success btn-md' type="submit" onClick={handleAddVideo}>ADD</button>

        </div>
      </form>
      {/* <div className='youtube-box'>
      <ReactPlayer url={url} 
      className='video' controls />
      </div> */}
      
      </FormProvider>
      </div>
    </>
  );
};

export default AddVideoForm;



