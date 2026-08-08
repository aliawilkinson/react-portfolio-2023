import css from './Tarot.module.scss'

const LoadingIndicator = () => (
  <div className={css.convLoading}>
    <span className={css.convSpinner} />
    <p>Interpreting your cards...</p>
  </div>
)

export default LoadingIndicator
