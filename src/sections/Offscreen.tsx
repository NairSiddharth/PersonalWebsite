"use client";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Film, Camera, Heart, Music } from "lucide-react";

// TMDB API Configuration
const TMDB_API_KEY = 'd8864e8ea68d42b670a7a43a9bc7cdf6';

// Component to fetch and display movie poster
const MoviePoster = ({ tmdbId, title }: { tmdbId: number, title: string }) => {
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoster = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${TMDB_API_KEY}`
        );
        const data = await response.json();
        
        if (data.poster_path) {
          setPosterUrl(`https://image.tmdb.org/t/p/w300${data.poster_path}`);
        }
      } catch (error) {
        console.error('Failed to fetch movie poster:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPoster();
  }, [tmdbId]);

  if (loading) {
    return <div className="w-full h-48 bg-muted animate-pulse rounded" />;
  }

  if (posterUrl) {
    return (
      <img 
        src={posterUrl} 
        alt={`${title} poster`}
        className="w-full h-48 object-cover rounded"
      />
    );
  }

  // Fallback placeholder
  return (
    <div className="w-full h-48 bg-muted rounded flex items-center justify-center">
      <Film className="w-8 h-8 text-muted-foreground" />
    </div>
  );
};

// Component to display book cover
const BookCover = ({ isbn, title }: { isbn: number, title: string }) => {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div className="w-full h-40 bg-muted rounded flex items-center justify-center">
        <Book className="w-8 h-8 text-muted-foreground" />
      </div>
    );
  }

  return (
    <img 
      src={`https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`}
      alt={`${title} cover`}
      className="w-full h-40 object-cover rounded"
      onError={() => setImageError(true)}
    />
  );
};

// Updated SpotifyTopTracks component for Offscreen.tsx
// Replace the existing SpotifyTopTracks component in your Offscreen.tsx file

