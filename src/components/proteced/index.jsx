import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import {  Navigate, Outlet } from 'react-router-dom';//routede alt elemanı ekrana basmamıza yrdımcı oluyor
import { auth } from '../../firebase';

//!parent route un Element
const Proteced = () => {
    const [isAuth, setIsAuth] = useState();
    
    useEffect(() => {
     //!kullanıcın oturumunu izler ve oturumunda bir değişiklik olduğunda cb functionu tetikler   
        onAuthStateChanged(auth, (user) => {
    //! eğer kullanıcı varsa yetkisi true olsun yoksa false olsun
setIsAuth(user ? true : false);
        });
    },[]);

    //! eğer kullanıcının yetkisi yoksa logine yönlendir
  if(isAuth === false){
   return <Navigate to={"/"} replace />
}
  //!eğer yetkisi varsa alt route'daki elemana yönlendir

return <Outlet/>;

};

export default Proteced;
