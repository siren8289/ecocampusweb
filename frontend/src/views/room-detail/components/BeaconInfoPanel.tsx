import { Radio, Battery, Clock } from 'lucide-react';
import { Beacon } from '../../../utils/mockData';

interface BeaconInfoPanelProps {
  beacons: Beacon[];
}

export function BeaconInfoPanel({ beacons }: BeaconInfoPanelProps) {
  const getBatteryColor = (battery: number) => {
    if (battery > 50) return 'text-green-600';
    if (battery > 20) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-4">
      {beacons.map((beacon) => {
        const timeDiff = Math.floor((Date.now() - beacon.lastSeen.getTime()) / 1000);
        
        return (
          <div
            key={beacon.id}
            className="p-4 bg-gray-50 rounded-lg border border-gray-200"
          >
            <div className="flex items-center gap-2 mb-3">
              <Radio className="w-5 h-5 text-blue-600" />
              <h3 className="text-gray-900">비콘 {beacon.minor}</h3>
            </div>

            <div className="space-y-2">
              <div>
                <div className="text-gray-600">고유 번호</div>
                <div className="text-gray-900 break-all mt-1">
                  {beacon.uuid}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <div className="text-gray-600">메이저</div>
                  <div className="text-gray-900">{beacon.major}</div>
                </div>
                <div>
                  <div className="text-gray-600">마이너</div>
                  <div className="text-gray-900">{beacon.minor}</div>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Battery className="w-4 h-4" />
                    <span>배터리</span>
                  </div>
                  <span className={getBatteryColor(beacon.battery)}>
                    {beacon.battery}%
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>마지막 스캔</span>
                  </div>
                  <span className="text-gray-900">
                    {timeDiff < 60 ? `${timeDiff}초 전` : `${Math.floor(timeDiff / 60)}분 전`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
