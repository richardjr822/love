import Image from 'next/image';
import { cn } from '@/lib/utils';

interface CollageGridProps {
  src: string;
  alt: string;
  className?: string;
}

const collagePositions = ['top left', 'top right', 'center left', 'center right'] as const;

export default function CollageGrid({ src, alt, className }: CollageGridProps) {
  return (
    <div className={cn('grid h-full w-full grid-cols-2 grid-rows-2 gap-[2px]', className)}>
      {collagePositions.map((position, index) => (
        <div key={index} className="relative overflow-hidden">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            style={{ objectPosition: position }}
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </div>
      ))}
    </div>
  );
}
