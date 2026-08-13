import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import css from './Tarot.module.scss'
import useTarotDeck from './hooks/useTarotDeck'
import useConversation from './hooks/useConversation'
import { SPREAD_PRESETS } from './data/spreadPresets'
import Spread from './Spread'
import ConversationTurn from './ConversationTurn'
import ConversationInput from './ConversationInput'
import LoadingIndicator from './LoadingIndicator'
import tarotCover from './assets/tarot-cover.png'
import { analytics, ANALYTICS_EVENTS } from '../../utils/analytics'

const ConversationMode = () => {
  const { resetAndDraw } = useTarotDeck()
  const {
    turns,
    currentCards,
    isLoading,
    error,
    submitQuestion,
    retryLastInterpretation
  } = useConversation({ resetAndDraw })

  const [activePreset] = useState(SPREAD_PRESETS.three)
  const messagesContainerRef = useRef(null)

  useEffect(() => {
    const container = messagesContainerRef.current
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }, [turns.length, isLoading])

  const handleSubmit = (questionText) => {
    analytics.trackEvent(ANALYTICS_EVENTS.FOLLOW_UP_QUESTION_ASKED)
    submitQuestion(questionText, activePreset)
  }

  return (
    <section className={css.convWrapper}>
      <div className={css.convTopBar}>
        <h1 className={css.convTitle}>Conversation Mode</h1>
        <Link to="/tarot" className={css.convBackLink}>← Back to Tarot</Link>
      </div>

      <div className={css.convMessages} ref={messagesContainerRef}>
        {turns.length === 0 && !isLoading && (
          <div className={css.convEmpty}>
            <img src={tarotCover} alt="Tarot deck" className={css.convEmptyImg} />
            <p>Ask a question to begin your tarot conversation.</p>
            <p className={css.convEmptySub}>Each question draws fresh cards and provides an AI interpretation.</p>
          </div>
        )}

        {turns.map(turn => (
          <ConversationTurn key={turn.id} turn={turn} />
        ))}

        {currentCards.length > 0 && isLoading && (
          <div className={css.convTurn}>
            <Spread drawnCards={currentCards} spreadPreset={activePreset} />
            <LoadingIndicator />
          </div>
        )}

        {error && (
          <div className={css.convError}>
            <p>{error}</p>
            <button onClick={retryLastInterpretation}>Retry</button>
          </div>
        )}
      </div>

      <ConversationInput onSubmit={handleSubmit} disabled={isLoading} />
    </section>
  )
}

export default ConversationMode
