/**
 * AudioPlayer Component - Site Keren Rabbi Israel
 *
 * Lecteur audio pour les shiurim (enseignements audio)
 * Features:
 * - Play/Pause/Skip controls
 * - Timeline avec seeking
 * - Volume control
 * - Playback speed (0.75x - 1.5x)
 * - Download button
 * - Support RTL pour textes hébreux
 * - Responsive mobile/desktop
 */

import React, { useRef, useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Download
} from 'lucide-react';

export interface AudioPlayerProps {
  /** URL du fichier audio */
  audioUrl: string;
  /** Titre du shiur */
  title: string;
  /** Nom du rabbin (optionnel) */
  rabbi?: string;
  /** Callback appelé quand l'audio se termine */
  onEnded?: () => void;
  /** URL de téléchargement (optionnel, par défaut = audioUrl) */
  downloadUrl?: string;
}

/**
 * Formate un temps en secondes vers format MM:SS
 */
function formatTime(seconds: number): string {
  if (isNaN(seconds)) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export default function AudioPlayer({
  audioUrl,
  title,
  rabbi,
  onEnded,
  downloadUrl
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  // States
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Event handlers
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      if (onEnded) onEnded();
    };

    const handleError = () => {
      setIsLoading(false);
      console.error('Audio loading error');
    };

    // Attach listeners
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    // Cleanup
    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [audioUrl, onEnded]);

  // Play/Pause toggle
  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Skip backward 10 seconds
  const skipBackward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, audio.currentTime - 10);
  };

  // Skip forward 10 seconds
  const skipForward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(duration, audio.currentTime + 10);
  };

  // Seek to position
  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  // Volume control
  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newVolume = value[0];
    audio.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  // Toggle mute
  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume > 0 ? volume : 0.5;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  // Change playback speed
  const changeSpeed = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const speeds = [0.75, 1, 1.25, 1.5];
    const currentIndex = speeds.indexOf(playbackRate);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];

    audio.playbackRate = nextSpeed;
    setPlaybackRate(nextSpeed);
  };

  // Download handler
  const handleDownload = async () => {
    const url = downloadUrl || audioUrl;
    try {
      // Track download via API
      const shiurId = new URL(audioUrl).pathname.split('/').pop()?.split('.')[0];
      if (shiurId) {
        await fetch(`/api/shiurim/${shiurId}/download`, { method: 'POST' });
      }

      // Trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = `${title.replace(/[^a-z0-9]/gi, '_')}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download error:', error);
    }
  };

  return (
    <div className="w-full rounded-lg border bg-card p-4 shadow-sm">
      {/* Hidden audio element */}
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      {/* Title & Rabbi */}
      <div className="mb-4 text-center">
        <h3 className="font-semibold text-lg leading-tight">{title}</h3>
        {rabbi && (
          <p className="text-sm text-muted-foreground mt-1">{rabbi}</p>
        )}
      </div>

      {/* Timeline */}
      <div className="mb-4">
        <Slider
          value={[currentTime]}
          max={duration || 100}
          step={1}
          onValueChange={handleSeek}
          disabled={isLoading}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Main Controls */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <Button
          variant="outline"
          size="icon"
          onClick={skipBackward}
          disabled={isLoading}
          aria-label="Reculer 10 secondes"
        >
          <SkipBack className="h-4 w-4" />
        </Button>

        <Button
          variant="default"
          size="icon"
          onClick={togglePlayPause}
          disabled={isLoading}
          className="h-12 w-12"
          aria-label={isPlaying ? 'Pause' : 'Lecture'}
        >
          {isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" />
          )}
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={skipForward}
          disabled={isLoading}
          aria-label="Avancer 10 secondes"
        >
          <SkipForward className="h-4 w-4" />
        </Button>
      </div>

      {/* Secondary Controls */}
      <div className="flex items-center justify-between gap-4">
        {/* Volume Control */}
        <div className="flex items-center gap-2 flex-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            className="h-8 w-8"
            aria-label={isMuted ? 'Activer le son' : 'Couper le son'}
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>
          <Slider
            value={[isMuted ? 0 : volume]}
            max={1}
            step={0.1}
            onValueChange={handleVolumeChange}
            className="w-20 hidden sm:block"
            aria-label="Volume"
          />
        </div>

        {/* Playback Speed */}
        <Button
          variant="outline"
          size="sm"
          onClick={changeSpeed}
          disabled={isLoading}
          className="text-xs min-w-[60px]"
          aria-label="Vitesse de lecture"
        >
          {playbackRate}x
        </Button>

        {/* Download Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={handleDownload}
          className="h-8 w-8"
          aria-label="Télécharger"
        >
          <Download className="h-4 w-4" />
        </Button>
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="text-center text-sm text-muted-foreground mt-2">
          Chargement...
        </div>
      )}
    </div>
  );
}
