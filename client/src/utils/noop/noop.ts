const noop = () => {};

noop.async = () => new Promise<void>((resolve) => resolve());

export default noop;
