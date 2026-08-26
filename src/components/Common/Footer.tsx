import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-paper-200/60 dark:bg-chinese-nightCard border-t border-stone-200/70 dark:border-chinese-nightBorder mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-chinese-cinnabar text-white flex items-center justify-center font-serif font-bold text-sm">
                诗
              </div>
              <span className="font-serif font-bold text-lg text-ink-800 dark:text-ink-100">
                诗境 · 中国古诗词阅读与检索平台
              </span>
            </div>
            <p className="text-sm text-ink-400 dark:text-ink-400 max-w-md leading-relaxed">
              以现代设计与东方美学为基底，汇集历朝历代诗词名篇与先贤典籍。支持智能检索、多维筛选、沉浸阅读与 AI 深度赏析。
            </p>
            <div className="pt-2 text-xs text-ink-400 flex items-center space-x-1">
              <span>数据来源：</span>
              <a
                href="https://poetry.palemoky.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-chinese-ochre hover:underline inline-flex items-center space-x-0.5"
              >
                <span>诗泉 API (poetry.palemoky.com)</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-sm text-ink-800 dark:text-ink-200 mb-3">
              诗海探索
            </h4>
            <ul className="space-y-2 text-sm text-ink-500 dark:text-ink-400">
              <li>
                <Link to="/poems" className="hover:text-chinese-ochre transition-colors">
                  古诗总库
                </Link>
              </li>
              <li>
                <Link to="/authors" className="hover:text-chinese-ochre transition-colors">
                  名家名士
                </Link>
              </li>
              <li>
                <Link to="/dynasties" className="hover:text-chinese-ochre transition-colors">
                  朝代沿革
                </Link>
              </li>
              <li>
                <Link to="/types" className="hover:text-chinese-ochre transition-colors">
                  体裁律例
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-serif font-bold text-sm text-ink-800 dark:text-ink-200 mb-3">
              个人空间
            </h4>
            <ul className="space-y-2 text-sm text-ink-500 dark:text-ink-400">
              <li>
                <Link to="/favorites" className="hover:text-chinese-ochre transition-colors">
                  我的珍藏
                </Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-chinese-ochre transition-colors">
                  浏览足迹
                </Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-chinese-ochre transition-colors">
                  全文检索
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-ink-400 space-y-2 sm:space-y-0">
          <div>
            © {new Date().getFullYear()} 诗境 Shici Realm. 保留所有权利。
          </div>
          <div className="flex items-center space-x-1">
            <span>传承华夏千年文脉，致敬不朽先贤风骨</span>
            <Heart className="w-3.5 h-3.5 text-chinese-cinnabar fill-chinese-cinnabar mx-1" />
          </div>
        </div>
      </div>
    </footer>
  );
};
