import { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import axios from 'axios';
import Card from '../Card/Card';
import Carousel from '../Carousel/Carousel';
import Section from '../Section/Section';
import './SongsSection.css';

const SongsSection = () => {
  const [songs, setSongs] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    Promise.all([
      axios.get('https://qtify-backend.labs.crio.do/songs'),
      axios.get('https://qtify-backend.labs.crio.do/genres'),
    ])
      .then(([songsResponse, genresResponse]) => {
        if (!isMounted) {
          return;
        }

        const songsData = Array.isArray(songsResponse?.data) ? songsResponse.data : [];
        const genresData = genresResponse?.data?.data ?? genresResponse?.data ?? [];

        setSongs(songsData);
        setGenres(genresData);
      })
      .catch(() => {
        if (isMounted) {
          setError('Unable to load songs right now.');
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

  const tabs = [{ key: 'all', label: 'All' }, ...genres];

  const filteredSongs =
    selectedGenre === 'all'
      ? songs
      : songs.filter((song) => song?.genre?.key === selectedGenre);

  const headerAction = (
    <Tabs
      value={selectedGenre}
      onChange={(_, value) => setSelectedGenre(value)}
      variant="scrollable"
      scrollButtons="auto"
      className="songsTabs"
      sx={{
        '& .MuiTabs-indicator': {
          backgroundColor: '#32ff8a',
        },
      }}
    >
      {tabs.map((tab) => (
        <Tab
          key={tab.key}
          value={tab.key}
          label={tab.label}
          className="songsTab"
        />
      ))}
    </Tabs>
  );

  return (
    <Section title="Songs" headerAction={headerAction}>
      {loading ? (
        <p className="sectionStatus">Loading songs...</p>
      ) : error ? (
        <p className="sectionStatus">{error}</p>
      ) : filteredSongs.length ? (
        <Carousel
          items={filteredSongs}
          showControls={false}
          renderItem={(song, isVisible) => <Card item={song} kind="song" showTitle={isVisible} />}
        />
      ) : (
        <p className="sectionStatus">No songs found for this genre.</p>
      )}
    </Section>
  );
};

export default SongsSection;
