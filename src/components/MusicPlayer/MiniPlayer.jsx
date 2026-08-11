import { useMusicPlayer } from '../../context/MusicPlayerContext'
import { AnimatePresence, motion } from 'framer-motion'
import css from './MiniPlayer.module.scss'

const MiniPlayer = () => {
  const { isPlaying, hasStarted, toggle } = useMusicPlayer()

  return (
    <AnimatePresence>
      {hasStarted && (
        <motion.button
          className={css.miniPlayer}
          onClick={toggle}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          aria-label={isPlaying ? 'Pause music' : 'Resume music'}
        >
          <span className={`${css.bars} ${isPlaying ? css.playing : css.paused}`}>
            <span className={css.bar} />
            <span className={css.bar} />
            <span className={css.bar} />
            <span className={css.bar} />
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default MiniPlayer
