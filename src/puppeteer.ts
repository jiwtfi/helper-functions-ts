import { Page, ElementHandle } from 'puppeteer-core';

export const selectElement = (parent: Page | ElementHandle) => async (selector: string) => {
  const element = await parent.waitForSelector(selector);
  if (!element) throw new Error(`No element was found with the query "${selector}"`);
  return element;
};

export const extractHref = (anchor: ElementHandle) => anchor.getProperty('href').then(handle => handle.jsonValue() as Promise<string>);
export const extractText = (element: ElementHandle) => element.getProperty('textContent').then(handle => handle.jsonValue() as Promise<string>).then(text => text.trim());