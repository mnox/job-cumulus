"use client"

import { Autocomplete, Box, TextField } from "@mui/material";
import type React from "react"
import { useEffect, useState } from "react"
import { NavLink } from 'react-router';
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
        const results = await searchResources(searchQuery);
        console.dir(results);
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
    <Autocomplete
      open={true}
      options={searchResults.map((option) => option.title)}
      renderOption={(params, option) => (
        <Box className={'p-2'}>
          <NavLink to={'/customers'}>{option}</NavLink>
        </Box>
      )}
      renderInput={
      (params) => {
        params.InputProps.endAdornment = null;
        return (
          <TextField
            {...params}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..." />
        );
      }}
    />
  )
}
