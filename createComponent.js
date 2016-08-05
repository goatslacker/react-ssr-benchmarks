exports.complex = (React) => {
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

exports.simple = React => React.createClass({
  render() {
    return React.createElement('div', null, 'Hello, ', this.props.text)
  },
})
