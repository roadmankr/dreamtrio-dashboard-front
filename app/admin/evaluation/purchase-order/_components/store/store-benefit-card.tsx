// StoreBenefitCard.tsx
import { Info } from 'lucide-react';

type Tier = { value: number; label: string; reward: string };

type Props = {
  title?: string; // 카드 상단 보조 타이틀
  highlight?: string; // 핵심 카피 (예: "9,620원 남았어요")
  period?: string; // 합산기간 텍스트
  current?: number; // 현재 실적 값
  currency?: (n: number) => string; // 통화 포맷터
  tiers?: Tier[]; // 단계(최소 2개)
  className?: string;
};

function pctBetween(min: number, max: number, value: number) {
  if (max === min) return 0;
  const pct = ((value - min) / (max - min)) * 100;
  return Math.max(0, Math.min(100, pct));
}

export default function StoreBenefitCard({
  title = '파이팅! 다음 10월 첫 혜택까지',
  highlight = '9,620원 남았어요',
  period = '합산기간 2025.9.1 - 9.30',
  current = 390_380,
  currency = (n) => new Intl.NumberFormat().format(n) + '원',
  tiers = [
    { value: 0, label: '0원', reward: '결제일 할인' },
    { value: 400_000, label: '40만원', reward: '10,000원' },
    { value: 800_000, label: '80만원', reward: '13,000원' },
  ],
  className = '',
}: Props) {
  const min = tiers[0].value;
  const max = tiers[tiers.length - 1].value;
  const progressPct = pctBetween(min, max, current);

  return (
    <section
      className={[
        'w-full max-w-full',
        'relative overflow-hidden rounded-2xl border border-zinc-200/60',
        'bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50',
        // 'shadow-[0_10px_30px_-12px_rgba(0,0,0,0.12)]',
        'p-5 sm:p-6',
        'dark:border-white/10 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-900',
        className,
      ].join(' ')}
      aria-label='혜택 진행 현황'
    >
      {/* 은은한 노이즈 */}
      <div className='pointer-events-none absolute inset-0 opacity-[0.06] [background:radial-gradient(circle_at_20%_20%,#000,transparent_45%),radial-gradient(circle_at_80%_0,#000,transparent_35%)]' />

      {/* 헤더 */}
      <header className='relative z-10 flex items-start justify-between gap-4'>
        <div className='space-y-1'>
          <p className='text-[13px] font-medium tracking-tight text-teal-900/80 dark:text-zinc-300'>
            {title}
          </p>
          <h3 className='text-[clamp(1.125rem,3vw,1.75rem)] font-extrabold tracking-tight text-teal-950 dark:text-white'>
            {highlight}
          </h3>
          <p className='text-xs text-teal-900/60 dark:text-zinc-400'>
            {period}
          </p>
        </div>

        <button
          type='button'
          className='inline-flex size-8 items-center justify-center rounded-full border border-teal-900/10 bg-white/60 text-teal-800 backdrop-blur hover:bg-white dark:border-white/10 dark:bg-white/10 dark:text-zinc-300'
          aria-label='혜택 안내'
        >
          <Info className='size-4' />
        </button>
      </header>

      {/* 프로그레스 영역 */}
      <div className='relative z-10 mt-6'>
        {/* 말풍선 배지 (가변 폭 안전: clamp + translateX) */}
        <div
          className='absolute -top-7 -translate-x-1/2'
          style={{ left: `clamp(0%, ${progressPct}%, 100%)` }}
        >
          <div className='rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-zinc-800 shadow ring-1 ring-black/5 dark:bg-zinc-800 dark:text-white'>
            {currency(current)}
          </div>
        </div>

        {/* 트랙 */}
        <div className='relative h-3 w-full overflow-hidden rounded-full bg-white/60 ring-1 ring-black/5 dark:bg-white/10'>
          <div
            className='h-full rounded-full bg-gradient-to-r from-teal-500 to-indigo-500 transition-[width] duration-500'
            style={{ width: `${progressPct}%` }}
            aria-hidden
          />
        </div>

        {/* 눈금 + 라벨 (각 위치도 clamp) */}
        {/* <div className='relative mt-3 h-10 w-full'>
          {tiers.map((t, i) => {
            const pos = pctBetween(min, max, t.value);
            const reached = current >= t.value;
            return (
              <div
                key={`${t.value}-${i}`}
                className='absolute top-0'
                style={{
                  left: `clamp(0%, ${pos}%, 100%)`,
                  transform: 'translateX(-50%)',
                }}
              >
                <div
                  className={[
                    'mx-auto h-4 w-0.5 rounded-full',
                    reached ? 'bg-teal-600' : 'bg-zinc-300 dark:bg-zinc-600',
                  ].join(' ')}
                />
                <div className='mt-1 -translate-x-1/2 text-center'>
                  <p className='text-[11px] font-medium text-zinc-800 dark:text-zinc-200'>
                    {t.label}
                  </p>
                  <p className='text-[10px] text-zinc-500 dark:text-zinc-400'>
                    {t.reward}
                  </p>
                </div>
              </div>
            );
          })}
        </div> */}
      </div>
    </section>
  );
}
