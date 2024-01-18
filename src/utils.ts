export const range = (stop: number) => [...Array(stop).keys()];
export const sleep = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));