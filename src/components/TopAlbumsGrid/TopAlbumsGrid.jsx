import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from '../Card/Card';
import './TopAlbumsGrid.css';

const TopAlbumsGrid = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    axios
      .get('https://qtify-backend.labs.crio.do/albums/top')
      .then((response) => {
        if (!isMounted) {
          return;
        }

        const albumData = Array.isArray(response?.data) ? response.data : response?.data?.data ?? [];
        setAlbums(albumData);
      })
      .catch(() => {
        if (isMounted) {
          setError('Unable to load top albums right now.');
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <p className="topAlbumsStatus">Loading top albums...</p>;
  }

  if (error) {
    return <p className="topAlbumsStatus">{error}</p>;
  }

  if (!albums.length) {
    return <p className="topAlbumsStatus">No top albums are available right now.</p>;
  }

  return (
    <div className="topAlbumsGrid">
      {albums.map((album) => (
        <Card key={album.id} album={album} />
      ))}
    </div>
  );
};

export default TopAlbumsGrid;
