import React, {Component} from 'react'
import {Emitter, Receiver} from '../index'

export default () => (
  <div style={{width: '100%', height: '100%', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <HeyHoLetsGo />
    <Receiver />
  </div>
)

class HeyHoLetsGo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPopover: false,
    }
    this.showPopover = this.showPopover.bind(this)
    this.hidePopover = this.hidePopover.bind(this)
  }

  showPopover() {
    this.setState({showPopover: true})
  }

  hidePopover() {
    this.setState({hidePopover: false})
  }

  render() {
    return (
      <div>
        <button onClick={this.showPopover}>
          Hey Ho
        </button>
        {this.state.showPopover ? (
          <Popover hide={this.hidePopover}>
            Let's Go
          </Popover>
        ) : null}
      </div>
    )
  }
}

const Popover = ({hide, children}) => (
  <Emitter>
    <div onClick={hide} style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{backgroundColor: 'white', padding: 20, borderRadius: 5}}>
        {children}
      </div>
    </div>
  </Emitter>
)
