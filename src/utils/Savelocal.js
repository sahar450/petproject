import React from 'react';

export  function Savelocal(item,token) {
 
    localStorage.setItem(item, JSON.stringify(token));
}
export function gettoken(item) {
    const getuser = JSON.parse(localStorage.getItem(item));

    return getuser;
}

