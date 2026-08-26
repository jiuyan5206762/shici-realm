import React, { useState, useEffect } from 'react';
import { X, Download, Copy, Share2, Check, Sparkles } from 'lucide-react';
import { Poem } from '@/types';
import { generatePoemCardImage } from '@/utils/canvasShare';
import { useSharePoem } from '@/hooks/useSharePoem';

interface PoemShareModalProps {
  poem: Poem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PoemShareModal: React.FC<PoemShareModalProps> = ({ poem, isOpen, onClose }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { copied, sharePoem, copyPoemText } = useSharePoem();

  useEffect(() => {
    if (isOpen && poem) {
      setIsGenerating(true);
      generatePoemCardImage(poem)
        .then((url) => setImageUrl(url))
        .catch((err) => console.error('Failed to generate image', err))
        .finally(() => setIsGenerating(false));
    } else {
      setImageUrl(null);
    }
  }, [isOpen, poem]);

  if (!isOpen || !poem) return null;

  const handleDownload = () => {
    if (!imageUrl) return;
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = `诗境_${poem.title}_${poem.author?.name || '古诗'}.png`;
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white dark:bg-chinese-nightCard border border-stone-200 dark:border-chinese-nightBorder rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl animate-scaleUp">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-chinese-ochre/10 text-chinese-ochre flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-ink-800 dark:text-ink-100">
                分享诗词雅鉴
              </h3>
              <p className="text-xs text-ink-400">已生成古典宣纸书法长图</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-ink-400 hover:text-ink-700 dark:hover:text-ink-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Card Preview */}
        <div className="bg-paper-100 dark:bg-stone-900 rounded-2xl p-4 flex items-center justify-center max-h-[50vh] overflow-y-auto border border-stone-200/60 dark:border-stone-800">
          {isGenerating ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-8 h-8 border-2 border-chinese-ochre border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-ink-400 font-serif">正在绘制宣纸墨香书签…</p>
            </div>
          ) : imageUrl ? (
            <img
              src={imageUrl}
              alt={`${poem.title} 诗词卡片`}
              className="max-h-[46vh] rounded-lg shadow-md object-contain"
            />
          ) : (
            <p className="text-sm text-rose-500 py-8">图片生成失败，请重试</p>
          )}
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
          {/* Download Image */}
          <button
            onClick={handleDownload}
            disabled={!imageUrl}
            className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-chinese-ochre hover:bg-chinese-ochre/90 disabled:opacity-50 text-white rounded-xl text-sm font-medium shadow-sm transition-transform active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>保存图片</span>
          </button>

          {/* Web Share / Link */}
          <button
            onClick={() => sharePoem(poem)}
            className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-ink-700 dark:text-ink-200 rounded-xl text-sm font-medium transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>{copied ? '链接已复制' : '分享链接'}</span>
          </button>

          {/* Copy Text */}
          <button
            onClick={() => copyPoemText(poem)}
            className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-ink-700 dark:text-ink-200 rounded-xl text-sm font-medium transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? '文本已复制' : '复制文本'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
