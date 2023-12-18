import { Icon } from '@/components/icon'

import { cn } from '@/lib/utils'

interface RatingProps {
  rating: number
}

export function Rating({ rating }: RatingProps) {
  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon
          name="star-rating"
          key={i}
          className={cn(
            'h-4 w-4',
            rating >= i + 1 ? 'text-emerald-400' : 'text-muted-foreground',
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}
