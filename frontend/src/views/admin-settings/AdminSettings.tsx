import { useState } from 'react';
import { Settings, Building, Sliders, Users } from 'lucide-react';
import { RoomManagement } from './components/RoomManagement';
import { ThresholdManagement } from './components/ThresholdManagement';
import { UserPermission } from './components/UserPermission';

export function AdminSettings() {
  const [activeTab, setActiveTab] = useState<'rooms' | 'thresholds' | 'users'>('rooms');

  const tabs = [
    { id: 'rooms', label: '강의실 관리', icon: Building },
    { id: 'thresholds', label: '임계값 관리', icon: Sliders },
    { id: 'users', label: '사용자 권한', icon: Users },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
        <div className="px-8 py-6">
          <div className="flex items-center gap-3">
            <Settings className="w-6 h-6 text-blue-600" />
            <h1 className="text-gray-900">관리자 설정</h1>
          </div>
          <p className="text-gray-600 mt-2">시스템 설정 및 권한 관리</p>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Tabs */}
        <div className="bg-white border-b border-gray-200 flex-shrink-0">
          <div className="px-8">
            <div className="flex gap-1">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-8 py-6">
            {activeTab === 'rooms' && <RoomManagement />}
            {activeTab === 'thresholds' && <ThresholdManagement />}
            {activeTab === 'users' && <UserPermission />}
          </div>
        </div>
      </div>
    </div>
  );
}
