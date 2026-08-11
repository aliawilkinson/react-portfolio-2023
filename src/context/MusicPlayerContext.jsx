import { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react'

const MusicPlayerContext = createContext({
  isPlaying: false,
  hasStarted: false,
  toggle: () => {},
  iframeRef: null,
})

export const useMusicPlayer = () => useContext(MusicPlayerContext)

export const MusicPlayerProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const iframeRef = useRef(null)
  const widgetRef = useRef(null)

  useEffect(() => {
    const initWidget = () => {
      if (!iframeRef.current || !window.SC || !window.SC.Widget) return false

      try {
        const widget = window.SC.Widget(iframeRef.current)
        widgetRef.current = widget

        widget.bind(window.SC.Widget.Events.PLAY, () => {
          setIsPlaying(true)
          setHasStarted(true)
        })

        widget.bind(window.SC.Widget.Events.PAUSE, () => {
          setIsPlaying(false)
        })

        widget.bind(window.SC.Widget.Events.FINISH, () => {
          setIsPlaying(false)
        })

        return true
      } catch (e) {
        return false
      }
    }

    // Try immediately
    if (initWidget()) return

    // If SC not loaded yet, poll for it (the script is async)
    const interval = setInterval(() => {
      if (initWidget()) {
        clearInterval(interval)
      }
    }, 500)

    return () => clearInterval(interval)
  }, [])

  const toggle = useCallback(() => {
    if (!widgetRef.current) return
    widgetRef.current.toggle()
  }, [])

  const value = {
    isPlaying,
    hasStarted,
    toggle,
    iframeRef,
  }

  return (
    <MusicPlayerContext.Provider value={value}>
      {children}
    </MusicPlayerContext.Provider>
  )
}

export default MusicPlayerContext
