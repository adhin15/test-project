const url = process.env.NEXT_PUBLIC_BASE_URL+"/api";



  export const authLogin = async (payload:any) => {
    const fullUrl = `${url}/login`;
    try {
       await fetch(fullUrl, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body:payload
      }).then(async (response)=>{
        if(response.ok){
          const responseData = await response.json();
          return Promise.resolve(responseData);
        }else{
          const responseData = await response.json();
          return Promise.reject(responseData);
        }
      })
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const authLogout = async (payload:any) => {
    
    const fullUrl = `${url}/logout`;
    try {
      await fetch(fullUrl, {
       method: "POST",
       headers: {
         'Content-Type': 'application/json'
       },
       body:JSON.stringify(payload)
     }).then(async (response)=>{
       const responseData = await response.json();
       if(response.ok){
         return Promise.resolve(responseData);
       }else{
         return Promise.reject(responseData);
       }
     })
   } catch (err) {
     return Promise.reject(err);
   }
  };
  
  export const getDetailAccount = async (payload:{id:string}) => {
    
    const fullUrl = `${url}/account/detail`;
    try {
      const response = await fetch(fullUrl, {
        method: "POST",
        headers: {
          accept: "application/json",
        },
        body:JSON.stringify(payload)
      });
      const responseData = await response.json();
      return Promise.resolve(responseData);
    } catch (err) {
      return Promise.resolve(err)
    }
  };