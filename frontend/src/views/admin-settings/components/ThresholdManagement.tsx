import { useState } from 'react';
import { Save } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { InfoBox } from '@/components/common/InfoBox';

export function ThresholdManagement() {
  const [threshold, setThreshold] = useState(-70);
  const [tempThreshold, setTempThreshold] = useState(-70);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setThreshold(tempThreshold);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempThreshold(threshold);
    setIsEditing(false);
  };

  return (
    <Card>
      <h2 className="text-gray-900 mb-6">RSSI 임계값 설정</h2>

      {/* Current Threshold Value */}
      <div className="mb-6">
        <div className="text-gray-700 mb-3">현재 임계값</div>
        <div className="text-center py-6 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="text-gray-900 mb-1">{threshold} dBm</div>
          <div className="text-gray-600">
            {threshold > -60 ? '근거리 감지' :
             threshold > -75 ? '중거리 감지' :
             '원거리 감지'}
          </div>
        </div>
      </div>

      {/* Adjust Threshold */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-gray-900 mb-4">임계값 조정</h3>
        
        {!isEditing ? (
          <Button
            onClick={() => setIsEditing(true)}
            className="w-full"
          >
            임계값 수정
          </Button>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-3">
                새로운 임계값 (dBm)
              </label>
              <div className="flex items-center gap-4 mb-2">
                <input
                  type="range"
                  min="-100"
                  max="-40"
                  value={tempThreshold}
                  onChange={(e) => setTempThreshold(Number(e.target.value))}
                  className="flex-1"
                />
                <div className="w-24 px-3 py-2 bg-gray-100 rounded text-center text-gray-900">
                  {tempThreshold}
                </div>
              </div>
              <div className="text-gray-600 text-center">
                {tempThreshold > -60 ? '근거리 감지 (매우 가까운 거리)' :
                 tempThreshold > -75 ? '중거리 감지 (일반적인 실내 거리)' :
                 '원거리 감지 (넓은 범위)'}
              </div>
            </div>

            {/* Preset Values */}
            <div>
              <div className="text-gray-700 mb-2">추천 설정값</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <button
                  onClick={() => setTempThreshold(-60)}
                  className={`p-3 rounded-lg border transition-colors ${
                    tempThreshold === -60
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-gray-900">-60 dBm</div>
                  <div className="text-gray-600">근거리</div>
                </button>
                <button
                  onClick={() => setTempThreshold(-70)}
                  className={`p-3 rounded-lg border transition-colors ${
                    tempThreshold === -70
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-gray-900">-70 dBm</div>
                  <div className="text-gray-600">중거리</div>
                </button>
                <button
                  onClick={() => setTempThreshold(-80)}
                  className={`p-3 rounded-lg border transition-colors ${
                    tempThreshold === -80
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-gray-900">-80 dBm</div>
                  <div className="text-gray-600">원거리</div>
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                icon={<Save className="w-4 h-4" />}
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

      {/* Info */}
      <InfoBox variant="info" className="mt-6" title="임계값 설정 안내">
        <ul className="space-y-1">
          <li>• RSSI 값이 설정된 임계값보다 높을 때 비콘이 감지됩니다</li>
          <li>• 값이 높을수록(-40에 가까울수록) 가까운 거리만 감지합니다</li>
          <li>• 값이 낮을수록(-100에 가까울수록) 먼 거리까지 감지합니다</li>
        </ul>
      </InfoBox>
    </Card>
  );
}