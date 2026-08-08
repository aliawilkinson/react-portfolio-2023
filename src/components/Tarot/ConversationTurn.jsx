import css from './Tarot.module.scss'
import Spread from './Spread'

/**
 * Simple markdown-to-JSX renderer for Gemini responses.
 * Handles bold, italic, bullet lists, numbered lists, and line breaks.
 */
const renderMarkdown = (text) => {
  if (!text) return null

  const lines = text.split('\n')
  const elements = []
  let listItems = []
  let listType = null

  const flushList = () => {
    if (listItems.length > 0) {
      const Tag = listType === 'ol' ? 'ol' : 'ul'
      elements.push(<Tag key={`list-${elements.length}`}>{listItems}</Tag>)
      listItems = []
      listType = null
    }
  }

  const formatInline = (str) => {
    // Bold + italic
    return str
      .replace(/\*\*\*(.*?)\*\*\*/g, '<b><em>$1</em></b>')
      .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
  }

  lines.forEach((line, i) => {
    const trimmed = line.trim()

    // Bullet list item
    if (/^[-•]\s+/.test(trimmed)) {
      if (listType !== 'ul') flushList()
      listType = 'ul'
      const content = trimmed.replace(/^[-•]\s+/, '')
      listItems.push(
        <li key={`li-${i}`} dangerouslySetInnerHTML={{ __html: formatInline(content) }} />
      )
      return
    }

    // Numbered list item
    if (/^\d+[.)]\s+/.test(trimmed)) {
      if (listType !== 'ol') flushList()
      listType = 'ol'
      const content = trimmed.replace(/^\d+[.)]\s+/, '')
      listItems.push(
        <li key={`li-${i}`} dangerouslySetInnerHTML={{ __html: formatInline(content) }} />
      )
      return
    }

    // Not a list item — flush any pending list
    flushList()

    if (trimmed === '') {
      return // skip empty lines
    }

    elements.push(
      <p key={`p-${i}`} dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }} />
    )
  })

  flushList()
  return elements
}

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
            {renderMarkdown(turn.interpretation.summary)}
          </section>
        )}
        {turn.interpretation.detailed && (
          <section>
            <h4>Interpretation</h4>
            {renderMarkdown(turn.interpretation.detailed)}
          </section>
        )}
        {turn.interpretation.themes && (
          <section>
            <h4>Key Themes</h4>
            {renderMarkdown(turn.interpretation.themes)}
          </section>
        )}
        {turn.interpretation.reflectionQuestions && (
          <section>
            <h4>Reflection Questions</h4>
            {renderMarkdown(turn.interpretation.reflectionQuestions)}
          </section>
        )}
        {turn.interpretation.actionableInsights && (
          <section>
            <h4>Actionable Insights</h4>
            {renderMarkdown(turn.interpretation.actionableInsights)}
          </section>
        )}
      </div>
    </div>
  )
}

export default ConversationTurn
