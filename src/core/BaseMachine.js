import machina from 'machina'

var BaseMachine = machina.BehavioralFsm.extend({
  linkChildren () {
    console.log(this)
    // iterate over states, for each _child instance set its parent_machine to this machine
    for(var s in this.states) {
      console.log(s)
      let state = this.states[s]
      if (state._child) {
        console.log(state._child)
        if (typeof state._child === 'object' && state._child.factory != 'function') {
          console.log('linking')
          state._child.parent_machine = this
        } else {
          throw new Error('BaseMachine only supports instances of child submachines')
        }
      }
    }
  },

  // Creates a new instance of a state machine ChildMachine, passing
  // a refence to this machine as its parent
  createSubMachine: function (state, ChildMachine) {
    state._child = new ChildMachine({ parent_machine: this })
  },

  // Helper method to do a 'deep transition' across the state machines tree
  // on a relative path starting at the current machine
  go: function (client, relativePath) {
    if(typeof relativePath === 'string') {
      relativePath = relativePath.split('/')
    }

    if(!relativePath.length) return

    relativePath = relativePath.slice()

    const state = relativePath.shift()

    let machine

    if (state === '..') {
      machine = this.parent_machine
      if (relativePath.length === 0) {
        // transition to initialState of parent machine if no explicit state supplied
        machine = machine.instance || machine
        relativePath = [machine.initialState]
      }
    } else {
      this.transition(client, state)
      machine = this.states[state]._child
      if (!machine && relativePath.length) throw new Error('no child substate exists to complete transition')
    }

    if (machine && relativePath.length) {
      machine = machine.instance || machine
      machine.go(client, relativePath)
    }
  },

  queuedHandle: function (...args) {
    this._handleQueue = this._handleQueue || []

    if (this._priorQueuedHandleCallActive) {
      this._handleQueue.push(args)
    } else {
      this._priorQueuedHandleCallActive = true
      this.handle(...args)

      while(this._handleQueue.length) {
        args = this._handleQueue.shift()
        this.handle(...args)
      }

      this._priorQueuedHandleCallActive = false
    }
  }
})

export default BaseMachine
