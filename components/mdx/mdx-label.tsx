import { FC } from 'react'

export const Label: FC<{ text: string; theme?: 'dark' | 'light' }> = ({
  text,
  theme = 'light',
}) => {
  return (
    <span
      className={`inline-block whitespace-nowrap rounded  px-1.5 align-middle font-medium leading-4 tracking-wide text-cyan-400 [font-size:10px] ${
        theme === 'dark'
          ? 'border border-slate-400/70 text-slate-500 dark:border-slate-600 dark:text-slate-400'
          : 'border border-cyan-300 text-cyan-400 dark:border-purple-800 dark:text-purple-600'
      }`}
    >
      {text}
    </span>
  )
}
