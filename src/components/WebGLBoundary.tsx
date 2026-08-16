import { Component, type ReactNode } from 'react'

/** WebGL 失败时回退到静态渐变 */
export default class WebGLBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch() {
    // WebGL 不可用时静默回退
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}
