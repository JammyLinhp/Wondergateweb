#!/usr/bin/env bash
# 启动本地开发服务 (5172) — 必须保持此终端窗口打开
set -euo pipefail
cd "$(dirname "$0")/.."

PORT="${PORT:-5172}"
HMR_PORT="${HMR_PORT:-24679}"

# 若端口已被占用，先清理旧进程（避免「刚才能用现在又拒绝访问」）
if lsof -ti ":$PORT" >/dev/null 2>&1; then
  echo "Cleaning stale process on port $PORT..."
  lsof -ti ":$PORT" | xargs kill -9 2>/dev/null || true
  sleep 1
fi

if [[ ! -d node_modules/esbuild ]] && [[ ! -f node_modules/.pnpm/esbuild@*/node_modules/esbuild/bin/esbuild ]]; then
  echo "Installing dependencies (esbuild)..."
  CI=true pnpm install
fi

echo "=========================================="
echo " Wondergate dev server"
echo " URL: http://127.0.0.1:$PORT"
echo " IMPORTANT: Keep this window OPEN"
echo " Closing it = connection refused"
echo "=========================================="
echo ""

export PORT HMR_PORT
exec node server.js
