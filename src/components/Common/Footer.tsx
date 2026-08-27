import React from 'react';
import { Link } from 'react-router-dom';
import { Scroll, Github } from 'lucide-react';
import { SealBadge } from '@/components/Common/SealBadge';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 sm:mt-24 border-t border-paper-300 dark:border-ink-800 bg-paper-100/50 dark:bg-[#131316]/90 backdrop-blur-xs font-serif transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-chinese-cinnabar text-white font-serif font-bold flex items-center justify-center shadow-xs text-sm">
                诗
              </div>
              <span className="font-serif font-black text-xl text-ink-900 dark:text-ink-50">
                诗境 · 华夏文华
              </span>
              <SealBadge text="宋韵" size="sm" variant="cinnabar" />
            </div>
            <p className="text-xs sm:text-sm text-ink-500 dark:text-ink-400 max-w-md leading-relaxed">
              澄心载道，风雅传世。收录历朝历代传世名篇，融合右起竖排古籍卷轴与飞花令对诗竞技，传承千年文脉风雅。
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-ink-800 dark:text-ink-200 tracking-wider">
              文苑揽胜
            </h4>
            <ul className="space-y-1.5 text-xs text-ink-500">
              <li>
                <Link to="/poems" className="hover:text-chinese-cinnabar transition-colors">
                  古籍诗库全帙
                </Link>
              </li>
              <li>
                <Link to="/feihua" className="hover:text-chinese-cinnabar transition-colors text-chinese-cinnabar font-bold">
                  飞花令 · 诗词对决
                </Link>
              </li>
              <li>
                <Link to="/authors" className="hover:text-chinese-cinnabar transition-colors">
                  千古先贤百家
                </Link>
              </li>
              <li>
                <Link to="/dynasties" className="hover:text-chinese-cinnabar transition-colors">
                  朝代纪元编年
                </Link>
              </li>
            </ul>
          </div>

          {/* Architecture & Tech */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-ink-800 dark:text-ink-200 tracking-wider">
              典籍底蕴
            </h4>
            <p className="text-xs text-ink-500 leading-relaxed">
              数据汇聚 37 万+ 首正统古典诗章，采用 Web Audio 纯程序化实时古琴音律合成。
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://github.com/jiuyan5206762/shici-realm"
                target="_blank"
                rel="noreferrer"
                className="text-ink-400 hover:text-ink-800 dark:hover:text-ink-100 transition-colors"
                title="GitHub 源码仓库"
              >
                <Github className="w-4 h-4" />
              </a>
              <span className="text-[11px] text-ink-400 flex items-center gap-1">
                <Scroll className="w-3.5 h-3.5" />
                <span>诗泉文华开放 API</span>
              </span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-paper-300/60 dark:border-ink-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-ink-400 gap-2">
          <span>© {new Date().getFullYear()} 诗境 (Shici Realm) · 东方美学数字典藏</span>
          <span>博观而约取，厚积而薄发</span>
        </div>
      </div>
    </footer>
  );
};
