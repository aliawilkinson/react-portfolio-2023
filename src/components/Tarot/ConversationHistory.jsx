import { useEffect, useRef } from 'react'
import css from './Tarot.module.scss'
import ConversationTurn from './ConversationTurn'

const ConversationHistory = ({ turns }) => {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [turns.length])

  if (turns.length === 0) return null

  return (
    <div className={css.convHistory}>
      {turns.map(turn => (
        <ConversationTurn key={turn.id} turn={turn} />
      ))}
      <div ref={bottomRef} />
    </div>
  )
}

export default ConversationHistory
