import React from 'react'

function App2() {
  console.log("Hola");
  React.useEffect(()=>{
    console.log("i");
  })
  return (
    <div>App2</div>
  )
}

export {App2};