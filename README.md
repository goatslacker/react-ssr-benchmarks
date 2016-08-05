# react-ssr-benchmarks

The purpose of this repo is to host runnable benchmarks of React's server-side rendering across
different versions.

I've browserified React into different bundles which exist in [react/](the react/ folder).

The benchmarks are ran with `NODE_ENV=production` so that checks and warnings are skipped.

## Instructions

1. Clone this repo.
2. Run `npm install`.
3. Run `npm run bench`.

## Results

12 > 14 > 13 > 15

### Simple

```txt
12 x 33,660 ops/sec ±2.65% (81 runs sampled)
13 x 14,411 ops/sec ±1.71% (82 runs sampled)
14 x 24,226 ops/sec ±2.07% (85 runs sampled)
15 x 4,865 ops/sec ±2.12% (78 runs sampled)
```

### Complex

```txt
12 x 27.01 ops/sec ±4.64% (47 runs sampled)
13 x 8.09 ops/sec ±3.67% (25 runs sampled)
14 x 17.10 ops/sec ±3.72% (34 runs sampled)
15 x 2.96 ops/sec ±10.37% (11 runs sampled)
```

## License

MIT
