import React, { createContext, useContext, useState, useEffect } from 'react';
import Account from '../../model/Account.tsx';

const UserContext = createContext();
const UserUpdateContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(
    new Account(
      1,
      '',
      '',
      '',
      false,
      false,
      false,
      false,
      true
    )
  );

  const handleUserOnChange = (
    accountId,
    accountUsername,
    accountPassword,
    employeeName,
    accessInventoryManagementSystem,
    accessEmployeeManagementSystem,
    accessIncomeAndExpenseSystem,
    accessOrderingSystem,
    isActive
  ) => {
    setUser(
      new Account(
        accountId,
        accountUsername,
        accountPassword,
        employeeName,
        accessInventoryManagementSystem,
        accessEmployeeManagementSystem,
        accessIncomeAndExpenseSystem,
        accessOrderingSystem,
        isActive
    ));
  }

  useEffect(() => {
    const fetchUser = () => {
      setUser(
        new Account(
        localStorage.getItem('accountId'),
        localStorage.getItem('accountUsername'),
        localStorage.getItem('accountPassword'),
        localStorage.getItem('employeeName'),
        localStorage.getItem('accessInventoryManagementSystem'),
        localStorage.getItem('accessEmployeeManagementSystem'),
        localStorage.getItem('accessIncomeAndExpenseSystem'),
        localStorage.getItem('accessOrderingSystem'),
        localStorage.getItem('isActive')
      ))
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={user}>
      <UserUpdateContext.Provider value={handleUserOnChange}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

export function useUserUpdate() {
  return useContext(UserUpdateContext);
}