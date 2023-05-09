import { View, Text } from 'react-native'
import React, { useState } from 'react'

export const useLogin = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('')
    const [showPassword, setShowPassword] = useState<boolean>(false)
  return {
     email,
     setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword

  }
    
}
