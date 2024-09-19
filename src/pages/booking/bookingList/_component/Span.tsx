import React from "react";

export default function ({children}:{children: React.ReactNode}) {
  return (
    <span style={{
        fontSize:"14px",
        color:"#999999",
        display:'inline-block'
    }}>{children}</span>
  )
}
