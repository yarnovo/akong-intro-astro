/**
 * AudioPlayer · React island (client:load) · 唯一需要 hydration 的组件
 *
 * 其他都是 0 JS 静态 HTML · Astro 编译完只这块带 React runtime
 */
import * as React from "react"
import { Play, Pause } from "lucide-react"

interface Props {
  src: string
  label: string
  duration?: string
}

export function AudioPlayer({ src, label, duration = "1 分钟" }: Props) {
  const audioRef = React.useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = React.useState(false)

  function toggle() {
    const a = audioRef.current
    if (!a) return
    if (playing) { a.pause() } else { a.play() }
  }

  React.useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    const onEnded = () => setPlaying(false)
    a.addEventListener("play", onPlay)
    a.addEventListener("pause", onPause)
    a.addEventListener("ended", onEnded)
    return () => {
      a.removeEventListener("play", onPlay)
      a.removeEventListener("pause", onPause)
      a.removeEventListener("ended", onEnded)
    }
  }, [])

  return (
    <button
      onClick={toggle}
      className="inline-flex items-center gap-3 pl-1.5 pr-5 py-1.5 border border-border rounded-full bg-card hover:bg-muted active:scale-[0.98] shadow-sm hover:shadow transition-all"
      data-testid="audio-toggle"
    >
      <span className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
        {playing ? <Pause className="size-4" /> : <Play className="size-4 ml-0.5" />}
      </span>
      <span className="text-sm font-medium">{label} · {duration}</span>
      <audio ref={audioRef} src={src} preload="none" />
    </button>
  )
}
