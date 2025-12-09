import { useState, useEffect } from 'react';
import { RoomCard } from './components/RoomCard';
import { SystemStatusPanel } from './components/SystemStatusPanel';
import { RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { Room, generateMockRooms } from '../../utils/mockData';

export function Dashboard() {
  const [rooms, setRooms] = useState<Room[]>(generateMockRooms());
  const [lastSync, setLastSync] = useState(new Date());
  const [serverStatus, setServerStatus] = useState<'online' | 'offline'>('online');

  // 실시간 업데이트 시뮬레이션
  useEffect(() => {
    const interval = setInterval(() => {
      setRooms(prevRooms =>
        prevRooms.map(room => {
          if (Math.random() < 0.15) {
            const change = Math.floor(Math.random() * 6) - 3;
            const newOccupancy = Math.max(0, Math.min(room.capacity, room.currentOccupancy + change));

            let newStatus: 'available' | 'occupied' | 'full';
            if (newOccupancy === 0) newStatus = 'available';
            else if (newOccupancy >= room.capacity * 0.9) newStatus = 'full';
            else newStatus = 'occupied';

            // RSSI 값 업데이트
            const newRssi = -50 + Math.floor(Math.random() * 40);

            return {
              ...room,
              currentOccupancy: newOccupancy,
              status: newStatus,
              rssi: newRssi,
              lastUpdate: new Date(),
            };
          }
          return room;
        })
      );
      setLastSync(new Date());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-gray-900 flex items-center gap-3">
                EcoCampus+
                <span className="text-gray-500">강의실 모니터링</span>
              </h1>
              <div className="flex items-center gap-6 mt-3 text-gray-600">
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  <span>마지막 동기화: {lastSync.toLocaleTimeString('ko-KR')}</span>
                </div>
                <div className="flex items-center gap-2">
                  {serverStatus === 'online' ? (
                    <>
                      <Wifi className="w-4 h-4 text-[#81D18A]" />
                      <span className="text-[#81D18A]">서버 온라인</span>
                    </>
                  ) : (
                    <>
                      <WifiOff className="w-4 h-4 text-red-600" />
                      <span className="text-red-600">서버 오프라인</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-8 py-6">
          {/* System Status */}
          <div className="mb-8">
            <SystemStatusPanel />
          </div>

          {/* Room Card Grid */}
          <div>
            <h2 className="text-gray-900 mb-4">강의실 현황</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {rooms.map(room => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}