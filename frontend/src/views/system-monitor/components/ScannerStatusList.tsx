import { useState, useEffect } from 'react';
import { Wifi, Clock, Activity } from 'lucide-react';
import { StatCard } from '@/components/common/StatCard';

interface Scanner {
  id: string;
  name: string;
  status: 'online' | 'offline';
  lastHeartbeat: Date;
  recentScanCount: number;
}

export function ScannerStatusList() {
  const [scanners, setScanners] = useState<Scanner[]>([
    { id: 'rpi-001', name: '스캐너 A-1F', status: 'online', lastHeartbeat: new Date(), recentScanCount: 24 },
    { id: 'rpi-002', name: '스캐너 A-2F', status: 'online', lastHeartbeat: new Date(), recentScanCount: 18 },
    { id: 'rpi-003', name: '스캐너 B-1F', status: 'online', lastHeartbeat: new Date(), recentScanCount: 31 },
    { id: 'rpi-004', name: '스캐너 B-2F', status: 'offline', lastHeartbeat: new Date(Date.now() - 300000), recentScanCount: 0 },
    { id: 'rpi-005', name: '스캐너 C-1F', status: 'online', lastHeartbeat: new Date(), recentScanCount: 15 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanners(prev =>
        prev.map(scanner => {
          if (scanner.status === 'online') {
            return {
              ...scanner,
              lastHeartbeat: new Date(),
              recentScanCount: Math.max(0, scanner.recentScanCount + Math.floor(Math.random() * 3 - 1)),
            };
          }
          return scanner;
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getTimeDiff = (date: Date) => {
    const diff = Math.floor((Date.now() - date.getTime()) / 1000);
    if (diff < 60) return `${diff}초 전`;
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
    return `${Math.floor(diff / 3600)}시간 전`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {scanners.map(scanner => (
        <div
          key={scanner.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${
                scanner.status === 'online' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <Wifi className={`w-5 h-5 ${
                  scanner.status === 'online' ? 'text-green-600' : 'text-red-600'
                }`} />
              </div>
              <div>
                <h3 className="text-gray-900">{scanner.name}</h3>
                <p className="text-gray-600">{scanner.id}</p>
              </div>
            </div>
            <div className={`w-3 h-3 rounded-full ${
              scanner.status === 'online' ? 'bg-green-500' : 'bg-red-500'
            }`} />
          </div>

          <div className="space-y-3">
            <div>
              <div className="text-gray-600 mb-1">상태</div>
              <div className={scanner.status === 'online' ? 'text-green-600' : 'text-red-600'}>
                {scanner.status === 'online' ? '온라인' : '오프라인'}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <Clock className="w-4 h-4" />
                <span>마지막 하트비트</span>
              </div>
              <div className="text-gray-900">
                {getTimeDiff(scanner.lastHeartbeat)}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <Activity className="w-4 h-4" />
                <span>최근 스캔 횟수</span>
              </div>
              <div className="text-gray-900">
                {scanner.recentScanCount}회
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}