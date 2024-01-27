import React, { createContext, useState } from 'react';

const UserProgressContext = createContext({
    progress:'',
    showCart:()=>{},
    showCheckOut:()=>{},
    hideCart:()=>{},
    hideCheckOut:()=>{}
})

export function UserProgressContextProvider({children}) {
    const [userProgress,setUserProgress]=useState('')

    function showCart(){
        setUserProgress('cart')
    }
    function hideCart(){
        setUserProgress('')
    }
    function showCheckOut(){
        setUserProgress('checkout');
    }
    function hideCheckOut(){
        setUserProgress('')
    }


  const contextValue = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckOut,
    hideCheckOut
  }

  return <UserProgressContext.Provider value={contextValue}>
        {children}
  </UserProgressContext.Provider>
}

export default UserProgressContext;