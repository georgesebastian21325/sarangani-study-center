import NavBar from '../components/public/global/NavBar';
import HeroSection from '../components/public/home/HeroSection';
import LeadershipSection from '../components/public/home/LeadershipSection';
import OpusDeiSection from '../components/public/home/OpusDeiSection';
import Footer from '../components/public/global/Footer';

export default function PublicHomePage() {
  return (
    <>
      <NavBar />
      <HeroSection />
      <OpusDeiSection />
      <LeadershipSection />
      <Footer />
    </>
  );
}
