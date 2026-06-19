#!/usr/bin/env bash
# SEO 改造验收脚本 — 请先启动: PORT=5172 node server.js
set -euo pipefail

BASE="${1:-http://localhost:5172}"
SLUG="${2:-wondergate-google-pay-certified-partner}"
PASS=0
FAIL=0

green() { printf '\033[32m✓ %s\033[0m\n' "$1"; PASS=$((PASS + 1)); }
red()   { printf '\033[31m✗ %s\033[0m\n' "$1"; FAIL=$((FAIL + 1)); }

fetch() {
  curl -s -m 20 "$1" 2>/dev/null || true
}

echo "=========================================="
echo " Wondergate SEO 验收"
echo " 服务地址: $BASE"
echo " 博客 slug: $SLUG"
echo "=========================================="
echo ""

# 0. 服务是否在线
code=$(curl -s -m 5 -o /dev/null -w '%{http_code}' "$BASE/" || echo "000")
if [[ "$code" == "200" ]]; then
  green "服务可访问 (HTTP $code)"
else
  red "服务不可访问 (HTTP $code) — 请先执行: PORT=5172 node server.js"
  exit 1
fi

# 1. server.js 是否含 SEO SSR 逻辑（不依赖网络）
if grep -q 'getPageMeta' server.js 2>/dev/null && grep -q 'enrichPostFromList' server.js 2>/dev/null; then
  green "本地 server.js 含 SEO SSR 代码 (getPageMeta / enrichPostFromList)"
else
  red "本地 server.js 仍是旧版（无 getPageMeta）— SEO 改造未应用"
fi

# 2. 博客详情 — 独立 title
html=$(fetch "$BASE/blog/detail/$SLUG")
if echo "$html" | grep -q '<title>Wondergate Is Now a Certified Google Pay Partner | Wondergate</title>'; then
  green "博客详情页 title 已差异化"
else
  red "博客详情页 title 不符合预期（可能仍是 Wondergate）"
fi

# 3. 博客详情 — 首屏 H1 + 正文（无 JS 也可在源码里看到）
if echo "$html" | grep -q '<h1 class="blog-title"'; then
  green "博客详情页 HTML 含 <h1>"
else
  red "博客详情页 HTML 无 <h1>（可能仍是 CSR Loading）"
fi
if echo "$html" | grep -q 'class="blog-content"'; then
  green "博客详情页 HTML 含正文区域 blog-content"
else
  red "博客详情页 HTML 无 blog-content 正文"
fi

# 4. canonical
if echo "$html" | grep -q "rel=\"canonical\" href=\"https://www.wondergate.io/blog/detail/$SLUG\""; then
  green "博客详情页 canonical 正确"
else
  red "博客详情页缺少或 canonical 错误"
fi

# 5. meta description 非空
if echo "$html" | grep -q 'name="description" content="May 29'; then
  green "博客详情页 meta description 非空"
else
  red "博客详情页 meta description 为空或异常"
fi

# 6. og:image（从列表接口补封面）
if echo "$html" | grep -q 'property="og:image"'; then
  green "博客详情页含 og:image"
else
  red "博客详情页缺少 og:image（封面图未合并）"
fi

# 7. JSON-LD Article
if echo "$html" | grep -q 'application/ld+json'; then
  green "博客详情页含 JSON-LD"
else
  red "博客详情页缺少 JSON-LD"
fi

# 8. 首页 title
home=$(fetch "$BASE/home")
if echo "$home" | grep -q 'Global Cross-Border Payment Gateway & API | Wondergate'; then
  green "首页 title 符合 SEO 文档"
else
  red "首页 title 不符合预期"
fi

# 9. 博客列表 — 首屏有文章标题
blog=$(fetch "$BASE/blog")
if echo "$blog" | grep -q 'news-item-title'; then
  green "博客列表页 HTML 含文章列表"
else
  red "博客列表页首屏无文章列表"
fi

# 10. robots.txt
robots=$(fetch "$BASE/robots.txt")
if echo "$robots" | grep -q 'sitemap_index.xml'; then
  green "robots.txt 指向 sitemap_index.xml"
else
  red "robots.txt 未指向 sitemap_index"
fi

# 11. .env 开发 API 基址
if grep -q 'VITE_HTTP_BASE=/api' .env 2>/dev/null; then
  green ".env 已配置 VITE_HTTP_BASE=/api（客户端 API 走代理）"
else
  red ".env 缺少 VITE_HTTP_BASE=/api（浏览器内 API 可能异常）"
fi

echo ""
echo "=========================================="
echo " 结果: 通过 $PASS 项, 失败 $FAIL 项"
echo "=========================================="
if [[ "$FAIL" -gt 0 ]]; then
  exit 1
fi
