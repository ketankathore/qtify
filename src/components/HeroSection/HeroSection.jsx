import headphones from '../../assets/headphones.svg';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="heroSection">
      <div className="heroCopy">
        <p className="heroBadge">Fresh beats for every mood</p>
        <h1>Discover music that speaks to your soul.</h1>
        <p className="heroDescription">
          QTify curates trending albums, songs, and playlists so your next favorite track is always just a tap away.
        </p>
        <div className="heroMeta">
          <span>100+ curated tracks</span>
          <span>New releases daily</span>
        </div>
      </div>
      <div className="heroVisual">
        <img src={headphones} alt="QTify headphones illustration" className="heroImage" />
      </div>
    </section>
  );
};

export default HeroSection;
