'use client';

import { useState, useEffect } from 'react';
import { RoomCard } from '@/views/dashboard/components/RoomCard';
import { SystemStatusPanel } from '@/views/dashboard/components/SystemStatusPanel';
import { RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { dashboardApi, healthApi } from '@/utils/api';

interface Room {
  id: number;
  name: string;
  building: string;
  capacity: number;
  beaconMac: string;
  threshold: number;
  status?: {
    roomId: number;
    rssi: number | null;
    status: 'occupied' | 'vacant';
    updatedAt: string;
  };
}

export default function DashboardPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [lastSync, setLastSync] = useState(new Date());
  const [serverStatus, setServerStatus] = useState<'online' | 'offline'>('online');
  const [loading, setLoading] = useState(true);

  // 데이터 로드
  const loadData = async () => {
    try {
      // 서버 상태 확인
      const healthResponse = await healthApi.serverStatus();
      if (healthResponse.success) {
        setServerStatus('online');
      } else {
        setServerStatus('offline');
      }

      // 대시보드 데이터 로드
      const response = await dashboardApi.getData();
      if (response.data) {
        setRooms(response.data.rooms || []);
        setLastSync(new Date());
      }
    } catch (error) {
      console.error('Failed to load data:', error);
      setServerStatus('offline');
    } finally {
      setLoading(false);
    }
  };

  // 초기 로드 및 주기적 업데이트
  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 5000); // 5초마다 업데이트
    return () => clearInterval(interval);
  }, []);

  // Room 타입 변환 (프론트엔드 RoomCard에 맞게)
  const transformRoom = (room: Room) => {
    const status = room.status;
    return {
      id: room.id.toString(),
      name: room.name,
      building: room.building || '',
      capacity: room.capacity,
      currentOccupancy: 0, // 백엔드에서 제공하지 않으므로 0으로 설정
      status: status?.status === 'occupied' ? 'occupied' : 'available' as 'available' | 'occupied' | 'full',
      rssi: status?.rssi || -65,
      lastUpdate: status?.updatedAt ? new Date(status.updatedAt) : new Date(),
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-600">데이터를 불러오는 중...</div>
      </div>
    );
  }

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
            {rooms.length === 0 ? (
              <div className="text-center py-8 text-gray-600">
                강의실 데이터가 없습니다.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {rooms.map(room => (
                  <RoomCard key={room.id} room={transformRoom(room)} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
