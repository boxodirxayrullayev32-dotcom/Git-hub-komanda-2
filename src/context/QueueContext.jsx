import { createContext, useContext, useState, useCallback } from 'react'

const QueueContext = createContext()

export const useQueue = () => {
  const ctx = useContext(QueueContext)
  if (!ctx) throw new Error('useQueue must be used within QueueProvider')
  return ctx
}

export const QueueProvider = ({ children }) => {
  const [queues, setQueues] = useState(() => {
    try {
      const saved = localStorage.getItem('queues')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const addQueue = useCallback((booking) => {
    setQueues(prev => {
      const newQueue = {
        ...booking,
        id: Date.now(),
        date: new Date().toLocaleDateString('ru-RU'),
        status: 'waiting'
      }
      const updated = [newQueue, ...prev]
      localStorage.setItem('queues', JSON.stringify(updated))
      return updated
    })
  }, [])

  const updateStatus = useCallback((id, status) => {
    setQueues(prev => {
      const updated = prev.map(q => q.id === id ? { ...q, status } : q)
      localStorage.setItem('queues', JSON.stringify(updated))
      return updated
    })
  }, [])

  const cancelQueue = useCallback((id) => {
    setQueues(prev => {
      const updated = prev.filter(q => q.id !== id)
      localStorage.setItem('queues', JSON.stringify(updated))
      return updated
    })
  }, [])

  return (
    <QueueContext.Provider value={{ queues, addQueue, updateStatus, cancelQueue }}>
      {children}
    </QueueContext.Provider>
  )
}
