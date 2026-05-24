import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../Card/Card';
import Carousel from '../Carousel/Carousel';
import './AlbumsSection.css';

const AlbumsSection = ({ title, endpoint, mode = 'grid' }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    axios
      .get(endpoint)
      .then((response) => {
        if (!isMounted) return;
        const data = Array.isArray(response?.data) ? response.data : response?.data?.data ?? [];
        setItems(data);
      })
      .catch(() => {
        if (isMounted) setError('Unable to load albums right now.');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [endpoint]);

  const renderItems = () => {
    if (loading) {
      return <p className="sectionStatus">Loading {title.toLowerCase()}...</p>;
    }

    if (error) {
      return <p className="sectionStatus">{error}</p>;
    }

    if (!items.length) {
      return <p className="sectionStatus">No albums are available right now.</p>;
    }

    if (mode === 'carousel' && !expanded) {
      return (
        <Carousel
          items={items}
          renderItem={(album, isVisible) => <Card album={album} showTitle={isVisible} />}
        />
      );
    }

    return (
      <div className="cardsGrid">
        {items.map((album) => (
          <Card key={album.id} album={album} />
        ))}
      </div>
    );
  };

  return (
    <section className="pageSection">
      <div className="sectionHeader">
        <h2>{title}</h2>
        <button
          type="button"
          className="collapseButton"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
          aria-label={expanded ? 'Show All' : 'Collapse'}
        >
          {expanded ? 'Collapse' : 'Show All'}
        </button>
      </div>
      {renderItems()}
    </section>
  );
};

export default AlbumsSection;
