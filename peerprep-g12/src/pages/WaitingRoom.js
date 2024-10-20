import React from 'react'
import CreateSessionForm from '../components/CreateSessionForm'
import useQuestions from '../hooks/useQuestions'

export default function WaitingRoom() {
  const { categories } = useQuestions();
  // TODO: write a hook to handle create session
  const handleCreateSession = () => {
    console.log('Session created!');
  }

  return (
    <div>
        <h1>Start practicing now</h1>
        <CreateSessionForm categories={categories} handleCreateSession={handleCreateSession}/>
    </div>
  )
}