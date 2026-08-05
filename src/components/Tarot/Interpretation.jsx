import css from './Tarot.module.scss'

const Interpretation = ({ reading, isGenerating }) => {
  if (!reading && !isGenerating) return null

  return (
    <div className={css.interpretation}>
      {isGenerating ? (
        <p className={css.generating}>Generating your reading...</p>
      ) : (
        <>
          <h3>Your Reading</h3>
          <p className={css.summary}>{reading.summary}</p>
          <h4>Reflection Points</h4>
          <ul>{reading.reflections.map((r, i) => <li key={i}>{r}</li>)}</ul>
          <h4>Card Connections</h4>
          <p>{reading.connections}</p>
        </>
      )}
    </div>
  )
}

export default Interpretation
