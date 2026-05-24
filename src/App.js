import './App.css';
import AlbumsSection from './components/AlbumsSection/AlbumsSection';
import HeroSection from './components/HeroSection/HeroSection';
import Navbar from './components/Navbar/Navbar';
import SongsSection from './components/SongsSection/SongsSection';

function App() {
  return (
    <div className="appShell">
      <Navbar />
      <HeroSection />
      <AlbumsSection
        title="Top Albums"
        endpoint="https://qtify-backend.labs.crio.do/albums/top"
        mode="carousel"
      />
      <AlbumsSection
        title="New Albums"
        endpoint="https://qtify-backend.labs.crio.do/albums/new"
        mode="carousel"
      />
      <SongsSection />
    </div>
  );
}

export default App;
