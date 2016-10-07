exports.getComponent = React => React.createClass({
  render() {
    return React.createElement('div', null, 'Hello, ', this.props.text)
  },
})

exports.props = {
  text: 'World!',
}
