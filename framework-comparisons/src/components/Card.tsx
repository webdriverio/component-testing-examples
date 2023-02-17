import React, { useState } from 'react'

export enum SideEffect {
    ZERO_HEIGHT = 1,
    INVISIBLE,
    OVERLAYING_ELEMENT,
    OUT_OF_BOUNDS
}

interface Props {
    sideEffect?: SideEffect
}

export const Card: React.FC<Props> = (props?: Props) => {
    const [count, setCount] = useState(0)
    const style: React.ButtonHTMLAttributes<HTMLButtonElement> = props?.sideEffect === SideEffect.INVISIBLE
        ? { visibility: 'hidden' } as any
        : props?.sideEffect === SideEffect.ZERO_HEIGHT
            ? { padding: 0, height: 0, fontSize: 0, border: 0 }
            : props?.sideEffect === SideEffect.OUT_OF_BOUNDS
                ? { position: 'absolute', left: '10000px' }
                : {}

    return <div className="testbed">
        <button
            aria-label="counter"
            onClick={() => setCount((count) => count + 1)}
            style={style}
        >
            count is {count}
        </button>
        { props?.sideEffect === SideEffect.OVERLAYING_ELEMENT ? <Overlay /> : null }
        <p>
            Edit <code>src/App.tsx</code> and save to test HMR
        </p>
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
        You can't click it!
    </div>
}
