exports.getComponent = (React) => {
  const RecursiveDivs = React.createClass({
    click() {
      console.log('CLICKED!')
    },

    render() {
      var depth = this.props.depth
      var breadth = this.props.breadth

      if (depth <= 0) return React.createElement('div', null, this.props.text)

      var children = []
      for (var i = 0; i < breadth; i += 1) {
        children.push(React.createElement(RecursiveDivs, {
          key: i,
          depth: depth - 1,
          breadth: breadth - 1,
          text: this.props.text,
        }))
      }

      return React.createElement('div', {
        onClick: this.click,
      }, children)
    },
  })
  return RecursiveDivs
}

exports.render = (Component, React, ReactDOMServer) => ReactDOMServer.renderToString(
  React.createElement(Component, {
    breadth: 8,
    depth: 4,
  })
)
