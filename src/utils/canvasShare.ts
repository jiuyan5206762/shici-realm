import { Poem } from '@/types';

/**
 * Generate a Chinese classical calligraphy share card image using Canvas
 */
export async function generatePoemCardImage(poem: Poem): Promise<string> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context not supported');

  const width = 800;
  const padding = 60;

  // Calculate required height based on poem length
  const lines = poem.content || [];
  const lineHeight = 46;
  const contentHeight = lines.length * lineHeight;
  const headerHeight = 180;
  const footerHeight = 140;
  const height = Math.max(700, headerHeight + contentHeight + footerHeight);

  canvas.width = width;
  canvas.height = height;

  // 1. Draw Paper background (宣纸质感米白)
  ctx.fillStyle = '#F8F5EF';
  ctx.fillRect(0, 0, width, height);

  // 2. Draw Classical Double Border (双线回纹边框)
  ctx.strokeStyle = '#D2C3B1';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(24, 24, width - 48, height - 48);

  ctx.strokeStyle = '#8C5E35';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(32, 32, width - 64, height - 64);

  // Corner decorations
  const cornerSize = 14;
  ctx.fillStyle = '#BA3B46';
  ctx.fillRect(30, 30, cornerSize, 4);
  ctx.fillRect(30, 30, 4, cornerSize);
  ctx.fillRect(width - 30 - cornerSize, 30, cornerSize, 4);
  ctx.fillRect(width - 34, 30, 4, cornerSize);
  ctx.fillRect(30, height - 34, cornerSize, 4);
  ctx.fillRect(30, height - 30 - cornerSize, 4, cornerSize);
  ctx.fillRect(width - 30 - cornerSize, height - 34, cornerSize, 4);
  ctx.fillRect(width - 34, height - 30 - cornerSize, 4, cornerSize);

  // 3. Draw Title (诗名)
  ctx.fillStyle = '#292524';
  ctx.font = 'bold 36px "Noto Serif SC", "STSong", "SimSun", serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText(poem.title, width / 2, padding + 20);

  // 4. Draw Author & Dynasty (朝代 · 诗人)
  ctx.font = '20px "Noto Serif SC", "STKaiti", serif';
  ctx.fillStyle = '#8C5E35';
  const authorInfo = `〔${poem.dynasty?.name || '古'}〕 ${poem.author?.name || '佚名'}   ·   ${poem.type?.name || '诗词'}`;
  ctx.fillText(authorInfo, width / 2, padding + 76);

  // Subtle separator line
  ctx.beginPath();
  ctx.moveTo(width / 2 - 80, padding + 115);
  ctx.lineTo(width / 2 + 80, padding + 115);
  ctx.strokeStyle = '#D2C3B1';
  ctx.lineWidth = 1;
  ctx.stroke();

  // 5. Draw Content (正文)
  ctx.fillStyle = '#292524';
  ctx.font = '26px "Noto Serif SC", "STSong", "SimSun", serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const startY = headerHeight + 10;
  lines.forEach((line, index) => {
    const y = startY + index * lineHeight;
    ctx.fillText(line, width / 2, y);
  });

  // 6. Draw Red Classical Stamp Seal (朱红篆刻印章)
  const sealX = width - padding - 80;
  const sealY = height - footerHeight + 10;
  const sealSize = 56;

  ctx.strokeStyle = '#BA3B46';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(sealX, sealY, sealSize, sealSize);

  ctx.fillStyle = '#BA3B46';
  ctx.font = 'bold 15px "Noto Serif SC", "STKaiti", serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('诗境', sealX + sealSize / 2, sealY + sealSize / 4 + 4);
  ctx.fillText('珍藏', sealX + sealSize / 2, sealY + (sealSize * 3) / 4 - 2);

  // 7. Draw Footer text
  ctx.fillStyle = '#78716C';
  ctx.font = '14px "Noto Sans SC", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('诗境 · 中国古诗词智能阅读与检索平台', padding + 10, height - 60);

  ctx.font = '12px "Noto Sans SC", sans-serif';
  ctx.fillStyle = '#A8A29E';
  ctx.fillText('数据源自诗泉古籍库 · 传诵千古文采风华', padding + 10, height - 40);

  return canvas.toDataURL('image/png');
}
