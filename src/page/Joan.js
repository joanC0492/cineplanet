import React from 'react'



const Joan = ()=> {
  console.log("hola")

  React.useEffect(()=>{
    console.log("i");
  });

  return (
    <div>Joan</div>
  )
}

export {Joan};