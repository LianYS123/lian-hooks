import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  title: 'Common Hooks',
  mode: 'site',
  favicon:
    'https://blog-1259462774.cos.ap-shanghai.myqcloud.com/%E8%B4%A8%E9%87%8F%E5%B7%A5%E7%A8%8B%E5%B9%B3%E5%8F%B0.svg',
  logo:
    'https://blog-1259462774.cos.ap-shanghai.myqcloud.com/%E8%B4%A8%E9%87%8F%E5%B7%A5%E7%A8%8B%E5%B9%B3%E5%8F%B0.svg',
  outputPath: 'docs-dist',
  alias: {
    '@': path.join(__dirname, 'src'),
  },
  base: '/lian-hooks',
  publicPath: '/lian-hooks/',
  exportStatic: {}, // 将所有路由输出为 HTML 目录结构，以免刷新页面时 404
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
  // more config: https://d.umijs.org/config
});
