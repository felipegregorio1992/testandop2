// VideoList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://localhost:5001/buscarlives');
        setVideos(response.data);
      } catch (error) {
        console.error('Erro ao buscar vídeos', error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div>
      <h1>Lista de Vídeos</h1>
      {videos.map((video) => (
        <div key={video._id} style={{ margin: '20px' }}>
          <h3>{video.nome}</h3>
          <iframe
            width="560"
            height="315"
            src={video.link}
            title={video.nome}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
