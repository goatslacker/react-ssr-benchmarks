# react-ssr-benchmarks

The purpose of this repo is to host runnable benchmarks of React's server-side rendering across
different versions.

I've browserified React into different bundles which exist in [the react/ folder](react/).

The benchmarks are ran with `NODE_ENV=production` so that checks and warnings are skipped.

## Instructions

1. Clone this repo.
2. Run `npm install`.
3. Run `npm run bench`.

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
