import Link from 'next/link';
import { Home, AlertCircle } from 'lucide-react';

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-50">
      <div className="text-center">
        <AlertCircle className="w-24 h-24 text-gray-400 mx-auto mb-6" />
        <h1 className="text-gray-900 mb-2">404</h1>
        <h2 className="text-gray-700 mb-4">페이지를 찾을 수 없습니다</h2>
        <p className="text-gray-600 mb-8">
          요청하신 페이지가 존재하지 않거나 이동되었습니다.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Home className="w-5 h-5" />
          대시보드로 돌아가기
        </Link>
      </div>
    </div>
  );
}
