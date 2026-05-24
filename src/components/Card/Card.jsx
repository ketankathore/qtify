import Chip from '@mui/material/Chip';
import './Card.css';

const getCount = (item, kind) => {
  if (kind === 'song') {
    return Number(item?.likes ?? 0);
  }

  return Number(item?.followers ?? item?.followCount ?? item?.follows ?? 0);
};

const getLabel = (count, kind) => {
  const formattedCount = count.toLocaleString();
  return kind === 'song' ? `${formattedCount} likes` : `${formattedCount} follows`;
};

const Card = ({ item, album, kind = 'album', showTitle = true }) => {
  const data = item ?? album;
  const count = getCount(data, kind);
  const title = showTitle ? data?.title || 'Untitled' : '';
  const altText = showTitle && data?.title ? `${data.title} cover` : 'Card cover';

  return (
    <article className="albumCard">
      <div className="albumMediaWrapper">
        <img
          src={data?.image}
          alt={altText}
          className="albumImage"
        />
        <div className="albumChipWrapper">
          <Chip
            label={getLabel(count, kind)}
            size="small"
            sx={{
              backgroundColor: '#111827',
              color: '#32ff8a',
              fontWeight: 700,
              borderRadius: '999px',
              px: 1,
              py: 0.5,
              height: 'auto',
              minHeight: 28,
            }}
          />
        </div>
      </div>
      <div className="albumDetails">
        {showTitle ? <h3>{title}</h3> : null}
      </div>
    </article>
  );
};

export default Card;
