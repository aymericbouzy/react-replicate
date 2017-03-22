import React, {Component} from 'react'

/*  The EmitterReceiver class aims to provide off-site rendering capabilities
 *  to React
 *  An instance of EmitterReceiver provides to Component classes, Emitter and
 *  Receiver.
 *
 *  The Receiver component has to be placed wherever the actual render has to
 *  be done, and left empty.
 *
 *  The Emitter component can be placed anywhere down or up the tree, and
 *  will contain the actual content to render. But the Emitter component does
 *  not render anything. Instead, it gives its content to be rendered inside
 *  the Receiver component.
 *
 *  It is possible to use multiple instance of Receivers and Emitters. In this
 *  case, all Receivers will contain the content of all Emitters rendered one
 *  after the other, in the order of rendering.
 *
 *
 *  Usage: const {Emitter: MyEmitter, Receiver: MyReceiver} = new EmitterReceiver()
 */
export class EmitterReceiver {
  constructor() {
    // The 'children' array will store every node to display inside a Receiver
    let children = []
    // The 'receivers' array stores every registered Receiver
    let receivers = []

    // Add a Receiver to the list of Receivers
    function registerReceiver(r) {
      receivers.push(r)
    }
    // Remove a Receiver from the list of Receivers
    function removeReceiver(r) {
      receivers.splice(receivers.indexOf(r), 1)
    }
    // Force the update of all the Receivers
    function triggerReceivers() {
      receivers.map(r => r.forceUpdate())
    }

    /* The Emitter class is a component that can be placed anywhere down or up
     * the tree, and will contain the actual content to render.
     * But the Emitter component does not render anything. Instead, it gives its
     * content to be rendered inside the Receiver component.
     */
    this.Emitter = class Emitter extends React.Component {
      constructor(props) {
        super(props)

        this.remove = this.remove.bind(this)
        this.add = this.add.bind(this)
      }

      // During its lifecycle, the component might need to remove its content
      // from the Receivers
      remove() {
        // Get the content from the Emitter
        let child = this.props.children
        // Check if the Emitter actually has content
        if (child !== null && child !== undefined) {
          child = child.length ? child : [child]  // Convert into Array

          // For each child, remove it from the children list
          child.map(c => {
            children.splice(children.indexOf(c), 1)
          })

          // Update each Receiver
          triggerReceivers()
        }
      }

      // During its lifecycle, the component will need to give its content to
      // the Receivers
      add() {
        // Get the content from the Emitter
        let child = this.props.children
        // Check if the Emitter acutally has content
        if (child !== null && child !== undefined) {
          child = child.length ? child : [child]  // Convert into Array

          // Add all children to the list
          children.push(...child)

          // Update each Receiver
          triggerReceivers()
        }
      }

      // When the component umounts or is about to be updated, we need
      // to remove its children from the list
      componentWillUnmount() {
        this.remove()
      }

      componentWillUpdate() {
        this.remove()
      }

      // When a component mounts or has just updated, we need to add its
      // children to the list
      componentDidMount() {
        this.add()
      }

      componentDidUpdate() {
        this.add()
      }


      // An Emitter should not render. It exists only to give its children
      // to the Receivers
      render() {
        return null
      }
    }

    /* The Receiver class is a component that has to be placed wherever
     * the actual render has to be done, and left empty.
     * Any content passed to a Receiver will be ignored.
     */
    this.Receiver = class Receiver extends React.Component {
      // When the component unmounts, it needs to be removed from
      // the list of Receivers
      componentWillUnmount() {
        removeReceiver(this)
      }

      // When the component mounts, it needs to be added to the list
      // of Receivers
      componentWillMount() {
        registerReceiver(this)
      }

      // When rendered, at Receiver component should display the children list
      render() {
        return (
          <div>
            {children}
          </div>
        )
      }
    }
  }
}
