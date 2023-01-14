import { View, Text } from 'react-native'
import React, { createContext, useState } from 'react'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [id, setId] = useState()

    return (
        <AuthContext.Provider value={{
            id, setId
        }}>
            {children}
        </AuthContext.Provider>
    )

}

export { AuthContext, AuthProvider }