import { Menu, Music2, Volume2, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type VideoOption = {
  label: string;
  url: string;
};

const videos: VideoOption[] = [
  {
    label: 'Golden Hour',
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081127_0992a171-d3c6-4978-8213-0ec5df8b6d63.mp4',
  },
  {
    label: 'Still Water',
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_092026_dd05b805-ea0f-40b2-8c52-332b88502592.mp4',
  },
  {
    label: 'Deep Woods',
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081042_df7202bf-bd80-4b2b-bbc6-1f09ba2870e9.mp4',
  },
  {
    label: 'Quiet Dawn',
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_080959_4cac5234-3573-464e-a5b7-76b94b8a7d61.mp4',
  },
];

const navLinks = ['Features', 'Community'];
const stats = [
  '60+ Deep Sessions',
  '12,000+ Creators',
  '4.8 User Satisfaction',
  'Intentional-First Design',
];

const overlayImage =
  'https://soft-zoom-63098134.figma.site/_assets/v11/0b4a435b2df2747593c43d7a1c9b4578f7d8d90c.png';
const bgmSource = './audio/bgm.mp3';
const brandLabel = '\u6b22\u8fce';
const heroTitle = '\u5f20\u5bff\u4e30\u4e2a\u4eba\u7f51\u7ad9';

const toAnchor = (text: string) => text.toLowerCase().replace(/\s+/g, '-');

export default function App() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [activeVideo, setActiveVideo] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [audioBlocked, setAudioBlocked] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const currentVideo = videos[activeVideo];
  const isDeepWoods = activeVideo === 2;
  const heroTone = isDeepWoods ? 'text-[#182C41]' : 'text-white';

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.volume = 0.32;

    setAudioBlocked(true);
  }, []);

  const switchVideo = (index: number) => {
    if (index === activeVideo || isTransitioning) {
      return;
    }

    setActiveVideo(index);
    setIsTransitioning(true);
    window.setTimeout(() => setIsTransitioning(false), 1000);
  };

  const playAudio = () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio
      .play()
      .then(() => {
        setAudioPlaying(true);
        setAudioBlocked(false);
      })
      .catch(() => {
        setAudioBlocked(true);
      });
  };

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-black">
      <audio ref={audioRef} src={bgmSource} loop preload="none" />

      <div className="absolute inset-0 z-0">
        <video
          key={currentVideo.label}
          className="absolute inset-0 h-full w-full object-cover"
          src={currentVideo.url}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>

      <img
        className="train-bob pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover"
        src={overlayImage}
        alt=""
        aria-hidden="true"
      />

      <div className="relative z-[2] flex h-full flex-col px-4 py-4 sm:px-8 sm:py-6 lg:px-12">
        <nav className="flex items-center justify-between">
          <a className="text-xl italic text-white sm:text-2xl" href="/" aria-label={brandLabel}>
            {brandLabel}
          </a>

          <div className="liquid-glass hidden items-center gap-1 rounded-full px-2 py-2 md:flex">
            {navLinks.map((link) => (
              <a
                className="rounded-full px-4 py-2 text-sm text-white/90 transition hover:text-white"
                href={`#${toAnchor(link)}`}
                key={link}
                style={{ fontFamily: 'system-ui, sans-serif' }}
              >
                {link}
              </a>
            ))}
            <a
              className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#182C41] transition hover:bg-white/90"
              href="#early-access"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              Get Started
            </a>
          </div>

          <button
            className="liquid-glass relative flex h-11 w-11 items-center justify-center rounded-full text-white md:hidden"
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Menu
              className={`absolute transition duration-300 ${
                menuOpen ? 'rotate-90 scale-75 opacity-0' : 'rotate-0 scale-100 opacity-100'
              }`}
              size={21}
              aria-hidden="true"
            />
            <X
              className={`absolute transition duration-300 ${
                menuOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-75 opacity-0'
              }`}
              size={21}
              aria-hidden="true"
            />
          </button>
        </nav>

        <div
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 px-6 text-center backdrop-blur-sm transition duration-500 md:hidden ${
            menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1)' }}
        >
          <button
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full text-white"
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <X size={24} aria-hidden="true" />
          </button>

          <div className="flex flex-col gap-6">
            {navLinks.map((link, index) => (
              <a
                className={`text-3xl text-white transition duration-500 ${
                  menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                href={`#${toAnchor(link)}`}
                key={link}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  transitionDelay: `${100 + index * 50}ms`,
                  transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1)',
                }}
              >
                {link}
              </a>
            ))}
          </div>

          <a
            className={`mt-12 rounded-full bg-white px-8 py-3 text-base font-semibold text-[#182C41] transition duration-500 ${
              menuOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
            }`}
            href="#early-access"
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: 'system-ui, sans-serif',
              transitionDelay: '300ms',
              transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1)',
            }}
          >
            Get Started
          </a>
        </div>

        <div className="flex flex-1 items-center justify-center py-3 sm:py-8">
          <div
            className={`mx-auto flex w-full max-w-4xl flex-col items-center text-center transition-colors duration-700 ${heroTone}`}
          >
            <div
              className="liquid-glass mb-4 rounded-full px-3 py-1.5 text-xs sm:mb-6 sm:px-4 sm:py-2 sm:text-sm"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              Over 10,000 minds already finding their clarity
            </div>

            <h1 className="max-w-4xl text-[2.75rem] leading-[1.02] sm:text-5xl sm:leading-[1.1] md:text-7xl lg:text-[5.5rem]">
              {heroTitle}
            </h1>

            <p
              className="mt-4 max-w-[20rem] text-xs leading-6 opacity-85 sm:mt-6 sm:max-w-xl sm:text-base sm:leading-relaxed"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              Rise above the chaos of pings, infinite scrolling, and relentless demands. Discover
              how to protect your presence and create with intention.
            </p>

            <form
              id="early-access"
              className="liquid-glass mt-5 flex w-full max-w-[310px] flex-col gap-2 rounded-[28px] p-2 sm:mt-8 sm:max-w-sm sm:flex-row sm:rounded-full"
              onSubmit={(event) => event.preventDefault()}
            >
              <input
                className="min-h-10 flex-1 rounded-full bg-transparent px-4 text-sm outline-none placeholder:text-current placeholder:opacity-70 sm:min-h-11"
                type="email"
                placeholder="Your Best Email"
                aria-label="Your best email"
                style={{ fontFamily: 'system-ui, sans-serif' }}
              />
              <button
                className="min-h-10 rounded-full bg-white px-5 text-sm font-semibold text-[#182C41] transition hover:bg-white/90 sm:min-h-11"
                type="submit"
                style={{ fontFamily: 'system-ui, sans-serif' }}
              >
                Get Early Access
              </button>
            </form>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:mt-8 sm:gap-5">
              {videos.map((video, index) => (
                <button
                  className={`border-b-2 px-1 pb-1.5 text-[11px] transition sm:pb-2 sm:text-sm ${
                    activeVideo === index
                      ? 'border-current opacity-100'
                      : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                  type="button"
                  key={video.label}
                  onClick={() => switchVideo(index)}
                  disabled={isTransitioning}
                  style={{ fontFamily: 'system-ui, sans-serif' }}
                >
                  {video.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div
          className="hidden flex-wrap items-center justify-center gap-3 pb-1 text-xs text-white/70 sm:flex sm:gap-4 sm:text-sm"
          style={{ fontFamily: 'system-ui, sans-serif' }}
        >
          {stats.map((stat, index) => (
            <div className="flex items-center gap-3 sm:gap-4" key={stat}>
              <span>{stat}</span>
              {index < stats.length - 1 ? (
                <span className="hidden text-white/35 sm:inline">|</span>
              ) : null}
            </div>
          ))}
        </div>

        <button
          className={`liquid-glass fixed bottom-4 right-4 z-40 flex min-h-10 items-center gap-2 rounded-full px-3 text-xs text-white transition sm:bottom-5 sm:right-5 sm:min-h-11 sm:px-4 sm:text-sm ${
            audioBlocked || audioPlaying ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
          type="button"
          onClick={playAudio}
          style={{ fontFamily: 'system-ui, sans-serif' }}
          aria-label={audioPlaying ? 'Background music playing' : 'Play background music'}
        >
          {audioPlaying ? (
            <Volume2 size={17} aria-hidden="true" />
          ) : (
            <Music2 size={17} aria-hidden="true" />
          )}
          {audioPlaying ? 'BGM playing' : 'Play BGM'}
        </button>
      </div>
    </section>
  );
}
