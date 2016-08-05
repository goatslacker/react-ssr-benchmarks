const assert = require('assert')
const Benchmark = require('benchmark')

const Reacts = {
  12: require('./react/12'),
  13: require('./react/13'),
  14: require('./react/14'),
  15: require('./react/15'),
}

const Components = Object.keys(Reacts).reduce((obj, version) => {
  const React = Reacts[version].React
  obj[version] = React.createClass({
    render() {
      return React.createElement('div', null, 'Hello, ', this.props.text)
    }
  })
  return obj
}, {})

function render(version) {
  const React = Reacts[version].React
  const ReactDOMServer = Reacts[version].ReactDOMServer
  return ReactDOMServer.renderToString(React.createElement(Components[version], { text: 'World' }))
}

function assertVersions(version) {
  const valid = {
    12: '0.12.2',
    13: '0.13.3',
    14: '0.14.8',
    15: '15.3.0',
  }
  const React = Reacts[version].React

  assert.ok(
    React.version === valid[version],
    `Failed version check for ${version}. Expected ${valid[version]} got ${React.version}`)
}

// Make sure each version is correct
Object.keys(Reacts).forEach(version => assertVersions(version))

// Make sure we are in "production" mode
assert.ok(process.env.NODE_ENV === 'production')

// Logging to console so you can assert the markup is correct
Object.keys(Reacts).forEach(version => console.log(render(version)))

// Begin benchmarking
new Benchmark.Suite()
  .add('12', function () {
    render(12)
  })
  .add('13', function () {
    render(13)
  })
  .add('14', function () {
    render(14)
  })
  .add('15', function () {
    render(15)
  })
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run()
