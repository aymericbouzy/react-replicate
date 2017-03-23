import React, {Component} from 'react'

export function createEmitterReceiver() {
  let emitterIdentifier = 0, receiverIdentifier = 0
  const emittersChildren = {}, receivers = {}

  function sanitizeChildren(children) {
    if (children === undefined || children === null) {
      return []
    }
    if (Array.isArray(children)) {
      return children
    }
    return [children]
  }

  function getReceiverChildren() {
    return Object.keys(emittersChildren).reduce((children, id) => [
      ...children,
      ...emittersChildren[id],
    ], [])
  }

  function registerReceiver(receiver) {
    const id = receiverIdentifier++
    receivers[id] = receiver
    return () => {
      delete receivers[id]
    }
  }

  function registerEmitter(children) {
    const id = emitterIdentifier++
    emittersChildren[id] = sanitizeChildren(children)
    function emit() {
      const receiverChildren = getReceiverChildren()
      Object.keys(receivers).forEach((id) => receivers[id].update(receiverChildren))
    }
    return {
      emit(children) {
        emittersChildren[id] = sanitizeChildren(children)
        emit()
      },
      unmount() {
        delete emittersChildren[id]
        emit()
      },
    }
  }

  class Emitter extends Component {
    constructor(props) {
      super(props)
      const {emit, unmount} = registerEmitter(props.children)
      this.emit = emit
      this.unmount = unmount
    }

    componentWillUnmount() {
      this.unmount()
    }

    componentDidMount() {
      this.emit(this.props.children)
    }

    componentDidUpdate() {
      this.emit(this.props.children)
    }

    render() {
      return null
    }
  }

  class Receiver extends Component {
    constructor(props) {
      super(props)
      this.state = {
        children: getReceiverChildren(),
      }
      this.update = this.update.bind(this)
      this.unmount = registerReceiver(this)
    }

    update(children) {
      this.setState({children})
    }

    componentWillUnmount() {
      this.unmount()
    }

    render() {
      return (
        <div>
          {this.state.children}
        </div>
      )
    }
  }

  return {Emitter, Receiver}
}

const {Emitter, Receiver} = createEmitterReceiver();

export {Emitter, Receiver}
