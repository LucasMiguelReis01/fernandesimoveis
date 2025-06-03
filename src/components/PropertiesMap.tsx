
import React, { useEffect, useRef, useState } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { PropertyType } from '@/components/PropertyCard';
import { MapPin } from 'lucide-react';

interface PropertiesMapProps {
  properties: PropertyType[];
  className?: string;
  height?: string;
  onPropertySelect?: (property: PropertyType) => void;
}

const MapComponent: React.FC<{ 
  properties: PropertyType[]; 
  onPropertySelect?: (property: PropertyType) => void 
}> = ({ properties, onPropertySelect }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current || properties.length === 0) return;

    const initMap = async () => {
      try {
        const geocoder = new google.maps.Geocoder();
        const bounds = new google.maps.LatLngBounds();
        
        // Create map centered on São Paulo initially
        const mapInstance = new google.maps.Map(mapRef.current, {
          zoom: 10,
          center: { lat: -23.5505, lng: -46.6333 }, // São Paulo
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

        // Clear existing markers
        markers.forEach(marker => marker.setMap(null));
        const newMarkers: google.maps.Marker[] = [];

        // Add markers for each property
        const geocodePromises = properties.map(async (property) => {
          try {
            const geocodeResult = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
              geocoder.geocode({ address: property.location }, (results, status) => {
                if (status === 'OK' && results) {
                  resolve(results);
                } else {
                  reject(new Error(`Geocoding failed for ${property.location}: ${status}`));
                }
              });
            });

            if (geocodeResult.length > 0) {
              const position = geocodeResult[0].geometry.location;
              bounds.extend(position);

              const marker = new google.maps.Marker({
                position: position,
                map: mapInstance,
                title: property.title,
                icon: {
                  url: 'data:image/svg+xml;base64,' + btoa(`
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  `),
                  scaledSize: new google.maps.Size(40, 40),
                }
              });

              // Add click listener
              marker.addListener('click', () => {
                if (onPropertySelect) {
                  onPropertySelect(property);
                }
              });

              // Add info window
              const infoWindow = new google.maps.InfoWindow({
                content: `
                  <div class="p-2 max-w-xs">
                    <h3 class="font-semibold text-gray-900 mb-1">${property.title}</h3>
                    <p class="text-sm text-gray-600 mb-2">${property.location}</p>
                    <p class="text-sm font-medium text-blue-600">R$ ${typeof property.price === 'number' ? property.price.toLocaleString('pt-BR') : property.price}</p>
                    <p class="text-xs text-gray-500 mt-1">${property.bedrooms} quartos • ${property.area} m²</p>
                  </div>
                `
              });

              marker.addListener('mouseover', () => {
                infoWindow.open(mapInstance, marker);
              });

              marker.addListener('mouseout', () => {
                infoWindow.close();
              });

              newMarkers.push(marker);
            }
          } catch (error) {
            console.error(`Error geocoding property ${property.title}:`, error);
          }
        });

        await Promise.allSettled(geocodePromises);
        setMarkers(newMarkers);

        // Fit map to show all markers
        if (newMarkers.length > 0) {
          mapInstance.fitBounds(bounds);
          
          // Ensure minimum zoom level
          const listener = google.maps.event.addListener(mapInstance, 'bounds_changed', () => {
            if (mapInstance.getZoom() && mapInstance.getZoom()! > 15) {
              mapInstance.setZoom(15);
            }
            google.maps.event.removeListener(listener);
          });
        }

      } catch (error) {
        console.error('Error initializing properties map:', error);
      }
    };

    initMap();

    return () => {
      markers.forEach(marker => marker.setMap(null));
    };
  }, [properties, onPropertySelect]);

  return <div ref={mapRef} className="w-full h-full rounded-lg" />;
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

const PropertiesMap: React.FC<PropertiesMapProps> = ({ 
  properties, 
  className = "", 
  height = "h-96",
  onPropertySelect
}) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className={`${height} ${className} bg-gray-800 rounded-lg flex flex-col items-center justify-center`}>
        <MapPin className="h-12 w-12 text-gray-600 mb-4" />
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
    <div className={`${height} ${className} rounded-lg overflow-hidden border border-gold/20`}>
      <Wrapper apiKey={apiKey} render={render} libraries={['geometry', 'places']}>
        <MapComponent properties={properties} onPropertySelect={onPropertySelect} />
      </Wrapper>
    </div>
  );
};

export default PropertiesMap;
