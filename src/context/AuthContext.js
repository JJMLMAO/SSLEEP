import React, {createContext, useState, useEffect} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import {BASE_URL} from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoading, setisLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const login = async token => {
    setisLoading(true);
    setUserToken(token);

    await EncryptedStorage.setItem('userToken', token);
    setisLoading(false);
  };

  const logout = async () => {
    setisLoading(true);
    setUserToken(null);
    await EncryptedStorage.removeItem('userToken');
    setisLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setisLoading(true);
      let userToken = await EncryptedStorage.getItem('userToken');
      setUserToken(userToken);
      setisLoading(false);
    } catch (err) {
      console.log(`isLoggedIn error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{login, logout, isLoading, userToken}}>
      {children}
    </AuthContext.Provider>
  );
};
