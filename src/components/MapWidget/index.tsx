import React, { useState, useCallback, useEffect } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

// Fix for default markers in React Leaflet (will only run client-side)
const fixLeafletIcons = () => {
  if (typeof window !== 'undefined') {
    const L = require('leaflet');
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }
};

interface MapWidgetProps {
  title?: string;
  initialCenter?: [number, number];
  initialRadius?: number;
  initialZoom?: number;
}

interface CircleData {
  center: {
    latitude: number;
    longitude: number;
  };
  radius: number;
}

interface PolygonData {
  coordinates: Array<{
    latitude: number;
    longitude: number;
  }>;
}

type FilterMode = 'circle' | 'polygon';
type InteractionMode = 'center' | 'radius' | 'polygon';

// Client-side only map component
const MapComponent: React.FC<MapWidgetProps> = ({
  title = "Interactive Map Widget",
  initialCenter = [36.1886316, -115.33711110133304],
  initialRadius = 10,
  initialZoom = 10,
}) => {
  const [center, setCenter] = useState<[number, number]>(initialCenter);
  const [radius, setRadius] = useState<number>(initialRadius);
  const [polygonCoordinates, setPolygonCoordinates] = useState<[number, number][]>([]);
  const [filterMode, setFilterMode] = useState<FilterMode>('circle');
  const [interactionMode, setInteractionMode] = useState<InteractionMode>('center');
  const [mapComponents, setMapComponents] = useState<any>(null);

  // Load Leaflet components dynamically
  useEffect(() => {
    const loadMapComponents = async () => {
      if (typeof window !== 'undefined') {
        try {
          // Import Leaflet and React Leaflet components
          const L = await import('leaflet');
          const { MapContainer, TileLayer, Circle, Marker, Polygon, useMapEvents } = await import('react-leaflet');
          
          // Import Leaflet CSS
          await import('leaflet/dist/leaflet.css');
          
          // Fix Leaflet icons
          fixLeafletIcons();
          
          // Force map to invalidate size after load
          setTimeout(() => {
            if (window.dispatchEvent) {
              window.dispatchEvent(new Event('resize'));
            }
          }, 100);

          // Create MapClickHandler component
          const MapClickHandler: React.FC<{
            onMapClick: (lat: number, lng: number) => void;
          }> = ({ onMapClick }) => {
            useMapEvents({
              click: (e) => {
                onMapClick(e.latlng.lat, e.latlng.lng);
              },
            });
            return null;
          };

          setMapComponents({
            MapContainer,
            TileLayer,
            Circle,
            Marker,
            Polygon,
            MapClickHandler,
            L
          });
        } catch (error) {
          console.error('Failed to load map components:', error);
        }
      }
    };

    loadMapComponents();
  }, []);

  const handleMapClick = useCallback((lat: number, lng: number) => {
    if (filterMode === 'circle') {
      if (interactionMode === 'radius') {
        // In radius mode, calculate distance from center
        if (mapComponents?.L) {
          const centerLatLng = mapComponents.L.latLng(center[0], center[1]);
          const clickLatLng = mapComponents.L.latLng(lat, lng);
          const distance = centerLatLng.distanceTo(clickLatLng) / 1000; // Convert to kilometers
          setRadius(Math.round(distance * 100) / 100); // Round to 2 decimal places
        }
      } else if (interactionMode === 'center') {
        // Normal mode: set center
        setCenter([lat, lng]);
      }
    } else if (filterMode === 'polygon' && interactionMode === 'polygon') {
      // Add point to polygon
      setPolygonCoordinates(prev => [...prev, [lat, lng]]);
    }
  }, [interactionMode, filterMode, center, mapComponents]);

  const handleRadiusInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setRadius(value);
    }
  };

  const handleFilterModeChange = (mode: FilterMode) => {
    setFilterMode(mode);
    if (mode === 'circle') {
      setInteractionMode('center');
    } else {
      setInteractionMode('polygon');
    }
  };

  const clearPolygon = () => {
    setPolygonCoordinates([]);
  };

  const removeLastPoint = () => {
    setPolygonCoordinates(prev => prev.slice(0, -1));
  };

  const circleData: CircleData = {
    center: {
      latitude: center[0],
      longitude: center[1],
    },
    radius: radius,
  };

  const polygonData: PolygonData = {
    coordinates: polygonCoordinates.map(([lat, lng]) => ({
      latitude: lat,
      longitude: lng,
    })),
  };

  // Show loading state while map components are loading
  if (!mapComponents) {
    return (
      <div style={{ margin: '20px 0' }}>
        <div style={{ marginBottom: '20px' }}>
          <h3>{title}</h3>
          <p>Loading map...</p>
        </div>
        <div style={{ 
          height: '400px', 
          width: '100%', 
          marginBottom: '20px', 
          border: '1px solid #ccc', 
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5'
        }}>
          <div>Loading interactive map...</div>
        </div>
      </div>
    );
  }

  const { MapContainer, TileLayer, Circle, Marker, Polygon, MapClickHandler } = mapComponents;

  return (
    <div style={{ margin: '20px 0' }}>
      <div style={{ marginBottom: '20px' }}>
        <h3>{title}</h3>
        <div style={{ marginBottom: '15px' }}>
          {/* Filter Mode Selection */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '15px' }}>
            <strong>Filter Type:</strong>
            <button
              onClick={() => handleFilterModeChange('circle')}
              style={{
                padding: '8px 16px',
                backgroundColor: filterMode === 'circle' ? '#007cba' : '#f0f0f0',
                color: filterMode === 'circle' ? 'white' : '#333',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Circle
            </button>
            <button
              onClick={() => handleFilterModeChange('polygon')}
              style={{
                padding: '8px 16px',
                backgroundColor: filterMode === 'polygon' ? '#007cba' : '#f0f0f0',
                color: filterMode === 'polygon' ? 'white' : '#333',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Polygon
            </button>
          </div>

          {/* Circle Mode Controls */}
          {filterMode === 'circle' && (
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
              <button
                onClick={() => setInteractionMode('center')}
                style={{
                  padding: '8px 16px',
                  backgroundColor: interactionMode === 'center' ? '#007cba' : '#f0f0f0',
                  color: interactionMode === 'center' ? 'white' : '#333',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Set Center
              </button>
              <button
                onClick={() => setInteractionMode('radius')}
                style={{
                  padding: '8px 16px',
                  backgroundColor: interactionMode === 'radius' ? '#007cba' : '#f0f0f0',
                  color: interactionMode === 'radius' ? 'white' : '#333',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Set Radius
              </button>
              <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                Radius (km):
                <input
                  type="number"
                  value={radius}
                  onChange={handleRadiusInputChange}
                  min="0"
                  step="0.1"
                  style={{
                    width: '80px',
                    padding: '4px 8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                />
              </label>
            </div>
          )}

          {/* Polygon Mode Controls */}
          {filterMode === 'polygon' && (
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
              <button
                onClick={clearPolygon}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: '1px solid #dc3545',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Clear Polygon
              </button>
              <button
                onClick={removeLastPoint}
                disabled={polygonCoordinates.length === 0}
                style={{
                  padding: '8px 16px',
                  backgroundColor: polygonCoordinates.length === 0 ? '#f0f0f0' : '#ffc107',
                  color: polygonCoordinates.length === 0 ? '#999' : '#000',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  cursor: polygonCoordinates.length === 0 ? 'not-allowed' : 'pointer'
                }}
              >
                Remove Last Point
              </button>
              <span style={{ fontSize: '14px', color: '#666' }}>
                Points: {polygonCoordinates.length}
              </span>
            </div>
          )}

          <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
            {filterMode === 'circle' ? (
              <>
                <strong>Mode: {interactionMode === 'center' ? 'Set Center' : 'Set Radius'}</strong>
                <br />
                {interactionMode === 'radius' 
                  ? 'Click anywhere on the map to set radius (distance from center to click point)'
                  : 'Click anywhere on the map to set the center point'
                }
                <br />
                You can also use the radius input field above for precise control.
              </>
            ) : (
              <>
                <strong>Mode: Draw Polygon</strong>
                <br />
                Click on the map to add points to your polygon. You need at least 3 points to create a polygon.
                <br />
                Points can be added clockwise or counterclockwise.
              </>
            )}
          </p>
        </div>
      </div>
      
      <div style={{ 
        height: '400px', 
        width: '100%', 
        marginBottom: '20px', 
        border: '1px solid #ccc', 
        borderRadius: '4px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <MapContainer
          center={center}
          zoom={initialZoom}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
          whenCreated={(mapInstance) => {
            // Force map to invalidate size when created
            setTimeout(() => {
              mapInstance.invalidateSize();
            }, 100);
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            maxZoom={19}
            minZoom={1}
          />
          
          <MapClickHandler onMapClick={handleMapClick} />
          
          {filterMode === 'circle' && <Marker position={center} />}
          
          {filterMode === 'circle' && (
            <Circle
              center={center}
              radius={radius * 1000} // Convert km to meters for Leaflet
              pathOptions={{
                color: '#3388ff',
                fillColor: '#3388ff',
                fillOpacity: 0.1,
                weight: 2,
              }}
            />
          )}

          {filterMode === 'polygon' && polygonCoordinates.length > 0 && (
            <>
              {/* Show markers for each polygon point */}
              {polygonCoordinates.map((coord, index) => (
                <Marker 
                  key={index} 
                  position={coord}
                />
              ))}
              
              {/* Show polygon if we have at least 3 points */}
              {polygonCoordinates.length >= 3 && (
                <Polygon
                  positions={polygonCoordinates}
                  pathOptions={{
                    color: '#28a745',
                    fillColor: '#28a745',
                    fillOpacity: 0.1,
                    weight: 2,
                  }}
                />
              )}
            </>
          )}
        </MapContainer>
      </div>
      
      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '15px', 
        borderRadius: '4px', 
        fontFamily: 'monospace',
        fontSize: '14px',
        border: '1px solid #ddd'
      }}>
        <strong>Output:</strong>
        <pre style={{ margin: '10px 0 0 0', whiteSpace: 'pre-wrap' }}>
{filterMode === 'circle' ? (
`inCircle: {
  center: {
    latitude: ${circleData.center.latitude}
    longitude: ${circleData.center.longitude}
  }
  radius: ${circleData.radius}
}`
) : (
`inPolygon: {
  coordinates: [${polygonData.coordinates.map(coord => 
    `
    {
      latitude: ${coord.latitude}
      longitude: ${coord.longitude}
    }`
  ).join(',')}
  ]
}`
)}
        </pre>
      </div>
      
      <div style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
        <p><strong>Current Settings:</strong></p>
        <ul>
          <li>Filter Type: {filterMode === 'circle' ? 'Circle' : 'Polygon'}</li>
          {filterMode === 'circle' ? (
            <>
              <li>Center: {center[0].toFixed(6)}, {center[1].toFixed(6)}</li>
              <li>Radius: {radius} km</li>
            </>
          ) : (
            <>
              <li>Polygon Points: {polygonCoordinates.length}</li>
              {polygonCoordinates.length >= 3 && <li>✓ Polygon is complete (3+ points)</li>}
              {polygonCoordinates.length < 3 && polygonCoordinates.length > 0 && (
                <li>⚠️ Need {3 - polygonCoordinates.length} more point(s) to complete polygon</li>
              )}
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

// Main wrapper component that handles SSR
const MapWidget: React.FC<MapWidgetProps> = (props) => {
  return (
    <BrowserOnly fallback={
      <div style={{ margin: '20px 0' }}>
        <div style={{ marginBottom: '20px' }}>
          <h3>{props.title || "Interactive Map Widget"}</h3>
          <p>Loading map components...</p>
        </div>
        <div style={{ 
          height: '400px', 
          width: '100%', 
          marginBottom: '20px', 
          border: '1px solid #ccc', 
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5'
        }}>
          <div>Map will load on client-side...</div>
        </div>
      </div>
    }>
      {() => <MapComponent {...props} />}
    </BrowserOnly>
  );
};

export default MapWidget;