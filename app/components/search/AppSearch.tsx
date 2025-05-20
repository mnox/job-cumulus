"use client"

import type { SearchResult } from "@/lib/types"
import { Loader2 } from "lucide-react"

interface SearchResultsProps {
  results: SearchResult[]
  isLoading: boolean
  onResultClick: (result: SearchResult) => void
}

export function SearchResults({ results, isLoading, onResultClick }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="mt-2 rounded-md border bg-background p-2 shadow-sm">
        <div className="flex items-center justify-center py-2">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </div>
    )
  }
  
  if (results.length === 0) {
    return null
  }
  
  return (
    <div className="mt-2 max-h-[300px] overflow-auto rounded-md border bg-background p-0 shadow-sm">
      <ul className="divide-y divide-border">
        {results.map((result) => (
          <li key={`${result.type}-${result.id}`}>
            <button
              className="w-full px-4 py-3 text-left transition-colors hover:bg-muted focus:bg-muted focus:outline-none"
              onClick={() => onResultClick(result)}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{result.name}</span>
                <span className="text-xs text-muted-foreground">{result.type}</span>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
