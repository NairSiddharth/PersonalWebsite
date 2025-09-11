"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Film, Camera, MapPin, Heart } from "lucide-react";

// Sample data - replace with your actual data
const moviesWatched = [
  { title: "The Naked Gun", year: 2025, rating: 4, genre: "Comedy" },
  { title: "Superman", year: 2025, rating: 4, genre: "Superhero" },
  { title: "A Working Man", year: 2025, rating: 3, genre: "Action" },
  { title: "Thunderbolts", year: 2025, rating: 4, genre: "Superhero" },
];

const booksRead = [
  { title: "The Income Factory", author: "Steven Bavaria", rating: 3, category: "Investing" },
  { title: "Wind and Truth", author: "Brandon Sanderson", rating: 5, category: "Fantasy" },
  { title: "Psychology of Money", author: "Morgan Housel", rating: 5, category: "Personal Finance" },
  { title: "Open", author: "Andre Agassi/J.R. Moehringer", rating: 5, category: "Memoir" },
  { title: "A Short History of Nearly Everything", author: "Bill Bryson", rating: 5, category: "Science" },
  { title: "Last Man Standing", author: "Duff McDonald", rating: 4, category: "Biography" },
];

const internshipPhotos = [
  { src: "/863.JPG", alt: "Internship First Day - 1st summer", company: "JPMorganChase", location: "Houston, TX" },
  { src: "/1339.JPG", alt: "Returning Interns @ Minigolf - 2nd summer", company: "JPMorganChase", location: "Houston, TX" },
  { src: "/1355.JPG", alt: "End of Internship Presentation - 2nd summer", company: "JPMorganChase", location: "Houston, TX" },
  { src: "/1361.JPG", alt: "Pic. w/ other interns on our floor - 2nd summer", company: "JPMorganChase", location: "Houston, TX" },
  { src: "/1591.jpg", alt: "End of Internship Celebration - 3rd summer pt. 2", company: "JPMorganChase", location: "Houston, TX" },
  { src: "/IMG_3357.jpg", alt: "Intern Partners - 4th summer", company: "JPMorganChase", location: "Plano, TX" },
  { src: "/IMG_5624.jpg", alt: "Pickleball w/ Interns - 4th summer", company: "JPMorganChase", location: "Plano, TX" },
  { src: "/IMG_5636.jpg", alt: "Final Supper w/ Interns - 4th summer", company: "JPMorganChase", location: "Plano, TX" },
  { src: "/TFKU7150.jpg", alt: "Internship Group - 4th summer", company: "JPMorganChase", location: "Plano, TX" },
];

