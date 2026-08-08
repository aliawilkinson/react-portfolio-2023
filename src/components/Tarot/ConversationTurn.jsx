import css from './Tarot.module.scss'
import Spread from './Spread'

const ConversationTurn = ({ turn }) => {
  return (
    <div className={css.convTurn}>
      <div className={css.convTurnQuestion}>
        <strong>You asked:</strong> {turn.question}
      </div>
      <Spread drawnCards={turn.cards} spreadPreset={turn.spreadPreset} />
      <div className={css.convTurnInterpretation}>
        {turn.interpretation.summary && (
          <section>
            <h4>Summary</h4>
            <p>{turn.interpretation.summary}</p>
          </section>
        )}
        {turn.interpretation.detailed && (
          <section>
            <h4>Interpretation</h4>
            <p>{turn.interpretation.detailed}</p>
          </section>
        )}
        {turn.interpretation.themes && (
          <section>
            <h4>Key Themes</h4>
            <p>{turn.interpretation.themes}</p>
          </section>
        )}
        {turn.interpretation.reflectionQuestions && (
          <section>
            <h4>Reflection Questions</h4>
            <p>{turn.interpretation.reflectionQuestions}</p>
          </section>
        )}
        {turn.interpretation.actionableInsights && (
          <section>
            <h4>Actionable Insights</h4>
            <p>{turn.interpretation.actionableInsights}</p>
          </section>
        )}
      </div>
    </div>
  )
}

export default ConversationTurn
