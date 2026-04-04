import NavBar from '../components/public/NavBar';
import HeroSection from '../components/public/HeroSection';
import LeadershipSection from '../components/public/LeadershipSection';
import GallerySection from '../components/public/GallerySection';
import OpusDeiSection from '../components/public/OpusDeiSection';
import Footer from '../components/public/Footer';

export default function PublicHomePage() {
  return (
    <>
      <NavBar />
      <HeroSection />
      <LeadershipSection />
      <OpusDeiSection />
      <Footer />
    </>
  );
}
