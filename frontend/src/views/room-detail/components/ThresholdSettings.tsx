import { useState } from 'react';
import { Lock, Unlock } from 'lucide-react';
import { Button } from '@/components/common/Button';

interface ThresholdSettingsProps {
  threshold: number;
  setThreshold: (value: number) => void;
}

export function ThresholdSettings({ threshold, setThreshold }: ThresholdSettingsProps) {
  const [isAdmin] = useState(true); // 임시로 true, 실제로는 권한 체크 필요
  const [isEditing, setIsEditing] = useState(false);
  const [tempThreshold, setTempThreshold] = useState(threshold);

  const handleSave = () => {
    setThreshold(tempThreshold);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempThreshold(threshold);
    setIsEditing(false);
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-700">현재 임계값</span>
          {isAdmin ? (
            <Unlock className="w-4 h-4 text-green-600" />
          ) : (
            <Lock className="w-4 h-4 text-gray-400" />
          )}
        </div>
        <div className="text-gray-900 text-center py-3 bg-gray-50 rounded-lg border border-gray-200">
          {threshold} dBm
        </div>
      </div>

      {isAdmin && (
        <div className="pt-4 border-t border-gray-200">
          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
              className="w-full"
            >
              임계값 수정
            </Button>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="block text-gray-700 mb-2">
                  새로운 임계값 (dBm)
                </label>
                <input
                  type="range"
                  min="-100"
                  max="-40"
                  value={tempThreshold}
                  onChange={(e) => setTempThreshold(Number(e.target.value))}
                  className="w-full"
                />
                <div className="text-center text-gray-900 mt-2">
                  {tempThreshold} dBm
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleSave}
                  className="flex-1"
                >
                  저장
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleCancel}
                  className="flex-1"
                >
                  취소
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {!isAdmin && (
        <div className="pt-4 border-t border-gray-200 text-gray-500 text-center">
          관리자 권한이 필요합니다
        </div>
      )}
    </div>
  );
}