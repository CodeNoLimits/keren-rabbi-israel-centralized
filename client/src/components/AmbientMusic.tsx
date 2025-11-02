import { useState, useEffect, useRef } from 'react'
import { Music, Volume2, VolumeX } from 'lucide-react'
import { Button } from '@/components/ui/button'

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface AmbientMusicProps {
  playlist?: {
    id: string;
    title: string;
    videoId: string;
  }[];
}

export function AmbientMusic({ playlist }: AmbientMusicProps) {
  // Best practice: Check user preference first, don't auto-play without consent on first visit
  const [isPlaying, setIsPlaying] = useState(() => {
    const saved = localStorage.getItem('ambientMusic');
    if (saved) {
      return JSON.parse(saved);
    }
    // First visit: check if user has interacted with site (better UX)
    const hasInteracted = localStorage.getItem('hasUserInteracted');
    return hasInteracted ? true : false; // Only auto-play if user has interacted before
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Default playlist with Breslov ambient music
  const defaultPlaylist = playlist || [
    {
      id: '1',
      title: 'מוזיקת ברסלב',
      videoId: 'bQwnBS3VZdc' // Breslov ambient music
    },
    {
      id: '2',
      title: 'ניגוני ברסלב',
      videoId: 'fHWG0T7mJ7Y' // Alternative Breslov nigun
    }
  ];

  // Load YouTube IFrame API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        initializePlayer();
      };
    } else {
      initializePlayer();
    }
  }, []);

  const initializePlayer = () => {
    if (!containerRef.current) return;

    playerRef.current = new window.YT.Player('youtube-player', {
      height: '0',
      width: '0',
      videoId: defaultPlaylist[currentTrack].videoId,
      playerVars: {
        autoplay: isPlaying ? 1 : 0,
        loop: 1,
        playlist: defaultPlaylist[currentTrack].videoId,
        controls: 0,
        showinfo: 0,
        rel: 0,
        modestbranding: 1,
        playsinline: 1
      },
      events: {
        onReady: (event: any) => {
          setIsLoaded(true);
          if (isPlaying) {
            event.target.playVideo();
            // Set volume to 30% for ambient music
            event.target.setVolume(30);
          }
        },
        onStateChange: (event: any) => {
          if (event.data === window.YT.PlayerState.ENDED) {
            event.target.playVideo();
          }
        }
      }
    });
  };

  // Update localStorage when playing state changes
  useEffect(() => {
    localStorage.setItem('ambientMusic', JSON.stringify(isPlaying));
  }, [isPlaying]);

  // Control playback when isPlaying changes
  useEffect(() => {
    if (playerRef.current && isLoaded) {
      if (isPlaying) {
        playerRef.current.playVideo();
        playerRef.current.setVolume(30); // Keep volume at 30%
      } else {
        playerRef.current.pauseVideo();
      }
    }
  }, [isPlaying, isLoaded]);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
    // Mark that user has interacted with the site
    localStorage.setItem('hasUserInteracted', 'true');
  };

  const togglePlaylist = () => {
    setShowPlaylist(!showPlaylist);
  };

  const selectTrack = (index: number) => {
    setCurrentTrack(index);
    if (playerRef.current && isLoaded) {
      playerRef.current.loadVideoById(defaultPlaylist[index].videoId);
      playerRef.current.setVolume(30);
      if (isPlaying) {
        playerRef.current.playVideo();
      }
    }
    setShowPlaylist(false);
  };

  return (
    <>
      {/* Hidden YouTube Player */}
      <div 
        ref={containerRef}
        style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}
      >
        <div id="youtube-player"></div>
      </div>

      {/* Floating Music Control */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Playlist Options */}
        {showPlaylist && defaultPlaylist.length > 1 && (
          <div className="absolute bottom-16 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-[#1e40af] p-2 min-w-[200px]">
            <div className="text-sm font-medium mb-2 px-2 text-gray-700 dark:text-gray-300">
              בחירת מוזיקה
            </div>
            {defaultPlaylist.map((track, index) => (
              <button
                key={track.id}
                onClick={() => selectTrack(index)}
                className={`w-full text-right px-3 py-2 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-all ${
                  currentTrack === index 
                    ? 'bg-[#1e40af] text-white' 
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                <Music className="w-3 h-3 inline ml-2" />
                {track.title}
              </button>
            ))}
          </div>
        )}

        {/* Main Music Button */}
        <div className="flex items-center gap-2">
          {/* Playlist selector button */}
          {defaultPlaylist.length > 1 && (
            <Button
              onClick={togglePlaylist}
              size="sm"
              variant="outline"
              className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-[#1e40af] hover:bg-[#1e40af] hover:text-white"
              data-testid="button-playlist-selector"
            >
              <Music className="w-4 h-4" />
            </Button>
          )}

          {/* Main Play/Pause Button */}
          <Button
            onClick={toggleMusic}
            size="sm"
            aria-label={isPlaying ? 'Pause ambient music' : 'Play ambient music'}
            aria-pressed={isPlaying}
            className={`w-12 h-12 rounded-full shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:ring-offset-2 ${
              isPlaying 
                ? 'bg-gradient-to-r from-[#1e40af] to-[#1e3a8a] hover:from-[#1e3a8a] hover:to-[#1e40af] text-white border border-[#f97316]' 
                : 'bg-white dark:bg-gray-800 hover:bg-[#1e40af] hover:text-white text-gray-700 dark:text-gray-300 border border-[#1e40af]'
            }`}
            data-testid="button-ambient-music-toggle"
          >
            {isPlaying ? (
              <Volume2 className="w-5 h-5" />
            ) : (
              <VolumeX className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Status Indicator */}
        {isPlaying && (
          <div className="absolute -top-8 right-0 bg-gradient-to-r from-[#1e40af] to-[#1e3a8a] text-white text-xs px-2 py-1 rounded whitespace-nowrap shadow-lg border border-[#f97316]">
            🎵 {defaultPlaylist[currentTrack].title}
          </div>
        )}
      </div>
    </>
  );
}

