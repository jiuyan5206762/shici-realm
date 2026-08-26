import React from 'react';
import { Poem } from '@/types';
import { PoemCard } from './PoemCard';
import { PoemCardSkeleton } from '../Common/LoadingSkeleton';
import { EmptyState } from '../Common/EmptyState';

interface PoemListProps {
  poems: Poem[];
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  onResetFilter?: () => void;
  onShare?: (poem: Poem) => void;
}

export const PoemList: React.FC<PoemListProps> = ({
  poems,
  isLoading = false,
  emptyTitle = '未找到匹配的诗词',
  emptyDescription = '尝试调整检索关键词、朝代或体裁筛选条件',
  onResetFilter,
  onShare,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, idx) => (
          <PoemCardSkeleton key={idx} />
        ))}
      </div>
    );
  }

  if (!poems || poems.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        actionText={onResetFilter ? '清空筛选条件' : undefined}
        onAction={onResetFilter}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {poems.map((poem) => (
        <PoemCard key={poem.id} poem={poem} onShare={onShare} />
      ))}
    </div>
  );
};
