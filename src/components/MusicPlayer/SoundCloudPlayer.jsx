import { useMusicPlayer } from '../../context/MusicPlayerContext'
import { projects } from '../../utils/data'
import css from './SoundCloudPlayer.module.scss'

const musicProject = projects.find(p => p.soundcloudUrl)
const soundcloudUrl = musicProject?.soundcloudUrl || ''
const embedUrl = `https://w.soundcloud.com/player/?url=${encodeURIComponent(soundcloudUrl)}&color=%236D4B8A&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true`

const SoundCloudPlayer = ({ isOnMusicPage }) => {
  const { iframeRef, hasStarted } = useMusicPlayer()

  // Determine which mode to show:
  // 1. On music page: full-size player in the page flow
  // 2. Off music page + music started: compact fixed bar at bottom
  // 3. Off music page + never started: completely hidden (but still in DOM)
  let wrapperClass = css.hidden
  if (isOnMusicPage) {
    wrapperClass = css.fullPlayer
  } else if (hasStarted) {
    wrapperClass = css.miniBar
  }

  return (
    <div className={wrapperClass}>
      <iframe
        ref={iframeRef}
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src={embedUrl}
        title="SoundCloud Player"
      />
    </div>
  )
}

export default SoundCloudPlayer
