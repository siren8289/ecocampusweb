import { useState, useEffect } from 'react';
import { Wifi, Server, Database, CheckCircle, AlertCircle } from 'lucide-react';
import { StatusCard } from '@/components/common/StatusCard';

export function SystemStatusPanel() {
  const [scannerStatus, setScannerStatus] = useState({ online: 5, total: 5 });
  const [serverStatus, setServerStatus] = useState<'online' | 'offline'>('online');
  const [dbStatus, setDbStatus] = useState<'connected' | 'disconnected'>('connected');

  useEffect(() => {
    // 시뮬레이션: 가끔 스캐너 상태 변경
    const interval = setInterval(() => {
      if (Math.random() < 0.1) {
        const online = 4 + Math.floor(Math.random() * 2);
        setScannerStatus({ online, total: 5 });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2 className="text-gray-900 mb-4">시스템 상태</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Raspberry Pi Scanner Status */}
        <StatusCard
          title="비콘 스캐너"
          subtitle="4대 활성"
          icon={Wifi}
          iconBgColor="bg-[#A8E6AF]"
          iconColor="text-[#6BBF76]"
          statusIcon={<CheckCircle className="w-5 h-5 text-[#81D18A]" />}
          statusText="정상"
          statusColor="text-[#81D18A]"
          additionalInfo="마지막 동기화: 방금 전"
        />

        {/* Server Status */}
        <StatusCard
          title="서버 상태"
          subtitle="응답 시간: 45ms"
          icon={Server}
          iconBgColor="bg-[#A8E6AF]"
          iconColor="text-[#6BBF76]"
          statusIcon={<CheckCircle className="w-5 h-5 text-[#81D18A]" />}
          statusText="양호"
          statusColor="text-[#81D18A]"
          additionalInfo="CPU: 23% | 메모리: 45%"
        />

        {/* DB Connection Status */}
        <StatusCard
          title="데이터베이스"
          subtitle="연결 정상"
          icon={Database}
          iconBgColor="bg-[#A8E6AF]"
          iconColor="text-[#6BBF76]"
          statusIcon={<CheckCircle className="w-5 h-5 text-[#81D18A]" />}
          statusText="활성"
          statusColor="text-[#81D18A]"
          additionalInfo="쿼리 응답: 12ms"
        />
      </div>
    </div>
  );
}