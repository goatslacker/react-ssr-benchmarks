const assert = require('assert')
const Benchmark = require('benchmark')
const createComponent = require('./createComponent')

const Reacts = {
  12: require('./react/12'),
  13: require('./react/13'),
  14: require('./react/14'),
  15: require('./react/15'),
}

const Components = Object.keys(Reacts).reduce((obj, version) => {
  const React = Reacts[version].React
  obj[version] = {
    simple: createComponent.complex(React),
    complex: createComponent.complex(React),
  }
  return obj
}, {})

function render(version, isSimple) {
  const React = Reacts[version].React
  const ReactDOMServer = Reacts[version].ReactDOMServer
  const type = isSimple ? 'simple' : 'complex'

  const props = {
    breadth: 8,
    depth: 4,
    text: 'World',
  }

  return ReactDOMServer.renderToString(
    React.createElement(Components[version][type], props)
  )
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

module.exports = (isSimple, createBenchmarkFunction) => {
  // Make sure each version is correct
  Object.keys(Reacts).forEach(version => assertVersions(version))

  // Logging to console so you can assert the markup is correct
  Object.keys(Reacts).forEach(version => console.log(render(version, isSimple)))

  const suite = new Benchmark.Suite()

  // Begin benchmarking
  suite.add('12', function () {
    render(12, isSimple)
  }).add('13', function () {
    render(13, isSimple)
  }).add('14', function () {
    render(14, isSimple)
  }).add('15', function () {
    render(15, isSimple)
  })

  if (createBenchmarkFunction) {
    suite.add('You', createBenchmarkFunction(Reacts, Components))
  }

  suite.on('cycle', function (event) {
    console.log(String(event.target))
  }).on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  }).run()
}
