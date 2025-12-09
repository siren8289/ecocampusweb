import { useState } from 'react';
import { Plus, Edit, Trash2, X, Save, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/common/Table';
import { IconButton } from '@/components/common/IconButton';
import { InfoBox } from '@/components/common/InfoBox';

interface Room {
  id: string;
  name: string;
  building: string;
  capacity: number;
}

export function RoomManagement() {
  const [rooms, setRooms] = useState<Room[]>([
    { id: 'room-1', name: '101호', building: 'A동', capacity: 50 },
    { id: 'room-2', name: '102호', building: 'A동', capacity: 80 },
    { id: 'room-3', name: '103호', building: 'A동', capacity: 30 },
    { id: 'room-4', name: '201호', building: 'B동', capacity: 100 },
    { id: 'room-5', name: '202호', building: 'B동', capacity: 60 },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newRoom, setNewRoom] = useState({ name: '', building: '', capacity: 0 });
  const [editRoom, setEditRoom] = useState<Room | null>(null);

  const handleAddRoom = () => {
    if (newRoom.name && newRoom.building && newRoom.capacity > 0) {
      const room: Room = {
        id: `room-${Date.now()}`,
        ...newRoom,
      };
      setRooms([...rooms, room]);
      setNewRoom({ name: '', building: '', capacity: 0 });
      setIsAdding(false);
    }
  };

  const handleEditRoom = (room: Room) => {
    setEditingId(room.id);
    setEditRoom({ ...room });
  };

  const handleSaveEdit = () => {
    if (editRoom && editRoom.name && editRoom.building && editRoom.capacity > 0) {
      setRooms(rooms.map(r => r.id === editRoom.id ? editRoom : r));
      setEditingId(null);
      setEditRoom(null);
    }
  };

  const handleDeleteRoom = (id: string) => {
    if (confirm('정말로 이 강의실을 삭제하시겠습니까?')) {
      setRooms(rooms.filter(r => r.id !== id));
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>강의실 목록</CardTitle>
          <Button
            onClick={() => setIsAdding(true)}
            icon={<Plus className="w-4 h-4" />}
          >
            강의실 추가
          </Button>
        </div>
      </CardHeader>

      {/* Add Room Form */}
      {isAdding && (
        <InfoBox variant="info" className="mb-6">
          <h3 className="text-gray-900 mb-3">새 강의실 추가</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Input
              label="강의실명"
              value={newRoom.name}
              onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
              placeholder="예: 101호"
            />
            <Input
              label="건물"
              value={newRoom.building}
              onChange={(e) => setNewRoom({ ...newRoom, building: e.target.value })}
              placeholder="예: A동"
            />
            <Input
              label="수용 인원"
              type="number"
              value={newRoom.capacity || ''}
              onChange={(e) => setNewRoom({ ...newRoom, capacity: Number(e.target.value) })}
              placeholder="예: 50"
            />
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleAddRoom}
              icon={<Save className="w-4 h-4" />}
            >
              저장
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setIsAdding(false);
                setNewRoom({ name: '', building: '', capacity: 0 });
              }}
            >
              취소
            </Button>
          </div>
        </InfoBox>
      )}

      {/* Room Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>강의실명</TableHead>
            <TableHead>건물</TableHead>
            <TableHead>수용 인원</TableHead>
            <TableHead>작업</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rooms.map(room => (
            <TableRow key={room.id}>
              {editingId === room.id && editRoom ? (
                <>
                  <TableCell>
                    <input
                      type="text"
                      value={editRoom.name}
                      onChange={(e) => setEditRoom({ ...editRoom, name: e.target.value })}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      type="text"
                      value={editRoom.building}
                      onChange={(e) => setEditRoom({ ...editRoom, building: e.target.value })}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      type="number"
                      value={editRoom.capacity}
                      onChange={(e) => setEditRoom({ ...editRoom, capacity: Number(e.target.value) })}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <IconButton
                        icon={<Save className="w-4 h-4" />}
                        variant="primary"
                        onClick={handleSaveEdit}
                        tooltip="저장"
                      />
                      <IconButton
                        icon={<X className="w-4 h-4" />}
                        onClick={() => {
                          setEditingId(null);
                          setEditRoom(null);
                        }}
                        tooltip="취소"
                      />
                    </div>
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell className="text-gray-900">{room.name}</TableCell>
                  <TableCell className="text-gray-600">{room.building}</TableCell>
                  <TableCell className="text-gray-600">{room.capacity}명</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Link href={`/room/${room.id}`}>
                        <IconButton
                          icon={<ExternalLink className="w-4 h-4" />}
                          variant="primary"
                          tooltip="상세 보기"
                        />
                      </Link>
                      <IconButton
                        icon={<Edit className="w-4 h-4" />}
                        variant="primary"
                        onClick={() => handleEditRoom(room)}
                        tooltip="수정"
                      />
                      <IconButton
                        icon={<Trash2 className="w-4 h-4" />}
                        variant="danger"
                        onClick={() => handleDeleteRoom(room.id)}
                        tooltip="삭제"
                      />
                    </div>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-4 text-gray-600">
        총 {rooms.length}개의 강의실
      </div>
    </Card>
  );
}