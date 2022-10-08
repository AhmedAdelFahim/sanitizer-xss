/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import * as sanitizeHtml from 'sanitize-html';
import { ISanitizerOptions } from './sanitizer.interface';

function hasOwn(object: any, key: string) {
  const keys: any = Reflect.ownKeys(object).filter((item: any) => typeof item !== 'symbol');
  return keys.includes(key);
}

function initializeOptions(options: ISanitizerOptions) {
  const sanitizerOptions: any = {};
  if (hasOwn(options, 'allowedTags') && Array.isArray(options.allowedTags) && options.allowedTags.length > 0) {
    sanitizerOptions.allowedTags = options.allowedTags;
  }
  return {
    allowedKeys: (hasOwn(options, 'allowedKeys') && Array.isArray(options.allowedKeys) && options.allowedKeys) || [],
    sanitizerOptions,
  };
}

function sanitize(data: any, options: any): any {
  if (typeof data === 'string') {
    return sanitizeHtml(data, options.sanitizerOptions);
  }
  if (Array.isArray(data)) {
    return data.map((item: any) => {
      if (typeof item === 'string') {
        return sanitizeHtml(item, options.sanitizerOptions);
      }
      if (Array.isArray(item) || typeof item === 'object') {
        return sanitize(item, options);
      }
      return item;
    });
  }
  if (typeof data === 'object' && data !== null) {
    Object.keys(data).forEach((key) => {
      if (options.allowedKeys.includes(key)) {
        return;
      }
      const item = data[key];
      if (typeof item === 'string') {
        data[key] = sanitizeHtml(item, options.sanitizerOptions);
      } else if (Array.isArray(item) || typeof item === 'object') {
        data[key] = sanitize(options, item);
      }
    });
  }
  return data;
}

export function prepareSanitize(data: any, options: ISanitizerOptions = {}) {
  const initializedOptions = initializeOptions(options);
  return sanitize(data, initializedOptions);
}
