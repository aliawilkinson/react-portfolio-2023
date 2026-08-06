import { useState, useMemo } from 'react'
import CollapsibleSection from './CollapsibleSection'
import { sanitizeText } from './utils/sanitizeText'
import css from './Tarot.module.scss'

const getDefaultOpen = () => {
  if (typeof window === 'undefined') return true
  return window.matchMedia('(min-width: 769px)').matches
}

const Interpretation = ({ reading, isGenerating }) => {
  const [allExpanded, setAllExpanded] = useState(null)
  const defaultOpen = useMemo(() => getDefaultOpen(), [])

  if (!reading && !isGenerating) return null

  const handleExpandAll = () => setAllExpanded(true)
  const handleCollapseAll = () => setAllExpanded(false)
  const releaseControlled = () => {
    if (allExpanded !== null) {
      setAllExpanded(null)
    }
  }

  const isOpen = allExpanded !== null ? allExpanded : undefined

  return (
    <div className={css.interpretation}>
      {isGenerating ? (
        <p className={css.generating}>Generating your reading...</p>
      ) : (
        <>
          <h3>Your Reading</h3>

          <div className={css.collapseControls}>
            <button type="button" onClick={handleExpandAll}>Expand All</button>
            <button type="button" onClick={handleCollapseAll}>Collapse All</button>
          </div>

          <div onClick={releaseControlled}>
            <CollapsibleSection
              title="Summary"
              defaultOpen={defaultOpen}
              isOpen={isOpen}
            >
              <p className={css.summary}>{sanitizeText(reading.summary)}</p>
            </CollapsibleSection>
          </div>

          <div onClick={releaseControlled}>
            <CollapsibleSection
              title="Reflection Points"
              defaultOpen={defaultOpen}
              isOpen={isOpen}
            >
              <ul>{reading.reflections.map((r, i) => <li key={i}>{r}</li>)}</ul>
            </CollapsibleSection>
          </div>

          <div onClick={releaseControlled}>
            <CollapsibleSection
              title="Card Connections"
              defaultOpen={defaultOpen}
              isOpen={isOpen}
            >
              <p>{sanitizeText(reading.connections)}</p>
            </CollapsibleSection>
          </div>
        </>
      )}
    </div>
  )
}

export default Interpretation
