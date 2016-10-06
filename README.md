# react-ssr-benchmarks

The purpose of this repo is to host runnable benchmarks of React's server-side rendering across
different versions.

I've browserified React into different bundles which exist in [the react/ folder](react/).

The benchmarks are ran with `NODE_ENV=production` so that checks and warnings are skipped.

## Instructions

1. Clone this repo.
2. Run `npm install`.
3. Run `npm run bench`.

## API

If you wish to run your own benchmarks (say you're developing your own renderToString function) you can do so programatically:

```js
const benchmarks = require('react-ssr-benchmarks')

benchmarks()
```

The `benchmarks` function is configurable. The following config will only run the benchmarks on React versions 14 and 15.

```js
const benchmarks = require('react-ssr-benchmarks')

benchmarks({
  versions: {
    12: false,
    13: false,
    14: true,
    15: true,
  }
})
```

You don't have to set 12 and 13 to `false` explicitly, they can be omitted and won't be ran.

```js
const benchmarks = require('react-ssr-benchmarks')

benchmarks({
  versions: {
    14: true,
    15: true,
  }
})
```

If you wish to change the component or how it is rendered in the benchmark, we've got options for you:

```js
const benchmarks = require('react-ssr-benchmarks')

benchmarks({
  versions: {
    14: true,
    15: true,
  },

  getComponent: React => class extends React.Component {
    render() {
      return <div>My own very simple Test Component. Here is a prop: {this.props.foo}</div>
    }
  },

  render: (Component, React, ReactDOMServer) => ReactDOMServer.renderToString(
    <Component foo="baz" />
  ),
})
```

Finally, to add your own suite of tests to run against React you can pass in a `test` Array:

```js
const benchmarks = require('react-ssr-benchmarks')

benchmarks({
  versions: {
    14: true,
    15: true,
  },

  test: [{
    name: 'My own super fast renderToString',
    React: React14,
    ReactDOMServer: {
      renderToString() {
        // my own implementation here
      }
    },
  }, {
    name: 'A streaming version of renderToString compatible with React 15',
    React: React15,
    ReactDOMServer: {
      renderToString() {
        // another r2s implementation here
      }
    },
  }]
})
```

## Results

### Simple

```txt
12 x 41,539 ops/sec ±1.95% (86 runs sampled)
13 x 49,345 ops/sec ±3.08% (82 runs sampled)
14 x 65,459 ops/sec ±2.99% (83 runs sampled)
15 x 103,724 ops/sec ±2.55% (82 runs sampled)
```

### Complex

```txt
12 x 44.76 ops/sec ±1.76% (57 runs sampled)
13 x 49.06 ops/sec ±3.41% (63 runs sampled)
14 x 70.77 ops/sec ±2.07% (61 runs sampled)
15 x 65.38 ops/sec ±4.63% (63 runs sampled)
```

## License

MIT
