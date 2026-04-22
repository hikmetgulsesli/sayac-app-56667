interface CounterDisplayProps {
  value: number;
}

export function CounterDisplay({ value }: CounterDisplayProps) {
  return (
    <div className="text-center z-10 w-full max-w-md">
      <h2 className="font-headline text-surface-tint text-lg font-medium mb-2 tracking-wide uppercase">
        Ana Sayaç
      </h2>
      <div className="my-16 md:my-24 flex items-center justify-center">
        <span className="font-display text-[96px] md:text-[120px] font-bold leading-none tracking-[-0.02em] text-on-surface bg-gradient-to-br from-on-surface to-surface-variant bg-clip-text text-transparent">
          {value.toLocaleString('tr-TR')}
        </span>
      </div>
    </div>
  );
}
