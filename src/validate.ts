import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { schema } from './schema.js';
import type { CFF } from './types.js';
import { readCFF } from './file.js';

const VERSION_KEY = 'cff-version';

/**
 * Validate CFF data using json schema validation
 *
 * Throws error if validation fails
 */
export function validateCFF(input: any) {
  if (typeof input !== 'object' || Array.isArray(input)) {
    throw new Error(`CFF input is not an object`);
  }
  const version = input[VERSION_KEY];
  if (version && version !== '1.2.0') {
    console.log(`Unsupported cff-version "${version}" - Validating CFF file against version 1.2.0`);
    input[VERSION_KEY] = '1.2.0';
  }
  const ajv = new Ajv.Ajv();
  addFormats.default(ajv);
  const validate = ajv.compile(schema);
  if (!validate(input)) {
    throw new Error(
      `CFF validation failed${validate.errors ? `\n${JSON.stringify(validate.errors)}` : ''}`,
    );
  }
  return input as CFF;
}

/**
 * Load CFF data from file and validate
 */
export function validateCFFFile(file: string): CFF {
  const cff = readCFF(file);
  return validateCFF(cff);
}
