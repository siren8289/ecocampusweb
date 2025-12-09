import { useState, useEffect } from 'react';
import { SystemStatusPanel } from './components/SystemStatusPanel';
import { ScannerStatusList } from './components/ScannerStatusList';
import { BeaconListTable } from './components/BeaconListTable';

interface ServerStatus {
  status: 'online' | 'offline';
  cpu: number;
  memory: number;
  errorLogs: string[];
}

export function SystemMonitor() {
  const [serverStatus, setServerStatus] = useState<ServerStatus>({
    status: 'online',
    cpu: 45,
    memory: 62,
    errorLogs: [],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setServerStatus(prev => ({
        ...prev,
        cpu: Math.max(20, Math.min(80, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(40, Math.min(85, prev.memory + (Math.random() - 0.5) * 5)),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
        <div className="px-8 py-6">
          <h1 className="text-gray-900">시스템 모니터</h1>
          <p className="text-gray-600 mt-2">실시간 시스템 상태 모니터링</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-8 py-6 space-y-6">
          {/* System Status Overview */}
          <SystemStatusPanel />

          {/* Raspberry Pi Scanner Status */}
          <div>
            <h2 className="text-gray-900 mb-4">라즈베리파이 스캐너 상태</h2>
            <ScannerStatusList />
          </div>

          {/* Beacon List */}
          <div>
            <h2 className="text-gray-900 mb-4">비콘 목록</h2>
            <BeaconListTable />
          </div>
        </div>
      </div>
    </div>
  );
}
