import React, { Component } from 'react';

import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

export class Zoom extends Component {
  render() {
    return (
      <TransformWrapper>
        <TransformComponent>
          <img src="/vite.svg" alt="test" width={'200px'} />
        </TransformComponent>
      </TransformWrapper>
    );
  }
}
