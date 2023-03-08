export const fetchUser = () => {

    if (typeof window !== 'undefined') {
      const userInfo =
      localStorage.getItem('userId') !== 'undefined'
        ? JSON.parse(localStorage.getItem('userId'))
        : localStorage.clear()
   
    return userInfo
    }
    
  }
  
  export const userAccessToken = () => {
    const accessToken =
      localStorage.getItem('accessToken') !== 'undefined'
        ? JSON.parse(localStorage.getItem('accessToken'))
        : localStorage.clear()
  
    return accessToken
  }