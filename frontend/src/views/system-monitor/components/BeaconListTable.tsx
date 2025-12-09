import { useState, useEffect } from 'react';
import { Card } from '@/components/common/Card';
import { SearchInput } from '@/components/common/SearchInput';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/common/Table';
import { EmptyState } from '@/components/common/EmptyState';

interface BeaconData {
  id: string;
  uuid: string;
  major: number;
  minor: number;
  lastScan: Date;
}

export function BeaconListTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [beacons, setBeacons] = useState<BeaconData[]>([
    { id: 'beacon-001', uuid: 'FDA50693-A4E2-4FB1-AFCF-C6EB07647825', major: 1, minor: 1, lastScan: new Date() },
    { id: 'beacon-002', uuid: 'FDA50693-A4E2-4FB1-AFCF-C6EB07647825', major: 1, minor: 2, lastScan: new Date() },
    { id: 'beacon-003', uuid: 'FDA50693-A4E2-4FB1-AFCF-C6EB07647825', major: 1, minor: 3, lastScan: new Date() },
    { id: 'beacon-004', uuid: 'FDA50693-A4E2-4FB1-AFCF-C6EB07647825', major: 2, minor: 1, lastScan: new Date() },
    { id: 'beacon-005', uuid: 'FDA50693-A4E2-4FB1-AFCF-C6EB07647825', major: 2, minor: 2, lastScan: new Date() },
    { id: 'beacon-006', uuid: 'FDA50693-A4E2-4FB1-AFCF-C6EB07647825', major: 2, minor: 3, lastScan: new Date() },
    { id: 'beacon-007', uuid: 'FDA50693-A4E2-4FB1-AFCF-C6EB07647825', major: 3, minor: 1, lastScan: new Date() },
    { id: 'beacon-008', uuid: 'FDA50693-A4E2-4FB1-AFCF-C6EB07647825', major: 3, minor: 2, lastScan: new Date() },
    { id: 'beacon-009', uuid: 'FDA50693-A4E2-4FB1-AFCF-C6EB07647825', major: 3, minor: 3, lastScan: new Date() },
    { id: 'beacon-010', uuid: 'FDA50693-A4E2-4FB1-AFCF-C6EB07647825', major: 4, minor: 1, lastScan: new Date() },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBeacons(prev =>
        prev.map(beacon => ({
          ...beacon,
          lastScan: Math.random() > 0.3 ? new Date() : beacon.lastScan,
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const filteredBeacons = beacons.filter(beacon =>
    beacon.uuid.toLowerCase().includes(searchTerm.toLowerCase()) ||
    beacon.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${beacon.major}-${beacon.minor}`.includes(searchTerm)
  );

  const getTimeDiff = (date: Date) => {
    const diff = Math.floor((Date.now() - date.getTime()) / 1000);
    if (diff < 60) return `${diff}초 전`;
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
    return `${Math.floor(diff / 3600)}시간 전`;
  };

  return (
    <Card>
      {/* Search */}
      <div className="mb-4">
        <SearchInput
          placeholder="고유번호, ID, 메이저-마이너로 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Beacon Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>비콘 ID</TableHead>
            <TableHead>고유 번호</TableHead>
            <TableHead>메이저</TableHead>
            <TableHead>마이너</TableHead>
            <TableHead>마지막 스캔 시간</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredBeacons.map(beacon => (
            <TableRow key={beacon.id}>
              <TableCell className="text-gray-900">{beacon.id}</TableCell>
              <TableCell className="text-gray-600 font-mono text-sm">
                {beacon.uuid}
              </TableCell>
              <TableCell className="text-gray-900">{beacon.major}</TableCell>
              <TableCell className="text-gray-900">{beacon.minor}</TableCell>
              <TableCell className="text-gray-600">
                {beacon.lastScan.toLocaleString('ko-KR')}
                <div className="text-gray-500 mt-1">
                  ({getTimeDiff(beacon.lastScan)})
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {filteredBeacons.length === 0 && (
        <EmptyState message="검색 결과가 없습니다." />
      )}

      <div className="mt-4 text-gray-600">
        총 {filteredBeacons.length}개의 비콘
      </div>
    </Card>
  );
}