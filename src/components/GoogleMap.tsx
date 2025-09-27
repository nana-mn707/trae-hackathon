import React, { useEffect, useRef } from 'react';

interface GoogleMapProps {
  activities: Array<{
    id: string;
    name: string;
    location: string;
    description?: string;
    duration?: number;
    cost?: number;
    category?: string;
    latitude?: number;
    longitude?: number;
  }>;
  className?: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ activities, className = '' }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  // 京都の主要観光地の座標データ
  const locationCoordinates: { [key: string]: { lat: number; lng: number } } = {
    '京都市東山区': { lat: 34.9947, lng: 135.7849 }, // 清水寺
    '京都市右京区': { lat: 35.0170, lng: 135.6761 }, // 嵐山竹林
    '嵐山': { lat: 35.0170, lng: 135.6761 }, // 嵐山エリア
    '京都市北区': { lat: 35.0394, lng: 135.7292 }, // 金閣寺
    '清水寺': { lat: 34.9947, lng: 135.7849 },
    '嵐山竹林': { lat: 35.0170, lng: 135.6761 },
    '金閣寺': { lat: 35.0394, lng: 135.7292 },
    '京都駅': { lat: 34.9858, lng: 135.7581 },
    '祇園': { lat: 35.0036, lng: 135.7778 },
    '二条城': { lat: 35.0142, lng: 135.7481 }
  };

  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current) return;

      // 京都駅を中心とした地図を初期化
      const map = new google.maps.Map(mapRef.current, {
        zoom: 12,
        center: { lat: 34.9858, lng: 135.7581 }, // 京都駅
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
      });

      mapInstanceRef.current = map;

      // アクティビティの場所にマーカーを追加
      const bounds = new google.maps.LatLngBounds();
      const waypoints: google.maps.DirectionsWaypoint[] = [];
      let origin: google.maps.LatLng | null = null;
      let destination: google.maps.LatLng | null = null;

      activities.forEach((activity, index) => {
        const coords = locationCoordinates[activity.location];
        if (coords) {
          const position = new google.maps.LatLng(coords.lat, coords.lng);
          
          // マーカーを追加
          const marker = new google.maps.Marker({
            position,
            map,
            title: activity.name,
            label: {
              text: (index + 1).toString(),
              color: 'white',
              fontWeight: 'bold'
            },
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 20,
              fillColor: index === 0 ? '#10B981' : index === activities.length - 1 ? '#EF4444' : '#3B82F6',
              fillOpacity: 1,
              strokeColor: 'white',
              strokeWeight: 2
            }
          });

          // 情報ウィンドウを追加（アクティビティの詳細情報を含む）
          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div style="padding: 12px; max-width: 250px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold; color: #1f2937;">${activity.name}</h3>
                <p style="margin: 0 0 6px 0; font-size: 13px; color: #6b7280;">📍 ${activity.location}</p>
                <p style="margin: 0 0 6px 0; font-size: 13px; color: #374151;">${activity.description || ''}</p>
                <div style="display: flex; gap: 12px; margin-top: 8px; font-size: 12px;">
                  ${activity.duration ? `<span style="color: #059669;">⏱️ ${activity.duration}分</span>` : ''}
                  ${activity.cost ? `<span style="color: #dc2626;">💰 ¥${activity.cost.toLocaleString()}</span>` : ''}
                </div>
                <div style="margin-top: 8px; font-size: 11px; color: #9ca3af;">訪問順: ${index + 1}番目</div>
              </div>
            `
          });

          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });

          bounds.extend(position);

          // ルート計算用の起点・終点・経由地を設定
          if (index === 0) {
            origin = position;
          } else if (index === activities.length - 1) {
            destination = position;
          } else {
            waypoints.push({ location: position, stopover: true });
          }
        }
      });

      // 地図の表示範囲を調整
      if (activities.length > 0) {
        map.fitBounds(bounds);
      }

      // ルートを表示（3つ以上の地点がある場合）
      if (origin && destination && activities.length >= 2) {
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer({
          suppressMarkers: true, // カスタムマーカーを使用するため
          polylineOptions: {
            strokeColor: '#EC4899',
            strokeWeight: 4,
            strokeOpacity: 0.8
          }
        });

        directionsRenderer.setMap(map);

        directionsService.route(
          {
            origin,
            destination,
            waypoints,
            travelMode: google.maps.TravelMode.WALKING,
            optimizeWaypoints: true
          },
          (result, status) => {
            if (status === 'OK' && result) {
              directionsRenderer.setDirections(result);
            }
          }
        );
      }
    };

    // Google Maps APIが読み込まれているかチェック
    if (window.google && window.google.maps) {
      initMap();
    } else {
      // Google Maps APIを動的に読み込み
      const script = document.createElement('script');
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'demo_key';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    }
  }, [activities]);

  return (
    <div className={`w-full h-64 bg-gray-100 rounded-lg overflow-hidden ${className}`}>
      <div ref={mapRef} className="w-full h-full" />
      {/* APIキーが設定されていない場合の代替表示 */}
      {(!import.meta.env.VITE_GOOGLE_MAPS_API_KEY || import.meta.env.VITE_GOOGLE_MAPS_API_KEY === 'your_google_maps_api_key_here') && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center p-4">
            <div className="text-4xl mb-2">🗺️</div>
            <p className="text-sm text-gray-600 mb-2">Google Maps</p>
            <p className="text-xs text-gray-500">APIキーを設定してください</p>
            <div className="mt-3 space-y-1">
              {activities.map((activity, index) => (
                <div key={activity.id} className="flex items-center justify-center space-x-2 text-xs">
                  <span className="w-4 h-4 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">
                    {index + 1}
                  </span>
                  <span>{activity.name} ({activity.location})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleMap;