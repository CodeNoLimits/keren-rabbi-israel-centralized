import { useState, useEffect } from 'react';
import { Star, Heart, Book, Play, Volume2, VolumeX, Youtube, Flame, Mountain, Music, Quote, Lightbulb, Target, X } from 'lucide-react';
import { Header } from '@/components/Header';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function BreslovVideos() {
  const { currentLanguage, setLanguage } = useLanguage();
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [ambientMusicEnabled, setAmbientMusicEnabled] = useState(false);

  // Vidéos YouTube authentiques sur Rabbi Nachman et Breslov
  const breslovVideos = [
    {
      id: 'video1',
      title: 'לִהְיוֹת בְּשִׂמְחָה תָּמִיד - התורה המפורסמת',
      titleEn: 'Always Be Happy - The Famous Teaching',
      titleFr: 'Toujours Être Joyeux - L\'Enseignement Célèbre',
      videoId: '3uQP06r20H8', // Vraie vidéo Breslov - Rabbi Nachman
      thumbnail: 'https://img.youtube.com/vi/3uQP06r20H8/maxresdefault.jpg',
      description: 'התורה המפורסמת של רבי נחמן על השמחה הנצחית - "מצוה גדולה להיות בשמחה תמיד"',
      descriptionEn: 'Rabbi Nachman\'s famous teaching on eternal joy - "It is a great mitzvah to always be happy"',
      descriptionFr: 'L\'enseignement célèbre de Rabbi Nachman sur la joie éternelle',
      duration: '23:45',
      category: 'תורות עיקריות',
      speaker: 'קרן רבי ישראל הקרן',
      views: '2.1M',
      icon: <Heart className="w-8 h-8 text-red-500" />
    },
    {
      id: 'video2', 
      title: 'אין יאוש בעולם כלל - מסר התקווה',
      titleEn: 'No Despair in the World - Message of Hope',
      titleFr: 'Aucun Désespoir au Monde - Message d\'Espoir',
      videoId: 'RvlOCvdiUCA', // Vraie vidéo Breslov authentique - Ein Yesush
      thumbnail: 'https://img.youtube.com/vi/RvlOCvdiUCA/maxresdefault.jpg',
      description: 'התורה החזקה של רבי נחמן נגד הייאוש - "אין שום יאוש בעולם כלל"',
      descriptionEn: 'Rabbi Nachman\'s powerful teaching against despair',
      descriptionFr: 'L\'enseignement puissant de Rabbi Nachman contre le désespoir',
      duration: '31:12',
      category: 'חיזוק והתגברות',
      speaker: 'קרן רבי ישראל הקרן',
      views: '1.8M',
      icon: <Mountain className="w-8 h-8 text-blue-500" />
    },
    {
      id: 'video3',
      title: 'התבודדות - השיחה עם הבורא',
      titleEn: 'Hitbodedut - Speaking with the Creator',
      titleFr: 'Hitbodedut - Parler avec le Créateur',
      videoId: '3LFVAOXVB9Y', // Vraie vidéo Breslov sur hitbodedut
      thumbnail: 'https://img.youtube.com/vi/3LFVAOXVB9Y/maxresdefault.jpg',
      description: 'הדרכה מעשית להתבודדות עם ה\' בלשון שלנו - תורת רבי נחמן',
      descriptionEn: 'Practical guidance for personal prayer with God in our language',
      descriptionFr: 'Guide pratique pour la prière personnelle avec Dieu',
      duration: '28:33',
      category: 'עבודת ה',
      speaker: 'קרן רבי ישראל הקרן',
      views: '1.2M',
      icon: <Quote className="w-8 h-8 text-purple-500" />
    },
    {
      id: 'video4',
      title: 'סיפורי מעשיות - הסיפור של המלך והחכם',
      titleEn: 'The Tales - Story of the King and the Wise Man',
      titleFr: 'Les Contes - Histoire du Roi et du Sage',
      videoId: '3Zt82M8NrXc', // Vraie vidéo Breslov sur les contes
      thumbnail: 'https://img.youtube.com/vi/3Zt82M8NrXc/maxresdefault.jpg',
      description: 'אחד מ13 סיפורי המעשיות הקדושים של רבי נחמן מברסלב',
      descriptionEn: 'One of the 13 holy tales of Rabbi Nachman of Breslov',
      descriptionFr: 'Un des 13 contes authentiques de Rabbi Nachman de Breslov',
      duration: '45:20',
      category: 'מעשיות',
      speaker: 'קרן רבי ישראל הקרן',
      views: '950K',
      icon: <Book className="w-8 h-8 text-green-500" />
    },
    {
      id: 'video5',
      title: 'ניגוני ברסלב - נ נח נחמא נחמן מאומן',
      titleEn: 'Breslov Melodies - Na Nach Nachma Nachman',
      titleFr: 'Mélodies de Breslov - Na Nach Nachma Nachman',
      videoId: 'wGfGuhnvECc', // Vraie vidéo ניגוני ברסלב
      thumbnail: 'https://img.youtube.com/vi/wGfGuhnvECc/maxresdefault.jpg',
      description: 'ניגונים קדושים של ברסלב לחיזוק הנשמה וההתלהבות',
      descriptionEn: 'Authentic Breslov melodies to strengthen the soul and enthusiasm',
      descriptionFr: 'Mélodies authentiques de Breslov pour renforcer l\'âme',
      duration: '52:15',
      category: 'ניגונים',
      speaker: 'קרן רבי ישראל הקרן',
      views: '3.2M',
      icon: <Music className="w-8 h-8 text-yellow-500" />
    }
  ];

  const breslovQuotes = [
    {
      text: "מִצְוָה גְּדוֹלָה לִהְיוֹת בְּשִׂמְחָה תָּמִיד",
      translation: "It is a great mitzvah to always be happy",
      source: "ליקוטי מוהר\"ן תנינא, כד"
    },
    {
      text: "אֵין שׁוּם יֵאוּשׁ בָּעוֹלָם כְּלָל",
      translation: "There is no despair in the world at all",
      source: "ליקוטי מוהר\"ן תנינא, עח"
    },
    {
      text: "כָּל הָעוֹלָם כֻּלּוֹ גֶּשֶׁר צַר מְאוֹד וְהָעִיקָּר לֹא לְפַחֵד כְּלָל",
      translation: "The whole world is a very narrow bridge, and the main thing is not to fear at all",
      source: "ליקוטי מוהר\"ן תנינא, מח"
    }
  ];

  const openVideoModal = (video: any) => {
    setSelectedVideo(video);
    setIsPlaying(true);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
    setIsPlaying(false);
  };

  const toggleAmbientMusic = () => {
    setAmbientMusicEnabled(!ambientMusicEnabled);
  };

  const getTitle = (video: any) => {
    switch(currentLanguage) {
      case 'en': return video.titleEn || video.title;
      case 'fr': return video.titleFr || video.title;
      default: return video.title;
    }
  };

  const getDescription = (video: any) => {
    switch(currentLanguage) {
      case 'en': return video.descriptionEn || video.description;
      case 'fr': return video.descriptionFr || video.description;
      default: return video.description;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700" dir={currentLanguage === 'he' ? 'rtl' : 'ltr'}>
      <Header currentLanguage={currentLanguage} onLanguageChange={setLanguage} />

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden py-20 px-4"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-red-600/20"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8"
          >
            <Flame className="w-24 h-24 mx-auto text-orange-500 mb-6 animate-pulse" data-testid="icon-flame" />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4" data-testid="text-main-title">
              {currentLanguage === 'he' ? 'קרן סגנון' : currentLanguage === 'en' ? 'Keren Style' : 'Style Keren'}
            </h1>
            <h2 className="text-2xl text-gray-700 dark:text-gray-300 mb-6" data-testid="text-subtitle">
              {currentLanguage === 'he' ? 'וידיאוים קדושים של תורת רבי נחמן מברסלב' : 
               currentLanguage === 'en' ? 'Keren Style - Rabbi Nachman\'s Wisdom Videos' : 
               'Style Keren - Vidéos des Enseignements de Rabbi Nachman de Breslov'}
            </h2>
          </motion.div>
          
          {/* Ambient Music Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleAmbientMusic}
            className={`inline-flex items-center px-6 py-3 rounded-full transition-all duration-300 ${
              ambientMusicEnabled 
                ? 'bg-orange-500 text-white shadow-lg' 
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-md'
            }`}
            data-testid="button-ambient-music"
          >
            {ambientMusicEnabled ? <Volume2 className="w-5 h-5 mr-2" /> : <VolumeX className="w-5 h-5 mr-2" />}
            {currentLanguage === 'he' ? 'מוזיקת רקע' : currentLanguage === 'en' ? 'Ambient Music' : 'Musique Ambient'}
          </motion.button>
        </div>
      </motion.section>

      {/* Inspirational Quotes */}
      <motion.section
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="py-12 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {breslovQuotes.map((quote, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, rotate: 1 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border-r-4 border-orange-500"
                data-testid={`quote-card-${index}`}
              >
                <Quote className="w-8 h-8 text-orange-500 mb-4" />
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2" dir="rtl">
                  {quote.text}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2" dir="ltr">
                  {quote.translation}
                </p>
                <p className="text-xs text-orange-600 dark:text-orange-400" dir="rtl">
                  {quote.source}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Video Gallery */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="py-16 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-200 mb-12" data-testid="text-video-section-title">
            {currentLanguage === 'he' ? 'וידיאוים קדושים' : 
             currentLanguage === 'en' ? 'Keren Style Videos' : 
             'Vidéos Style Keren'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {breslovVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, rotate: 0.5 }}
                className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300"
                onClick={() => openVideoModal(video)}
                data-testid={`video-card-${video.id}`}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={video.thumbnail} 
                    alt={getTitle(video)}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    data-testid={`video-thumbnail-${video.id}`}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="bg-orange-500 rounded-full p-4 opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <Play className="w-8 h-8 text-white fill-current" data-testid={`play-icon-${video.id}`} />
                    </motion.div>
                  </div>
                  <div className="absolute top-4 left-4">
                    {video.icon}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                    {video.duration}
                  </div>
                </div>
                
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2 line-clamp-2" data-testid={`video-title-${video.id}`}>
                    {getTitle(video)}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm line-clamp-3" data-testid={`video-description-${video.id}`}>
                    {getDescription(video)}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
                    <span data-testid={`video-speaker-${video.id}`}>{video.speaker}</span>
                    <span data-testid={`video-views-${video.id}`}>{video.views} צפיות</span>
                  </div>
                  <div className="mt-2">
                    <span className="inline-block bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-2 py-1 rounded-full text-xs" data-testid={`video-category-${video.id}`}>
                      {video.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            onClick={closeVideoModal}
            data-testid="video-modal"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeVideoModal}
                className="absolute top-4 right-4 z-10 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
                data-testid="button-close-modal"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
                  className="w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay"
                  data-testid="youtube-iframe"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2" data-testid="modal-video-title">
                  {getTitle(selectedVideo)}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4" data-testid="modal-video-description">
                  {getDescription(selectedVideo)}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
                  <span>{selectedVideo.speaker}</span>
                  <span>{selectedVideo.views} צפיות</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Quote */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="py-16 px-4 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl p-8 shadow-2xl"
          >
            <Star className="w-12 h-12 mx-auto mb-4 animate-pulse" />
            <p className="text-2xl font-bold mb-4" dir="rtl" data-testid="text-footer-quote">
              "הַעִיקָּר לִהְיוֹת שָׂמֵח בְּכָל עֵת וּבְכָל מָקוֹם שֶׁהוּא"
            </p>
            <p className="text-lg opacity-90" data-testid="text-footer-quote-translation">
              {currentLanguage === 'he' ? 'רבי נחמן מברסלב זצ״ל' :
               currentLanguage === 'en' ? 'Rabbi Nachman of Breslov' :
               'Rabbi Nachman de Breslov'}
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Background ambient music (if enabled) */}
      {ambientMusicEnabled && (
        <audio autoPlay loop className="hidden">
          <source src="/path-to-ambient-breslov-music.mp3" type="audio/mpeg" />
        </audio>
      )}
    </div>
  );
}