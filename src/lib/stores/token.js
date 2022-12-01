import { writable } from 'svelte/store'

// Get the value out of storage on load.
const stored = localStorage.token
// or localStorage.getItem('content')

// Set the stored value or a sane default.
export const token = writable(stored || 'Hello, World!')

// Anytime the store changes, update the local storage value.
token.subscribe((value) => localStorage.token = value)
// or localStorage.setItem('content', value)