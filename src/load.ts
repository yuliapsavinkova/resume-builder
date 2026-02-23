import { readFileSync } from 'fs';
import { parse } from 'yaml';
import { join } from 'path';
import type { ResumeData } from './types';

export function loadResume(): ResumeData {
  const variant = process.argv[2] ?? 'base';
  const filePath = join(process.cwd(), 'resumes', `${variant}.yaml`);
  return parse(readFileSync(filePath, 'utf-8')) as ResumeData;
}

export function outputFilename(profile: { name: string }): string {
  const variant = process.argv[2] ?? 'base';
  const name = profile.name
    .split(' ')
    .map((w) => w[0] + w.slice(1).toLowerCase())
    .join('_');
  const suffix = variant === 'base' ? '' : `_${variant}`;
  return `${name}_Resume${suffix}.docx`;
}
