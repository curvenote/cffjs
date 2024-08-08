import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import type { CFF } from './types.js';

export const CFF_FILENAME = 'CITATION.cff';

/**
 * Write CFF data to CITATION.cff file in 'directory'
 */
export function writeCFF(cff: CFF, directory: string, opts?: fs.WriteFileOptions) {
  if (!fs.existsSync(directory)) fs.mkdirSync(directory, { recursive: true });
  const file = path.join(directory, CFF_FILENAME);
  fs.writeFileSync(file, yaml.dump(cff), opts);
}

/**
 * Read CFF data from file
 *
 * File content is not validated; you may use validateCFFFile to read and validate
 */
export function readCFF(file: string): CFF {
  if (fs.existsSync(file) && fs.lstatSync(file).isDirectory()) {
    file = path.join(file, CFF_FILENAME);
  }
  if (!fs.existsSync(file)) {
    throw new Error(`CFF file does not exist: ${file}`);
  }
  const cffString = fs.readFileSync(file).toString();
  const cff = yaml.load(cffString);
  return cff as CFF;
}
