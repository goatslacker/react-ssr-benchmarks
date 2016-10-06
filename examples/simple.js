exports.getComponent = React => React.createClass({
  render() {
    return React.createElement('div', null, 'Hello, ', this.props.text)
  },
})

exports.render = (Component, React, ReactDOMServer) => ReactDOMServer.renderToString(
  React.createElement(Component, { text: 'World' })
)
