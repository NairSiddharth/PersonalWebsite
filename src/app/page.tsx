"use client";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import About from "@/sections/About";
import Contact from "@/sections/Contact";

export default function Home() {
  const [showContact, setShowContact] = useState(false);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: false, // Allow re-animation for the contact section
      anchorPlacement: "center-bottom",
    });
  }, []);

  // Handle direct fragment links (e.g., from navbar/footer)
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#contact') {
        setShowContact(true);
        // Small delay to ensure the element exists before scrolling
        setTimeout(() => {
          document.getElementById('contact')?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
    };

    // Check on initial load
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Refresh AOS when contact section is shown
  useEffect(() => {
    if (showContact) {
      // Small delay to let the DOM update
      setTimeout(() => {
        AOS.refresh();
      }, 50);
    }
  }, [showContact]);

  const handleConnectClick = () => {
    setShowContact(true);
    
    // Update URL hash without triggering navigation
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', '#contact');
    }
    
    // Scroll to contact section after brief delay for animation
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 200);
  };

  const handleHideContact = () => {
    setShowContact(false);
    
    // Remove hash from URL
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', window.location.pathname);
    }
    
    // Scroll back to about section
    setTimeout(() => {
      document.getElementById('about')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  return (
    <main className="space-y-16">
      {/* About Section */}
      <div id="about" className="max-w-7xl mx-auto px-6">
        <About onConnectClick={handleConnectClick} />
      </div>
      
      {/* Contact Section - Conditionally Rendered with AOS Animation */}
      {showContact && (
        <div 
          id="contact" 
          data-aos="fade-down"
          data-aos-duration="800"
          className="max-w-7xl mx-auto px-6"
        >
          <Contact onHide={handleHideContact} />
        </div>
      )}
    </main>
  );
}