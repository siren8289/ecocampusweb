'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Radio, Clock } from 'lucide-react';
import { RSSIGraph } from '@/views/room-detail/components/RSSIGraph';
import { EventLogTable } from '@/views/room-detail/components/EventLogTable';
import { ThresholdSettings } from '@/views/room-detail/components/ThresholdSettings';
import { BeaconInfoPanel } from '@/views/room-detail/components/BeaconInfoPanel';
import { generateMockRooms, generateRSSIData, generateRoomEventLogs, Beacon } from '@/utils/mockData';

export default function RoomDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const rooms = generateMockRooms();
  const room = rooms.find(r => r.id === id);

  const [rssiData, setRssiData] = useState(generateRSSIData());
  const [events, setEvents] = useState(generateRoomEventLogs());
  const [threshold, setThreshold] = useState(-70);
  const [currentRssi, setCurrentRssi] = useState(-65);

  const beacons: Beacon[] = [
    { id: 'beacon-1', uuid: 'FDA50693-A4E2-4FB1-AFCF-C6EB07647825', major: 1, minor: 1, rssi: -65, battery: 85, lastSeen: new Date() },
    { id: 'beacon-2', uuid: 'FDA50693-A4E2-4FB1-AFCF-C6EB07647825', major: 1, minor: 2, rssi: -72, battery: 92, lastSeen: new Date() },
    { id: 'beacon-3', uuid: 'FDA50693-A4E2-4FB1-AFCF-C6EB07647825', major: 1, minor: 3, rssi: -58, battery: 78, lastSeen: new Date() },
  ];

  // 실시간 RSSI 데이터 업데이트
  useEffect(() => {
    const interval = setInterval(() => {
      setRssiData(prev => {
        const newData = [...prev.slice(1)];
        const timestamp = new Date();
        const newRssi = -60 + Math.random() * 20;
        setCurrentRssi(newRssi);
        
        newData.push({
          time: timestamp.toLocaleTimeString('ko-KR'),
          beacon1: -60 + Math.random() * 20,
          beacon2: -70 + Math.random() * 20,
          beacon3: -55 + Math.random() * 25,
        });
        return newData;
      });

      // 이벤트 로그 추가
      if (Math.random() < 0.3) {
        const newEvent = {
          id: `event-${Date.now()}`,
          timestamp: new Date(),
          rssi: currentRssi,
          occupied: Math.random() > 0.5,
        };
        setEvents(prev => [newEvent, ...prev.slice(0, 19)]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [currentRssi]);

  if (!room) {
    return (
      <div className="flex flex-col h-full items-center justify-center">
        <div className="text-center">
          <h2 className="text-gray-900 mb-4">강의실을 찾을 수 없습니다</h2>
          <Link href="/dashboard" className="text-[#81D18A] hover:underline">
            대시보드로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const lastUpdate = room.lastUpdate || new Date();
  const timeDiff = Math.floor((Date.now() - lastUpdate.getTime()) / 1000);

  return (
    <div className="flex flex-col h-full">
      {/* Room Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
        <div className="px-8 py-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-blue-600 hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            대시보드로 돌아가기
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-gray-900">{room.name}</h1>
              <div className="flex items-center gap-6 mt-3">
                <div>
                  <span className="text-gray-600">상태: </span>
                  <span className={`${
                    room.status === 'available' ? 'text-green-600' :
                    room.status === 'occupied' ? 'text-orange-600' :
                    'text-red-600'
                  }`}>
                    {room.status === 'available' ? '사용 가능' : '사용 중'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Radio className="w-4 h-4" />
                  <span>현재 RSSI: <span className="text-gray-900">{currentRssi.toFixed(1)} dBm</span></span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>마지막 업데이트: <span className="text-gray-900">
                    {timeDiff < 60 ? `${timeDiff}초 전` : `${Math.floor(timeDiff / 60)}분 전`}
                  </span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* RSSI Real-time Graph */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-gray-900 mb-4">실시간 RSSI 그래프</h2>
                <RSSIGraph data={rssiData} threshold={threshold} />
              </div>

              {/* Event Log */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-gray-900 mb-4">이벤트 로그</h2>
                <EventLogTable events={events} />
              </div>
            </div>

            {/* Right Column - Settings & Info */}
            <div className="space-y-6">
              {/* Threshold Setting */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-gray-900 mb-4">임계값 설정</h2>
                <ThresholdSettings threshold={threshold} setThreshold={setThreshold} />
              </div>

              {/* Beacon Info */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-gray-900 mb-4">비콘 정보</h2>
                <BeaconInfoPanel beacons={beacons} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

