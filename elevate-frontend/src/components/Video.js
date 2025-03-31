import { useState } from 'react';
export default function Video() {
    const tutorialVideos = [
      {
        id: 1,
        title: "How to Play Chess for Beginners",
        description: "Learn the basic rules and strategies of chess",
        thumbnail: "https://i.ytimg.com/vi/OCSbzArwB10/maxresdefault.jpg",
        url: "https://www.youtube.com/embed/OCSbzArwB10"
      },
      {
        id: 2,
        title: "Soccer Drills for Kids",
        description: "Basic soccer drills to improve your skills",
        thumbnail: "https://i.ytimg.com/vi/qQY7K1jJpUw/maxresdefault.jpg",
        url: "https://www.youtube.com/embed/qQY7K1jJpUw"
      },
      {
        id: 3,
        title: "Introduction to Painting",
        description: "Get started with basic painting techniques",
        thumbnail: "https://i.ytimg.com/vi/ZYV7Qm4-Alk/maxresdefault.jpg",
        url: "https://www.youtube.com/embed/ZYV7Qm4-Alk"
      }
    ];
  
    const [selectedVideo, setSelectedVideo] = useState(null);
  
    return (
      <div className="bg-[#1A2A5D] text-white min-h-screen p-4 pb-16">
        <header className="flex justify-between items-center p-2">
          <h1 className="text-3xl font-bold">Elevate Video Tutorials</h1>
        </header>
  
        <div className="mt-8">
          {selectedVideo ? (
            <div className="mb-6">
              <button 
                onClick={() => setSelectedVideo(null)}
                className="mb-4 flex items-center text-blue-300"
              >
                ← Back to videos
              </button>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={selectedVideo.url}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-64 md:h-96 rounded-lg"
                ></iframe>
              </div>
              <h2 className="text-xl font-bold mt-4">{selectedVideo.title}</h2>
              <p className="text-blue-200">{selectedVideo.description}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutorialVideos.map(video => (
                <div 
                  key={video.id} 
                  className="bg-blue-900 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => setSelectedVideo(video)}
                >
                  <div className="relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black bg-opacity-50 rounded-full p-3">
                        <span className="text-2xl">▶️</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold">{video.title}</h3>
                    <p className="text-sm text-blue-200 mt-1">{video.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
  
        <nav className="fixed bottom-0 left-0 w-full bg-blue-900 p-3 flex justify-around">
          <a href="/">🏠</a>
          <a href="/forum">👥</a>
          <a href="/calendar">🗓️</a>
          <a href="/video">🎥</a>
          <a href="/settings">⚙️</a>
        </nav>
      </div>
    );
  }