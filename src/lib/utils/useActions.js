export default function useActions(node, actions) {
  let _actions = new Set()

  if (actions) {
    for (const action of actions) {
      _actions.add(action[0](node, action[1] || {}))
    }
  }

  return {
    update(actions) {
      if (actions) {
        for (const action of actions) {
          let _act = _actions.get(action)
          if (`update` in _act) {
            _act.update(action[1] || {})
          }
        }
      }
    },

    destroy() {
      _actions.forEach((act) => {
        if (act && `destroy` in act) {
          act.destroy()
        }
      })
    }
  }
}