// Add your life adventures photos here
const lifeAdventurePhotos = [
  { src: "/IMG_4905.jpg", alt: "Travel adventure", location: "Best Ramen I've had @ Ooink Ramen", description: "Amazing trip" },
  { src: "/IMG_5118.jpg", alt: "Hobby photo", location: "T-Mobile Park", description: "Fun activity" },
  { src: "/IMG_5133.jpg", alt: "Achievement photo", location: "T-Mobile Park", description: "Special moment" },
  { src: "/IMG_5326.jpg", alt: "Friends gathering", location: "Penberthy Fields", description: "Great memories" },
  { src: "/IMG_5359.jpg", alt: "Personal milestone", location: "Zach. Engineering Building 1", description: "Proud moment" },
  { src: "/IMG_5360.jpg", alt: "Personal milestone", location: "Zach. Engineering Building 2", description: "Proud moment" },
  { src: "/IMG_5401.jpg", alt: "Personal milestone", location: "Foggy Penberthy Fields", description: "Proud moment" },
  { src: "/IMG_5409.jpg", alt: "Personal milestone", location: "Panoramic Seattle Seascape", description: "Proud moment" },
  { src: "/IMG_5433.jpg", alt: "Personal milestone", location: "Seattle Skyline", description: "Proud moment" },
  { src: "/IMG_5444.jpg", alt: "Personal milestone", location: "Ramen Danbo", description: "Proud moment" },
  { src: "/IMG_5453.jpg", alt: "Personal milestone", location: "Pike Place", description: "Proud moment" },
  { src: "/IMG_5498.jpg", alt: "Personal milestone", location: "Best Pizza I've had @ Dino's Tomato Pie", description: "Proud moment" },
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

// Photo collage component with better layout and image protection
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

  // Different grid layouts to prevent overlap
  const getCollageStyles = (index: number, layout: string) => {
    if (layout === "default") {
      const styles = [
        { size: "w-56 h-40", rotation: "rotate-2", position: "top-8 left-8", zIndex: "z-10" },
        { size: "w-48 h-56", rotation: "-rotate-3", position: "top-8 right-8", zIndex: "z-20" },
        { size: "w-52 h-44", rotation: "rotate-1", position: "bottom-32 left-12", zIndex: "z-30" },
        { size: "w-60 h-48", rotation: "-rotate-2", position: "bottom-8 right-16", zIndex: "z-40" },
        { size: "w-44 h-52", rotation: "rotate-3", position: "top-1/3 left-1/3", zIndex: "z-50" }
      ];
      return styles[index % styles.length];
    } else {
      // Alternate layout for second collage
      const styles = [
        { size: "w-52 h-44", rotation: "-rotate-3", position: "top-12 left-1/4", zIndex: "z-10" },
        { size: "w-56 h-48", rotation: "rotate-2", position: "bottom-12 left-8", zIndex: "z-20" },
        { size: "w-48 h-56", rotation: "-rotate-1", position: "top-8 right-1/4", zIndex: "z-30" },
        { size: "w-60 h-44", rotation: "rotate-3", position: "bottom-24 right-12", zIndex: "z-40" },
        { size: "w-44 h-52", rotation: "-rotate-2", position: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", zIndex: "z-50" }
      ];
      return styles[index % styles.length];
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <Icon className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-heading font-semibold">{title}</h2>
      </div>
      
      {/* Collage Container with image protection styles */}
      <div 
        className="relative min-h-[600px] md:min-h-[700px] bg-gradient-to-br from-muted/20 to-muted/5 rounded-xl p-8 overflow-hidden select-none"
        onContextMenu={(e) => e.preventDefault()} // Disable right-click
        style={{ userSelect: 'none', WebkitUserSelect: 'none' }} // Disable text/image selection
      >
        {photos.map((photo, index) => {
          const style = getCollageStyles(index, gridLayout);
          
          return (
            <div 
              key={index}
              className={`absolute ${style.position} ${style.size} ${style.rotation} ${style.zIndex} cursor-pointer group transform transition-all duration-300 hover:scale-105`}
              onClick={() => setSelectedPhoto(index)}
            >
              {/* Polaroid-style frame */}
              <div className="w-full h-full bg-white p-2 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:rotate-0">
                <div 
                  className="w-full h-4/5 overflow-hidden bg-muted relative"
                  draggable="false" // Disable drag
                >
                  {/* Image with protection overlay */}
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
                {/* Polaroid caption area */}
                <div className="h-1/5 flex items-center justify-center px-1">
                  <div className="text-center">
                    <p className="text-xs font-semibold text-gray-800 truncate">
                      {photo.company || photo.description}
                    </p>
                    <p className="text-xs text-gray-600 truncate">{photo.location}</p>
                  </div>
                </div>
              </div>
              
              {/* Tape/sticker accents */}
              {(index % 3 === 0) && (
                <div className="absolute -top-2 -right-2 w-8 h-4 bg-yellow-200 opacity-70 rotate-45 shadow-sm"></div>
              )}
              {(index % 3 === 1) && (
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-12 h-3 bg-gray-300 opacity-60 shadow-sm"></div>
              )}
              {(index % 3 === 2) && (
                <div className="absolute -bottom-1 -left-1 w-6 h-3 bg-blue-200 opacity-60 -rotate-12 shadow-sm"></div>
              )}
            </div>
          );
        })}
        
        {/* Scattered decorative elements */}
        <div className="absolute top-16 right-24 w-3 h-3 bg-primary/30 rounded-full"></div>
        <div className="absolute bottom-24 left-16 w-2 h-2 bg-secondary/40 rounded-full"></div>
        <div className="absolute top-1/2 right-1/3 w-4 h-1 bg-muted-foreground/20 rotate-45"></div>
        <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-primary/20 rounded-full"></div>
        
        {/* Corner decorations */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-100/50 opacity-70 rotate-45 transform translate-x-8 -translate-y-8"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-blue-100/30 opacity-60 rotate-45 transform -translate-x-10 translate-y-10"></div>
      </div>

      {/* Photo Modal with protection */}
      {selectedPhoto !== null && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 select-none"
          onClick={() => setSelectedPhoto(null)}
          onContextMenu={(e) => e.preventDefault()}
        >
          <div className="relative max-w-4xl max-h-full">
            {/* Invisible overlay to prevent right-click save */}
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
              <h3 className="text-xl font-semibold">{photos[selectedPhoto].company || photos[selectedPhoto].description}</h3>
              <p className="text-sm opacity-80">{photos[selectedPhoto].location}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default function Personal() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-6 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-heading font-bold">Beyond the Code</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A glimpse into my life outside of programming - the movies and books I've consumed this year, 
          and special memories from my incredible work experiences and general life adventures!
        </p>
      </div>

      {/* Movies Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Film className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-heading font-semibold">Movies I've Watched This Year</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {moviesWatched.map((movie, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{movie.title}</CardTitle>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{movie.genre}</Badge>
                  <span className="text-sm text-muted-foreground">{movie.year}</span>
                </div>
              </CardHeader>
              <CardContent>
                <StarRating rating={movie.rating} />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Books Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Book className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-heading font-semibold">Books I've Read This Year</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {booksRead.map((book, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{book.title}</CardTitle>
                <p className="text-muted-foreground">by {book.author}</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{book.category}</Badge>
                  <StarRating rating={book.rating} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Internship Photos Collage */}
      <PhotoCollage 
        photos={internshipPhotos} 
        title="Internship Memories" 
        icon={Camera}
        gridLayout="default"
      />

      {/* Life Adventures Photos Collage */}
      <PhotoCollage 
        photos={lifeAdventurePhotos} 
        title="Life Adventures" 
        icon={Heart}
        gridLayout="alternate"
      />
    </div>
  );
}