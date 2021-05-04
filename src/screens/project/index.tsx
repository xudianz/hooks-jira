import React from 'react'
import { Link } from "react-router-dom"

export const ProjectScreen = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h1>project screen</h1>
      <Link to="kanban">看板</Link>
      <Link to="epic">任务组</Link>
      {children}
    </div>
  )
}
