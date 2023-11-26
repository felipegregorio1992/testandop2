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
    <div key={video._id} style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '10px', borderRadius: '8px' }}>
      <h3 style={{ marginBottom: '10px' }}>{video.nome}</h3>
      <video width="400" height="360" controls style={{ maxWidth: '100%' }}>
        <source src={video.link} type="video/mp4" />
        Seu navegador não suporta o elemento de vídeo.
      </video>
    </div>
  ))}
</div>



  );
};

export default VideoList;
