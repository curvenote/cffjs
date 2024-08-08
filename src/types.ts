export enum ReferenceType {
  'art' = 'art',
  'article' = 'article',
  'audiovisual' = 'audiovisual',
  'bill' = 'bill',
  'blog' = 'blog',
  'book' = 'book',
  'catalogue' = 'catalogue',
  'conference-paper' = 'conference-paper',
  'conference' = 'conference',
  'data' = 'data',
  'database' = 'database',
  'dictionary' = 'dictionary',
  'edited-work' = 'edited-work',
  'encyclopedia' = 'encyclopedia',
  'film-broadcast' = 'film-broadcast',
  'generic' = 'generic',
  'government-document' = 'government-document',
  'grant' = 'grant',
  'hearing' = 'hearing',
  'historical-work' = 'historical-work',
  'legal-case' = 'legal-case',
  'legal-rule' = 'legal-rule',
  'magazine-article' = 'magazine-article',
  'manual' = 'manual',
  'map' = 'map',
  'multimedia' = 'multimedia',
  'music' = 'music',
  'newspaper-article' = 'newspaper-article',
  'pamphlet' = 'pamphlet',
  'patent' = 'patent',
  'personal-communication' = 'personal-communication',
  'proceedings' = 'proceedings',
  'report' = 'report',
  'serial' = 'serial',
  'slides' = 'slides',
  'software-code' = 'software-code',
  'software-container' = 'software-container',
  'software-executable' = 'software-executable',
  'software-virtual-machine' = 'software-virtual-machine',
  'software' = 'software',
  'sound-recording' = 'sound-recording',
  'standard' = 'standard',
  'statute' = 'statute',
  'thesis' = 'thesis',
  'unpublished' = 'unpublished',
  'video' = 'video',
  'website' = 'website',
}

export enum ReferenceStatus {
  'abstract' = 'abstract',
  'advance-online' = 'advance-online',
  'in-preparation' = 'in-preparation',
  'in-press' = 'in-press',
  'preprint' = 'preprint',
  'submitted' = 'submitted',
}

export const CFF_KEYS = [
  'cff-version',
  'message',
  'preferred-citation',
  'references',
  'type',
  'title',
  'authors',
  'abstract',
  'commit',
  'contact',
  'date-released',
  'doi',
  'identifiers',
  'keywords',
  'license',
  'license-url',
  'repository',
  'repository-artifact',
  'repository-code',
  'url',
  'version',
];

type SharedFieldsEntity = {
  address?: string;
  alias?: string;
  city?: string;
  country?: string;
  email?: string;
  fax?: string;
  orcid?: string;
  'post-code'?: string | number;
  region?: string;
  tel?: string;
  website?: string;
};

export type EntityCFF = {
  name: string;
  'date-end'?: string;
  'date-start'?: string;
  location?: string;
} & SharedFieldsEntity;

export type PersonCFF = {
  'family-names'?: string;
  'given-names'?: string;
  'name-particle'?: string;
  'name-suffix'?: string;
  affiliation?: string;
} & SharedFieldsEntity;

export type IdentifierCFF = {
  type: 'doi' | 'url' | 'swh' | 'other';
  value: string;
  description?: string;
};

type SharedFieldsCFF = {
  title: string;
  authors: (PersonCFF | EntityCFF)[];
  abstract?: string;
  commit?: string;
  contact?: (PersonCFF | EntityCFF)[];
  'date-released'?: string;
  doi?: string;
  identifiers?: IdentifierCFF[];
  keywords?: string[];
  license?: string | string[];
  'license-url'?: string;
  repository?: string;
  'repository-artifact'?: string;
  'repository-code'?: string;
  url?: string;
  version?: string | number;
};

export type ReferenceCFF = SharedFieldsCFF & {
  type: ReferenceType;
  abbreviation?: string;
  'collection-doi'?: string;
  'collection-title'?: string;
  'collection-type'?: string;
  conference?: EntityCFF;
  copyright?: string;
  'data-type'?: string;
  database?: string;
  'database-providor'?: EntityCFF;
  'date-accessed'?: string;
  'date-downloaded'?: string;
  'date-published'?: string;
  department?: string;
  edition?: string;
  editors?: (PersonCFF | EntityCFF)[];
  'editors-series'?: (PersonCFF | EntityCFF)[];
  end?: number | string;
  entry?: string;
  filename?: string;
  format?: string;
  institution?: EntityCFF;
  isbn?: string;
  issn?: string;
  issue?: string | number;
  'issue-date'?: string;
  'issue-title'?: string;
  journal?: string;
  languages?: string[];
  'loc-end'?: number | string;
  'loc-start'?: number | string;
  location?: EntityCFF;
  medium?: string;
  month?: number | string;
  nihmsid?: string;
  notes?: string;
  number?: string | number;
  'number-volumes'?: number | string;
  pages?: number | string;
  'patent-states'?: string[];
  pmcid?: string;
  publisher?: EntityCFF;
  recipients?: (EntityCFF | PersonCFF)[];
  scope?: string;
  section?: string | number;
  senders?: (EntityCFF | PersonCFF)[];
  start?: number | string;
  status?: ReferenceStatus;
  term?: string;
  'thesis-type'?: string;
  translators?: (EntityCFF | PersonCFF)[];
  volume?: number | string;
  'volume-title'?: string;
  year?: number | string;
  'year-original'?: number | string;
};

export type CFF = SharedFieldsCFF & {
  'cff-version': '1.2.0';
  message: string;
  'preferred-citation'?: ReferenceCFF;
  references?: ReferenceCFF[];
  type?: 'dataset' | 'software';
};
