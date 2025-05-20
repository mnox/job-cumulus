"use client"

import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from "@mui/material";
import type React from "react"
import { useEffect, useState } from "react"
import { API_URL } from '~/data/globals';
import { type SearchResult } from '~/data/search/SearchResult';


interface SearchProps {
  className?: string
}

const searchResources = async(searchQuery: string) => {
  try {
    const response = await fetch(`${API_URL}/search?q=${searchQuery}`)
    return await response.json()
  } catch (error) {
    console.error('Error fetching search results');
    return [];
  }
}

export function AppSearch({ className }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  
  useEffect(() => {
    const fetchResults = async () => {
      if (searchQuery.trim().length < 2) {
        setSearchResults([])
        return
      }
      
      setIsSearching(true)
      try {
        const results = await searchResources(searchQuery)
        setSearchResults(results)
      } catch (error) {
        console.error("Error searching resources:", error)
      } finally {
        setIsSearching(false)
      }
    }
    
    const debounce = setTimeout(fetchResults, 300)
    return () => clearTimeout(debounce)
  }, [searchQuery])
  
  // Show results when typing or when results are available
  useEffect(() => {
    if (searchQuery.trim().length >= 2 || searchResults.length > 0) {
      setShowResults(true)
    }
  }, [searchQuery, searchResults]);
  
  // Handle click outside to close results
  useEffect(() => {
    const handleClickOutside = () => {
      setShowResults(false)
    }
    
    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])
  
  // Prevent clicks inside the component from closing the results
  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }
  
  return (
    <div className={`relative ${className}`} onClick={handleContainerClick}>
      <div className="flex items-center space-x-2">
        <TextField
          size="small"
          placeholder={showResults ? "Search resources..." : ""}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
              sx: {
                borderRadius: showResults ? 1 : 4,
                pr: showResults ? undefined : 0,
              },
            }
          }}
        />
      </div>
      
      {false && showResults && (searchResults.length > 0 || isSearching) && (
        <div className="absolute left-0 right-0 z-10">
          {isSearching ? (
            <div className="mt-2 rounded-md border bg-background p-2 shadow-sm">
              <div className="flex items-center justify-center py-2">
                Loading...
              </div>
            </div>
          ) : (
            <div className="mt-2 max-h-[300px] overflow-auto rounded-md border bg-background p-0 shadow-sm">
              <ul className="divide-y divide-border">
                {searchResults.map((result) => (
                  <li key={`${result.type}-${result.id}`}>
                    <button
                      className="w-full px-4 py-3 text-left transition-colors hover:bg-muted focus:bg-muted focus:outline-none"
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
          )}
        </div>
      )}
    </div>
  )
}
