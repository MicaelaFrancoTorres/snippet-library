'use client'
import { useEffect } from 'react'
import { useSnippetStore } from '@/lib/store'

export function StoreHydration() {
  useEffect(() => {
    useSnippetStore.persist.rehydrate()
  }, [])
  return null
}