const SpotifyTopTracks = () => {
  const [tracks, setTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/spotify-top-tracks');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        // Extract tracks from Spotify API response
        setTracks(data.items || []);
        
      } catch (error) {
        console.error('Error fetching Spotify tracks:', error);
        setError(error instanceof Error ? error.message : 'Failed to load tracks');
        
        // Fallback to mock data if API fails
        const mockTracks = [
          {
            name: "Flowers",
            artists: [{ name: "Miley Cyrus" }],
            album: {
              name: "Endless Summer Vacation",
              images: [{ url: "https://i.scdn.co/image/ab67616d00001e02b9b5e18e5a6e0e62e0a8b3c0" }]
            }
          },
          {
            name: "Kill Bill",
            artists: [{ name: "SZA" }],
            album: {
              name: "SOS",
              images: [{ url: "https://i.scdn.co/image/ab67616d00001e02e3c0a7e8e6b92c3e5dc5db17" }]
            }
          },
          {
            name: "Unholy",
            artists: [{ name: "Sam Smith" }, { name: "Kim Petras" }],
            album: {
              name: "Gloria",
              images: [{ url: "https://i.scdn.co/image/ab67616d00001e027d9fe17c3d8e9b5e1e0d5f7e" }]
            }
          },
          {
            name: "As It Was",
            artists: [{ name: "Harry Styles" }],
            album: {
              name: "Harry's House",
              images: [{ url: "https://i.scdn.co/image/ab67616d00001e02b46f74097655d7f353caab14" }]
            }
          },
          {
            name: "Anti-Hero",
            artists: [{ name: "Taylor Swift" }],
            album: {
              name: "Midnights",
              images: [{ url: "https://i.scdn.co/image/ab67616d00001e02e0b60c608586d88252b8fbc0" }]
            }
          }
        ];
        setTracks(mockTracks);
      } finally {
        setLoading(false);
      }
    };

    fetchTopTracks();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="aspect-square bg-muted animate-pulse rounded-lg" />
            <div className="h-4 bg-muted animate-pulse rounded" />
            <div className="h-3 bg-muted animate-pulse rounded w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  if (error && tracks.length === 0) {
    return (
      <div className="text-center py-8">
        <Music className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">Unable to load Spotify tracks</p>
        <p className="text-sm text-muted-foreground mt-1">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {error && (
        <div className="text-sm text-yellow-600 bg-yellow-50 p-2 rounded border border-yellow-200">
          ⚠️ Using fallback data: {error}
        </div>
      )}
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {tracks.map((track, index) => (
          <Card key={track.id || index} className="overflow-hidden hover:shadow-lg transition-all group">
            <div className="relative aspect-square">
              <img 
                src={track.album.images[0]?.url || "/placeholder-album.jpg"}
                alt={`${track.album.name} cover`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-2 left-2 right-2">
                  <Music className="w-4 h-4 text-white/80" />
                </div>
              </div>
            </div>
            <CardContent className="p-3 space-y-1">
              <h4 className="font-semibold text-sm line-clamp-1" title={track.name}>
                {track.name}
              </h4>
              <p className="text-xs text-muted-foreground line-clamp-1" title={track.artists.map((a: any) => a.name).join(', ')}>
                {track.artists.map((a: any) => a.name).join(', ')}
              </p>
              <p className="text-xs text-muted-foreground/70 line-clamp-1" title={track.album.name}>
                {track.album.name}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
// Data
const moviesWatched = [
  { title: "The Naked Gun", year: 2025, rating: 4, genre: "Comedy", id: 1035259 },
  { title: "Superman", year: 2025, rating: 4, genre: "Superhero", id: 1061474 },
  { title: "A Working Man", year: 2025, rating: 3, genre: "Action", id: 1197306 },
  { title: "Thunderbolts*", year: 2025, rating: 4, genre: "Superhero", id: 986056 },
];

const booksRead = [
  { title: "The Income Factory", author: "Steven Bavaria", rating: 3, category: "Investing", isbn: 9781260458534 },
  { title: "Wind and Truth", author: "Brandon Sanderson", rating: 5, category: "Fantasy", isbn: 9781250368287 },
  { title: "Psychology of Money", author: "Morgan Housel", rating: 5, category: "Personal Finance", isbn: 9789390166268 },
  { title: "Open", author: "Andre Agassi/J.R. Moehringer", rating: 5, category: "Memoir", isbn: 9780307268198},
  { title: "A Short History of Nearly Everything", author: "Bill Bryson", rating: 5, category: "Science", isbn: 9780552997041 },
  { title: "Last Man Standing", author: "Duff McDonald", rating: 4, category: "Biography", isbn: 9781416599531},
];

const internshipPhotos = [
  { src: "/863.JPG", alt: "Internship First Day - 1st summer", company: "JPMorganChase", location: "Houston, TX" },
  { src: "/1339.jpg", alt: "Returning Interns @ Minigolf - 2nd summer", company: "JPMorganChase", location: "Houston, TX" },
  { src: "/1355.jpg", alt: "End of Internship Presentation - 2nd summer", company: "JPMorganChase", location: "Houston, TX" },
  { src: "/1361.jpg", alt: "Pic. w/ other interns on our floor - 2nd summer", company: "JPMorganChase", location: "Houston, TX" },
  { src: "/1591.jpg", alt: "End of Internship Celebration - 3rd summer pt. 2", company: "JPMorganChase", location: "Houston, TX" },
  { src: "/IMG_3357.jpg", alt: "Intern Partners - 4th summer", company: "JPMorganChase", location: "Plano, TX" },
  { src: "/IMG_5624.jpg", alt: "Pickleball w/ Interns - 4th summer", company: "JPMorganChase", location: "Plano, TX" },
  { src: "/IMG_5636.JPG", alt: "Final Supper w/ Interns - 4th summer", company: "JPMorganChase", location: "Plano, TX" },
  { src: "/TFKU7150.JPG", alt: "Internship Group - 4th summer", company: "JPMorganChase", location: "Plano, TX" },
];

const lifeAdventurePhotos = [
  { src: "/IMG_4905.jpg", alt: "Best bowl ramen I've had to this day, mala sensation goes crazy", location: "Ooink Ramen", description: "Best bowl ramen I've had to this day, mala sensation goes crazy" },
  { src: "/IMG_5118.jpg", alt: "Pretty baseball park", location: "T-Mobile Park", description: "Pretty baseball park" },
  { src: "/IMG_5133.jpg", alt: "Watching the Mariners", location: "T-Mobile Park", description: "Watching the Mariners" },
  { src: "/IMG_5326.jpg", alt: "Some days the view made the hours worthwhile", location: "Penberthy Fields", description: "Some days the view made the hours worthwhile" },
  { src: "/IMG_5359.JPG", alt: "Look Mom I'm a Photographer Pt. 1", location: "Zach. Engineering Building 1", description: "Look Mom I'm a Photographer Pt. 1" },
  { src: "/IMG_5360.JPG", alt: "Look Mom I'm a Photographer Pt. 2", location: "Zach. Engineering Building 2", description: "Look Mom I'm a Photographer Pt. 2" },
  { src: "/IMG_5401.jpg", alt: "Day in the life of Sid the referee", location: "Penberthy Fields", description: "Day in the life of Sid the referee" },
  { src: "/IMG_5409.jpg", alt: "Panorama of sea from Pike Place overview", location: "Panoramic Seattle Seascape", description: "Panorama of sea from Pike Place overview" },
  { src: "/IMG_5433.jpg", alt: "Looking back at Seattle on way to Bainbridge Island", location: "Seattle Skyline", description: "Looking back at Seattle on way to Bainbridge Island" },
  { src: "/IMG_5444.jpg", alt: "3rd Best ramen I've had", location: "Ramen Danbo", description: "3rd Best ramen I've had" },
  { src: "/IMG_5453.jpg", alt: "Nice ambience at Pike Place after eating @ Pink Door", location: "Pike Place", description: "Nice ambience at Pike Place after eating @ Pink Door" },
  { src: "/IMG_5498.jpg", alt: "Best Pizza I've had, sicilian style pies are the way to go", location: "Dino's Tomato Pie", description: "Best Pizza I've had, sicilian style pies are the way to go" },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-sm ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

// Photo collage component
const PhotoCollage = ({ 
  photos, 
  title, 
  icon: Icon,
  gridLayout = "default" 
}: { 
  photos: any[], 
  title: string, 
  icon: any,
  gridLayout?: "default" | "alternate"
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const getCollageStyles = (index: number, layout: string, totalPhotos: number) => {
    if (layout === "default") {
      const styles = [
        { size: "w-40 h-32", rotation: "rotate-2", position: "top-4 left-4", zIndex: "z-10" },
        { size: "w-36 h-44", rotation: "-rotate-3", position: "top-4 left-1/2 -translate-x-1/2", zIndex: "z-20" },
        { size: "w-40 h-36", rotation: "rotate-1", position: "top-4 right-4", zIndex: "z-30" },
        { size: "w-44 h-36", rotation: "-rotate-2", position: "top-1/3 left-8", zIndex: "z-40" },
        { size: "w-36 h-40", rotation: "rotate-3", position: "top-1/3 left-1/2 -translate-x-1/2", zIndex: "z-50" },
        { size: "w-40 h-44", rotation: "-rotate-1", position: "top-1/3 right-8", zIndex: "z-60" },
        { size: "w-36 h-36", rotation: "rotate-2", position: "bottom-24 left-4", zIndex: "z-70" },
        { size: "w-44 h-32", rotation: "-rotate-3", position: "bottom-24 left-1/2 -translate-x-1/2", zIndex: "z-80" },
        { size: "w-40 h-40", rotation: "rotate-1", position: "bottom-24 right-4", zIndex: "z-90" }
      ];
      return styles[index % styles.length];
    } else {
      const styles = [
        { size: "w-36 h-32", rotation: "-rotate-2", position: "top-4 left-2", zIndex: "z-10" },
        { size: "w-32 h-40", rotation: "rotate-1", position: "top-4 left-1/3", zIndex: "z-20" },
        { size: "w-36 h-36", rotation: "-rotate-3", position: "top-4 right-1/3", zIndex: "z-30" },
        { size: "w-32 h-32", rotation: "rotate-2", position: "top-4 right-2", zIndex: "z-40" },
        { size: "w-40 h-32", rotation: "-rotate-1", position: "top-44 left-4", zIndex: "z-50" },
        { size: "w-36 h-40", rotation: "rotate-3", position: "top-44 left-1/3", zIndex: "z-60" },
        { size: "w-32 h-36", rotation: "-rotate-2", position: "top-44 right-1/3", zIndex: "z-70" },
        { size: "w-36 h-32", rotation: "rotate-1", position: "top-44 right-4", zIndex: "z-80" },
        { size: "w-32 h-40", rotation: "rotate-2", position: "bottom-8 left-2", zIndex: "z-90" },
        { size: "w-40 h-36", rotation: "-rotate-3", position: "bottom-8 left-1/3", zIndex: "z-100" },
        { size: "w-36 h-32", rotation: "rotate-1", position: "bottom-8 right-1/3", zIndex: "z-110" },
        { size: "w-32 h-36", rotation: "-rotate-1", position: "bottom-8 right-2", zIndex: "z-120" }
      ];
      return styles[index % styles.length];
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-heading font-semibold">{title}</h3>
      </div>
      
      <div 
        className="relative h-[500px] lg:h-[600px] bg-gradient-to-br from-muted/20 to-muted/5 rounded-xl p-4 overflow-hidden select-none"
        onContextMenu={(e) => e.preventDefault()}
        style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
      >
        {photos.map((photo, index) => {
          const style = getCollageStyles(index, gridLayout, photos.length);
          
          return (
            <div 
              key={index}
              className={`absolute ${style.position} ${style.size} ${style.rotation} ${style.zIndex} cursor-pointer group transform transition-all duration-300 hover:scale-105 hover:z-[200]`}
              onClick={() => setSelectedPhoto(index)}
            >
              <div className="w-full h-full bg-white p-1.5 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:rotate-0">
                <div 
                  className="w-full h-4/5 overflow-hidden bg-muted relative"
                  draggable="false"
                >
                  <div className="absolute inset-0 z-10" style={{ pointerEvents: 'none' }}></div>
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover pointer-events-none select-none"
                    draggable="false"
                    onDragStart={(e) => e.preventDefault()}
                    onContextMenu={(e) => e.preventDefault()}
                    style={{ userSelect: 'none', WebkitUserSelect: 'none', pointerEvents: 'none' }}
                    onError={(e) => {
                      e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f3f4f6'/%3E%3Ctext x='150' y='100' text-anchor='middle' dy='.3em' fill='%236b7280' font-family='sans-serif' font-size='12'%3EPhoto%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
                <div className="h-1/5 flex items-center justify-center px-1">
                  <div className="text-center">
                    <p className="text-[10px] font-semibold text-gray-800 truncate px-1">
                      {photo.location}
                    </p>
                  </div>
                </div>
              </div>
              
              {(index % 3 === 0) && (
                <div className="absolute -top-2 -right-2 w-6 h-3 bg-yellow-200 opacity-70 rotate-45 shadow-sm"></div>
              )}
              {(index % 3 === 1) && (
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-gray-300 opacity-60 shadow-sm"></div>
              )}
              {(index % 3 === 2) && (
                <div className="absolute -bottom-1 -left-1 w-5 h-2 bg-blue-200 opacity-60 -rotate-12 shadow-sm"></div>
              )}
            </div>
          );
        })}
        
        <div className="absolute top-12 right-16 w-2 h-2 bg-primary/30 rounded-full"></div>
        <div className="absolute bottom-16 left-12 w-2 h-2 bg-secondary/40 rounded-full"></div>
        <div className="absolute top-1/2 right-1/4 w-3 h-1 bg-muted-foreground/20 rotate-45"></div>
        
        <div className="absolute top-0 right-0 w-12 h-12 bg-yellow-100/50 opacity-70 rotate-45 transform translate-x-6 -translate-y-6"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-blue-100/30 opacity-60 rotate-45 transform -translate-x-8 translate-y-8"></div>
      </div>

      {selectedPhoto !== null && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 select-none"
          onClick={() => setSelectedPhoto(null)}
          onContextMenu={(e) => e.preventDefault()}
        >
          <div className="relative max-w-4xl max-h-full">
            <div className="absolute inset-0 z-10" style={{ pointerEvents: 'auto' }} onClick={() => setSelectedPhoto(null)}></div>
            <img
              src={photos[selectedPhoto].src}
              alt={photos[selectedPhoto].alt}
              className="max-w-full max-h-full object-contain rounded-lg pointer-events-none select-none"
              draggable="false"
              onDragStart={(e) => e.preventDefault()}
              onContextMenu={(e) => e.preventDefault()}
              style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
            />
            <button
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 z-20"
              onClick={() => setSelectedPhoto(null)}
            >
              ×
            </button>
            <div className="absolute bottom-4 left-4 text-white z-20 pointer-events-none">
              <h3 className="text-xl font-semibold">{photos[selectedPhoto].location}</h3>
              <p className="text-sm opacity-80">{photos[selectedPhoto].alt}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Personal() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Beyond the Code</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A glimpse into my life outside of programming - the movies and books I've consumed this year, 
          and special memories from my incredible work experiences and general life adventures!
        </p>
      </div>

      {/* Movies Section with Posters */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Film className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-heading font-semibold">Movies I've Watched This Year</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {moviesWatched.map((movie, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow overflow-hidden">
              <CardContent className="p-0">
                <MoviePoster tmdbId={movie.id} title={movie.title} />
              </CardContent>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{movie.title}</CardTitle>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">{movie.genre}</Badge>
                  <span className="text-xs text-muted-foreground">{movie.year}</span>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <StarRating rating={movie.rating} />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Books Section with Covers */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Book className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-heading font-semibold">Books I've Read This Year</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {booksRead.map((book, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow overflow-hidden">
              <div className="flex gap-4 p-4">
                <div className="w-28 flex-shrink-0">
                  <BookCover isbn={book.isbn} title={book.title} />
                </div>
                <div className="flex-1 space-y-2">
                  <div>
                    <h3 className="font-semibold text-base">{book.title}</h3>
                    <p className="text-sm text-muted-foreground">by {book.author}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <Badge variant="outline" className="text-xs">{book.category}</Badge>
                    <StarRating rating={book.rating} />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Music Section - Spotify Top Tracks */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Music className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-heading font-semibold">Tracks I've Been Vibing To</h2>
          <span className="text-sm text-muted-foreground">(My Top 5 - Medium Term)</span>
        </div>
        
        <SpotifyTopTracks />
      </section>

      {/* Photo Collages Section - Side by Side */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 justify-center">
          <Camera className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-heading font-semibold">Memory Boards</h2>
          <Heart className="w-6 h-6 text-primary" />
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <PhotoCollage 
            photos={internshipPhotos} 
            title="Internship Memories" 
            icon={Camera}
            gridLayout="default"
          />

          <PhotoCollage 
            photos={lifeAdventurePhotos} 
            title="Life Adventures" 
            icon={Heart}
            gridLayout="alternate"
          />
        </div>
      </section>
    </div>
  );
}