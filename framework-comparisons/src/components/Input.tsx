import React, { useState } from 'react'

export enum SideEffect {
  DISABLED = 0,
  ZERO_HEIGHT,
  INVISIBLE,
  OVERLAYING_ELEMENT,
  OUT_OF_BOUNDS
}

interface Props {
  sideEffect?: SideEffect
}

export const Input: React.FC<Props> = (props?: Props) => {
  const inputProps: React.InputHTMLAttributes<HTMLInputElement> = props?.sideEffect === SideEffect.DISABLED
    ? { disabled: true }
    : props?.sideEffect === SideEffect.INVISIBLE
      ? { style: { visibility: 'hidden' } }
      : props?.sideEffect === SideEffect.ZERO_HEIGHT
        ? { style: { padding: 0, height: 0, fontSize: 0, border: 0 } }
        : props?.sideEffect === SideEffect.OUT_OF_BOUNDS
          ? { style: { position: 'absolute', left: '10000px' } }
          : {}

  return <div className="testbed">
    <input
      placeholder="username"
      type={'text'}
      {...inputProps}
    />
    {props?.sideEffect === SideEffect.OVERLAYING_ELEMENT ? <Overlay /> : null}
  </div>
}

const Overlay: React.FC = () => {
  return <div style={{
    position: 'absolute',
    top: 0,
    width: '200px',
    height: '100px',
    backgroundColor: 'red'
  }}>
    You can't see it!
  </div>
}
