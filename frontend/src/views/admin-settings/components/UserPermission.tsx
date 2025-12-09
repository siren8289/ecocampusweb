import { useState } from 'react';
import { Eye, Shield } from 'lucide-react';
import { Card, CardHeader } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/common/Table';
import { EmptyState } from '@/components/common/EmptyState';
import { InfoBox } from '@/components/common/InfoBox';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'read-only';
  lastLogin: Date;
}

export function UserPermission() {
  const [users, setUsers] = useState<User[]>([
    { id: 'user-1', name: '김관리자', email: 'admin@university.ac.kr', role: 'admin', lastLogin: new Date() },
    { id: 'user-2', name: '이매니저', email: 'manager@university.ac.kr', role: 'admin', lastLogin: new Date(Date.now() - 3600000) },
    { id: 'user-3', name: '박뷰어', email: 'viewer@university.ac.kr', role: 'read-only', lastLogin: new Date(Date.now() - 7200000) },
    { id: 'user-4', name: '최사용자', email: 'user@university.ac.kr', role: 'read-only', lastLogin: new Date(Date.now() - 86400000) },
  ]);

  const handleChangeRole = (userId: string, newRole: 'admin' | 'read-only') => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  const adminUsers = users.filter(u => u.role === 'admin');
  const readOnlyUsers = users.filter(u => u.role === 'read-only');

  return (
    <div className="space-y-6">
      {/* Admin User List */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-purple-600" />
            <h2 className="text-gray-900">관리자 목록</h2>
          </div>
        </CardHeader>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-32">이름</TableHead>
              <TableHead>이메일</TableHead>
              <TableHead className="w-28">권한</TableHead>
              <TableHead className="w-40">마지막 로그인</TableHead>
              <TableHead className="w-32">작업</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adminUsers.map(user => (
              <TableRow key={user.id}>
                <TableCell className="text-gray-900">{user.name}</TableCell>
                <TableCell className="text-gray-600">{user.email}</TableCell>
                <TableCell>
                  <Badge variant="purple">관리자</Badge>
                </TableCell>
                <TableCell className="text-gray-600 whitespace-nowrap">
                  {user.lastLogin.toLocaleString('ko-KR')}
                </TableCell>
                <TableCell>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleChangeRole(user.id, 'read-only')}
                    className="w-full"
                  >
                    읽기전용
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {adminUsers.length === 0 && (
          <EmptyState message="관리자가 없습니다" />
        )}

        <div className="mt-4 text-gray-600">
          총 {adminUsers.length}명의 관리자
        </div>
      </Card>

      {/* Read-only Users */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-blue-600" />
            <h2 className="text-gray-900">읽기전용 사용자</h2>
          </div>
        </CardHeader>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-32">이름</TableHead>
              <TableHead>이메일</TableHead>
              <TableHead className="w-28">권한</TableHead>
              <TableHead className="w-40">마지막 로그인</TableHead>
              <TableHead className="w-32">작업</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {readOnlyUsers.map(user => (
              <TableRow key={user.id}>
                <TableCell className="text-gray-900">{user.name}</TableCell>
                <TableCell className="text-gray-600">{user.email}</TableCell>
                <TableCell>
                  <Badge variant="info">읽기전용</Badge>
                </TableCell>
                <TableCell className="text-gray-600 whitespace-nowrap">
                  {user.lastLogin.toLocaleString('ko-KR')}
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    onClick={() => handleChangeRole(user.id, 'admin')}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    관리자
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {readOnlyUsers.length === 0 && (
          <EmptyState message="읽기전용 사용자가 없습니다" />
        )}

        <div className="mt-4 text-gray-600">
          총 {readOnlyUsers.length}명의 읽기전용 사용자
        </div>
      </Card>

      {/* Permission Info */}
      <Card>
        <h3 className="text-gray-900 mb-4">권한 설명</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoBox variant="info">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-purple-600" />
              <h4 className="text-gray-900">관리자</h4>
            </div>
            <ul className="space-y-1">
              <li>• 모든 페이지 접근 가능</li>
              <li>• 강의실 추가/수정/삭제</li>
              <li>• 임계값 설정 변경</li>
              <li>• 사용자 권한 관리</li>
            </ul>
          </InfoBox>

          <InfoBox variant="info">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-5 h-5 text-blue-600" />
              <h4 className="text-gray-900">읽기전용</h4>
            </div>
            <ul className="space-y-1">
              <li>• 대시보드 조회만 가능</li>
              <li>• 강의실 상태 확인</li>
              <li>• 시스템 모니터 확인</li>
              <li>• 설정 변경 불가</li>
            </ul>
          </InfoBox>
        </div>
      </Card>
    </div>
  );
}