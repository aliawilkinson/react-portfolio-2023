import { useState, useMemo } from 'react'
import CollapsibleSection from './CollapsibleSection'
import { sanitizeText } from './utils/sanitizeText'
import css from './Tarot.module.scss'

const getDefaultOpen = () => {
  if (typeof window === 'undefined') return true
  return window.matchMedia('(min-width: 769px)').matches
}

/**
 * Simple markdown-to-JSX renderer for AI responses.
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
    return str
      .replace(/\*\*\*(.*?)\*\*\*/g, '<b><em>$1</em></b>')
      .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
  }

  lines.forEach((line, i) => {
    const trimmed = line.trim()

    if (/^[-•]\s+/.test(trimmed)) {
      if (listType !== 'ul') flushList()
      listType = 'ul'
      const content = trimmed.replace(/^[-•]\s+/, '')
      listItems.push(
        <li key={`li-${i}`} dangerouslySetInnerHTML={{ __html: formatInline(content) }} />
      )
      return
    }

    if (/^\d+[.)]\s+/.test(trimmed)) {
      if (listType !== 'ol') flushList()
      listType = 'ol'
      const content = trimmed.replace(/^\d+[.)]\s+/, '')
      listItems.push(
        <li key={`li-${i}`} dangerouslySetInnerHTML={{ __html: formatInline(content) }} />
      )
      return
    }

    flushList()

    if (trimmed === '') return

    elements.push(
      <p key={`p-${i}`} dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }} />
    )
  })

  flushList()
  return elements
}

/**
 * InterpretationDisplay renders either Classic static interpretation or AI interpretation.
 * @param {{ interpretation: Object, isAI: boolean, isLoading: boolean }} props
 */
const InterpretationDisplay = ({ interpretation, isAI, isLoading }) => {
  const [allExpanded, setAllExpanded] = useState(null)
  const defaultOpen = useMemo(() => getDefaultOpen(), [])

  if (!interpretation && !isLoading) return null

  const handleExpandAll = () => setAllExpanded(true)
  const handleCollapseAll = () => setAllExpanded(false)
  const releaseControlled = () => {
    if (allExpanded !== null) setAllExpanded(null)
  }

  const isOpen = allExpanded !== null ? allExpanded : undefined

  if (isLoading) {
    return (
      <div className={css.interpretation}>
        <p className={css.generating}>Generating your reading...</p>
      </div>
    )
  }

  // AI mode rendering
  if (isAI) {
    return (
      <div className={css.interpretation}>
        <h3>Your Reading</h3>

        <div className={css.collapseControls}>
          <button type="button" onClick={handleExpandAll}>Expand All</button>
          <button type="button" onClick={handleCollapseAll}>Collapse All</button>
        </div>

        {interpretation.summary && (
          <div onClick={releaseControlled}>
            <CollapsibleSection title="Summary" defaultOpen={defaultOpen} isOpen={isOpen}>
              {renderMarkdown(interpretation.summary)}
            </CollapsibleSection>
          </div>
        )}
        {interpretation.detailed && (
          <div onClick={releaseControlled}>
            <CollapsibleSection title="Interpretation" defaultOpen={defaultOpen} isOpen={isOpen}>
              {renderMarkdown(interpretation.detailed)}
            </CollapsibleSection>
          </div>
        )}
        {interpretation.themes && (
          <div onClick={releaseControlled}>
            <CollapsibleSection title="Key Themes" defaultOpen={defaultOpen} isOpen={isOpen}>
              {renderMarkdown(interpretation.themes)}
            </CollapsibleSection>
          </div>
        )}
        {interpretation.reflectionQuestions && (
          <div onClick={releaseControlled}>
            <CollapsibleSection title="Reflection Questions" defaultOpen={defaultOpen} isOpen={isOpen}>
              {renderMarkdown(interpretation.reflectionQuestions)}
            </CollapsibleSection>
          </div>
        )}
        {interpretation.actionableInsights && (
          <div onClick={releaseControlled}>
            <CollapsibleSection title="Actionable Insights" defaultOpen={defaultOpen} isOpen={isOpen}>
              {renderMarkdown(interpretation.actionableInsights)}
            </CollapsibleSection>
          </div>
        )}
      </div>
    )
  }

  // Classic mode rendering
  return (
    <div className={css.interpretation}>
      <h3>Your Reading</h3>

      <div className={css.collapseControls}>
        <button type="button" onClick={handleExpandAll}>Expand All</button>
        <button type="button" onClick={handleCollapseAll}>Collapse All</button>
      </div>

      <div onClick={releaseControlled}>
        <CollapsibleSection title="Summary" defaultOpen={defaultOpen} isOpen={isOpen}>
          <p className={css.summary}>{sanitizeText(interpretation.summary)}</p>
        </CollapsibleSection>
      </div>

      <div onClick={releaseControlled}>
        <CollapsibleSection title="Card Meanings" defaultOpen={defaultOpen} isOpen={isOpen}>
          <div className={css.cardReadings}>
            {interpretation.cardReadings.map((reading, i) => (
              <div key={i} className={css.cardReading}>
                <h4>
                  {reading.position}: {reading.cardName}
                  {reading.isReversed && <span className={css.reversedBadge}>Reversed</span>}
                </h4>
                <p>{reading.meaning}</p>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      </div>

      <div onClick={releaseControlled}>
        <CollapsibleSection title="Spread Insight" defaultOpen={defaultOpen} isOpen={isOpen}>
          <p>{sanitizeText(interpretation.spreadInsight)}</p>
        </CollapsibleSection>
      </div>
    </div>
  )
}

export default InterpretationDisplay
