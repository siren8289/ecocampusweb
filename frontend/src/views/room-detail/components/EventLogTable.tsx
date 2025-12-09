import { CheckCircle, XCircle } from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/common/Table';
import { EmptyState } from '@/components/common/EmptyState';

interface RoomEvent {
  id: string;
  timestamp: Date;
  rssi: number;
  occupied: boolean;
}

interface EventLogTableProps {
  events: RoomEvent[];
}

export function EventLogTable({ events }: EventLogTableProps) {
  return (
    <div className="overflow-x-auto">
      <div className="max-h-96 overflow-y-auto">
        <Table>
          <TableHeader sticky>
            <TableRow>
              <TableHead>시간</TableHead>
              <TableHead>RSSI 값</TableHead>
              <TableHead>점유 상태</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="text-gray-600">
                  {event.timestamp.toLocaleString('ko-KR')}
                </TableCell>
                <TableCell className="text-gray-900">
                  {event.rssi.toFixed(1)} dBm
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {event.occupied ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-orange-600" />
                        <span className="text-orange-600">사용 중</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-green-600" />
                        <span className="text-green-600">사용 가능</span>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {events.length === 0 && (
        <EmptyState message="이벤트 로그가 없습니다." />
      )}
    </div>
  );
}