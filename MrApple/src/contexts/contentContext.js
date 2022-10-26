import React, { useState } from "react"

export const ContentContext = React.createContext({
  buttonsContent: [],
  sectionsContent: [],
  mappingBulletsContent: [],
})

export const ContentProvider = ({ children }) => {
  const [contentState, setContentState] = useState({
    buttonsContent: [],
    sectionsContent: [],
    mappingBulletsContent: []
  })

  const setContent = data => {
    setContentState({ ...contentState, ...data })
  }

  return (
    <ContentContext.Provider
      value={{
        ...contentState,
        setContent,
      }}
    >
      {children}
    </ContentContext.Provider>
  )
}
