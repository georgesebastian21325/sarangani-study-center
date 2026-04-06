import heroImage from '../../../../public/hero-section.png';

export default function HeroSection() {
  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      {/* Hero Text — truly centered */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-6xl md:text-7xl font-extrabold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
          Sanctify Every Moment
        </h1>
        <p className="text-white/80 mt-6 text-xl md:text-2xl max-w-5xl tracking-wider">
          Every class, every circle, every shared meal is an opportunity to
          bring souls closer to God.
        </p>
        <div className="mt-4 w-64 h-0.5 bg-linear-to-r from-primary to-secondary rounded-full" />
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 inset-x-0 z-20 flex flex-col items-center gap-2">
        <span className="text-white/50 text-xs tracking-[0.2em] uppercase">
          Scroll
        </span>
        <div className="w-px h-10 bg-linear-to-b from-white/50 to-transparent" />
      </div>
    </div>
  );
}
