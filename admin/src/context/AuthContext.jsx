import React, { createContext } from 'react'

export const authDataContext = createContext()
function AuthContext({children}) {
    // Use Vite env var when deployed; fall back to production backend or localhost for local dev
    let serverUrl = "http://localhost:8000"

    let value = {
      serverUrl
    }
  return (
    <div>
        <authDataContext.Provider value={value}>
            {children}
        </authDataContext.Provider>
      
    </div>
  )
}

export default AuthContext