import { NextResponse } from 'next/server';
import { redis } from '../../../lib/upstash'; // 确认路径

export const dynamic = 'force-dynamic'; // 确保每次都是动态执行

export async function GET(request) {
  const secret = process.env.KEEPALIVE_SECRET;
  const { searchParams } = new URL(request.url);
  const secretFromQuery = searchParams.get('secret');

  if (!secret || secretFromQuery !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await redis.ping();
    return NextResponse.json({ status: 'ok', redis_response: 'PONG' });
  } catch (error) {
    console.error('Keep-alive ping failed:', error);
    return NextResponse.json({ error: 'Failed to ping database' }, { status: 500 });
  }
}
```5.  **提交文件**：
*   拉到页面底部，点击绿色的 `Commit new file` 按钮。
