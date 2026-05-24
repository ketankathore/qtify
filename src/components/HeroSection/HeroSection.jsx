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
        <div className="heroMediaCard">
          <p className="heroPromoText">100 Thousand Songs, ad-free</p>
          <img src={headphones} alt="QTify headphones illustration" className="heroImage" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
