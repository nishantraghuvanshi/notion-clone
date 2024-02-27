"use client"
import { Id } from '@/convex/_generated/dataModel'
import React from 'react'


// We can access the params this way. We can also use useParams hook alternatively.
interface DocumentIdPageProps {
  params:{
    documentId: Id<"documents">
  }}

const DocumentIdPage = () => {
  return (
    <div>DocumentIdPage</div>
  )
}

export default DocumentIdPage