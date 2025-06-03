import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';

interface GoogleMapProps {
  location: string;
  className?: string;
  height?: string;
  zoom?: number;
}

const MapComponent: React.FC<{ location: string; zoom: number }> = ({ location, zoom }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer para lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mapRef.current || !isVisible) return;

    const initMap = async () => {
      try {
        // Geocode the location
        const geocoder = new google.maps.Geocoder();
        const geocodeResult = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
          geocoder.geocode({ address: location }, (results, status) => {
            if (status === 'OK' && results) {
              resolve(results);
            } else {
              reject(new Error(`Geocoding failed: ${status}`));
            }
          });
        });

        if (geocodeResult.length > 0) {
          const position = geocodeResult[0].geometry.location;
          
          // Create map
          const mapInstance = new google.maps.Map(mapRef.current, {
            center: position,
            zoom: zoom,
            styles: [
              {
                featureType: "all",
                elementType: "geometry.fill",
                stylers: [{ color: "#1a1a1a" }]
              },
              {
                featureType: "all",
                elementType: "labels.text.fill",
                stylers: [{ color: "#ffffff" }]
              },
              {
                featureType: "all",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#000000" }, { lightness: 13 }]
              },
              {
                featureType: "administrative",
                elementType: "geometry.fill",
                stylers: [{ color: "#000000" }]
              },
              {
                featureType: "administrative",
                elementType: "geometry.stroke",
                stylers: [{ color: "#144b53" }, { lightness: 14 }, { weight: 1.4 }]
              },
              {
                featureType: "landscape",
                elementType: "all",
                stylers: [{ color: "#08304b" }]
              },
              {
                featureType: "poi",
                elementType: "geometry",
                stylers: [{ color: "#0c4152" }, { lightness: 5 }]
              },
              {
                featureType: "road.highway",
                elementType: "geometry.fill",
                stylers: [{ color: "#000000" }]
              },
              {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{ color: "#0b434f" }, { lightness: 25 }]
              },
              {
                featureType: "road.arterial",
                elementType: "geometry.fill",
                stylers: [{ color: "#000000" }]
              },
              {
                featureType: "road.arterial",
                elementType: "geometry.stroke",
                stylers: [{ color: "#0b3d51" }, { lightness: 16 }]
              },
              {
                featureType: "road.local",
                elementType: "geometry",
                stylers: [{ color: "#000000" }]
              },
              {
                featureType: "transit",
                elementType: "all",
                stylers: [{ color: "#146474" }]
              },
              {
                featureType: "water",
                elementType: "all",
                stylers: [{ color: "#021019" }]
              }
            ]
          });

          setMap(mapInstance);

          // Add marker
          const markerInstance = new google.maps.Marker({
            position: position,
            map: mapInstance,
            title: location,
            icon: {
              url: 'data:image/svg+xml;base64,' + btoa(`
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              `),
              scaledSize: new google.maps.Size(32, 32),
            }
          });

          setMarker(markerInstance);
        }
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    const timer = setTimeout(initMap, 100); // Pequeno delay para melhor performance

    return () => {
      clearTimeout(timer);
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [location, zoom, isVisible]);

  return (
    <div ref={mapRef} className="w-full h-full rounded-lg">
      {!isVisible && (
        <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center">
          <div className="text-gray-400">Carregando mapa...</div>
        </div>
      )}
    </div>
  );
};

const render = (status: Status) => {
  switch (status) {
    case Status.LOADING:
      return (
        <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold"></div>
        </div>
      );
    case Status.FAILURE:
      return (
        <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center">
          <span className="text-gray-400">Erro ao carregar mapa</span>
        </div>
      );
    case Status.SUCCESS:
      return null;
  }
};

const GoogleMap: React.FC<GoogleMapProps> = ({ 
  location, 
  className = "", 
  height = "h-64", 
  zoom = 15 
}) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className={`${height} ${className} bg-gray-800 rounded-lg flex flex-col items-center justify-center`}>
        <div className="text-center p-4">
          <p className="text-gray-400 mb-2">Configure a API Key do Google Maps</p>
          <p className="text-sm text-gray-500">
            Adicione VITE_GOOGLE_MAPS_API_KEY nas variáveis de ambiente
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${height} ${className} rounded-lg overflow-hidden`}>
      <Wrapper apiKey={apiKey} render={render} libraries={['geometry', 'places']}>
        <MapComponent location={location} zoom={zoom} />
      </Wrapper>
    </div>
  );
};

export default GoogleMap;
