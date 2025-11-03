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
  // Future: array of music options
  playlist?: {
    id: string;
    title: string;
    videoId: string;
  }[];
}

export function AmbientMusic({ playlist }: AmbientMusicProps) {
  const [isPlaying, setIsPlaying] = useState(() => {
    const saved = localStorage.getItem('ambientMusic');
    return saved ? JSON.parse(saved) : false;
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Default playlist with the provided YouTube video
  const defaultPlaylist = playlist || [
    {
      id: '1',
      title: 'Musique Ambiante',
      videoId: 'bQwnBS3VZdc' // Extracted from https://youtu.be/bQwnBS3VZdc?si=18OPaITtKW4n7R0s
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
        playlist: defaultPlaylist[currentTrack].videoId, // For looping
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
          }
        },
        onStateChange: (event: any) => {
          // Handle state changes
          if (event.data === window.YT.PlayerState.ENDED) {
            // Loop the video
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
      } else {
        playerRef.current.pauseVideo();
      }
    }
  }, [isPlaying, isLoaded]);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  const togglePlaylist = () => {
    setShowPlaylist(!showPlaylist);
  };

  const selectTrack = (index: number) => {
    setCurrentTrack(index);
    if (playerRef.current && isLoaded) {
      playerRef.current.loadVideoById(defaultPlaylist[index].videoId);
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
        {/* Playlist Options (Future Feature) */}
        {showPlaylist && defaultPlaylist.length > 1 && (
          <div className="absolute bottom-16 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg border p-2 min-w-[200px]">
            <div className="text-sm font-medium mb-2 px-2 text-gray-700 dark:text-gray-300">
              Choisir la musique
            </div>
            {defaultPlaylist.map((track, index) => (
              <button
                key={track.id}
                onClick={() => selectTrack(index)}
                className={`w-full text-left px-3 py-2 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  currentTrack === index 
                    ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                <Music className="w-3 h-3 inline mr-2" />
                {track.title}
              </button>
            ))}
          </div>
        )}

        {/* Main Music Button */}
        <div className="flex items-center gap-2">
          {/* Future: Playlist selector button */}
          {defaultPlaylist.length > 1 && (
            <Button
              onClick={togglePlaylist}
              size="sm"
              variant="outline"
              className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700"
              data-testid="button-playlist-selector"
            >
              <Music className="w-4 h-4" />
            </Button>
          )}

          {/* Main Play/Pause Button */}
          <Button
            onClick={toggleMusic}
            size="sm"
            className={`w-12 h-12 rounded-full shadow-lg transition-all ${
              isPlaying 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
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
          <div className="absolute -top-8 right-0 bg-black/75 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            🎵 {defaultPlaylist[currentTrack].title}
          </div>
        )}
      </div>
    </>
  );
}