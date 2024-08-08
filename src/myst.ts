import type { Affiliation, Contributor, PageFrontmatter } from 'myst-frontmatter';
import type { CFF, EntityCFF, PersonCFF, ReferenceCFF } from './types.js';
import { ReferenceType } from './types.js';

/**
 * Convert MyST Contributor to CFF Person
 */
export function authorToCFF(
  author: Contributor,
  affiliations?: Affiliation[],
): PersonCFF | EntityCFF {
  if (author.collaboration) {
    return {
      name: author.name ?? author.institution ?? '',
      address: author.address,
      city: author.city,
      region: author.state,
      'post-code': author.postal_code,
      country: author.country,
      email: author.email,
      tel: author.phone,
      fax: author.fax,
      website: author.url,
    };
  }
  const { family, given, dropping_particle, non_dropping_particle, suffix } =
    author.nameParsed ?? {};
  const affiliation = affiliations?.find(
    (aff) => author.affiliations?.[0] && aff.id === author.affiliations?.[0],
  );
  return {
    'family-names': `${non_dropping_particle ? `${non_dropping_particle} ` : ''}${family}`,
    'given-names': given ?? '',
    'name-particle': dropping_particle,
    'name-suffix': suffix,
    affiliation: affiliation?.name,
    address: affiliation?.address,
    city: affiliation?.city,
    region: affiliation?.state,
    'post-code': affiliation?.postal_code,
    country: affiliation?.country,
    orcid: author.orcid,
    email: author.email,
    tel: author.phone,
    fax: author.fax,
    website: author.url,
  };
}

/**
 * Convert MyST PageFrontmatter to CFF Reference
 */
export function frontmatterToReferenceCFF(
  frontmatter: PageFrontmatter,
  abstract?: string,
): ReferenceCFF {
  const { first_page, last_page, issue, volume } = frontmatter.biblio ?? {};
  const license = frontmatter.license?.content ?? frontmatter.license?.code;
  const contact = frontmatter.authors
    ?.filter((author) => author.corresponding)
    .map((author) => authorToCFF(author, frontmatter.affiliations));
  let dateString: string | undefined;
  if (frontmatter.date) {
    const date = new Date(frontmatter.date);
    dateString = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000)
      .toISOString()
      .split('T')[0];
  }
  const { title, authors } = frontmatter;
  if (!title) {
    throw new Error('CFF requires title');
  }
  if (!authors?.length) {
    throw new Error('CFF requires at least one author');
  }
  return {
    type: ReferenceType.article,
    abstract,
    title,
    authors: authors?.map((author) => authorToCFF(author, frontmatter.affiliations)),
    'date-released': dateString,
    contact: contact?.length ? contact : undefined,
    copyright: frontmatter.copyright,
    identifiers: frontmatter.doi
      ? [
          {
            type: 'doi',
            value: frontmatter.doi,
          },
        ]
      : undefined,
    editors: frontmatter.editors
      ?.map((id) => {
        const editor = frontmatter.contributors?.find((contrib) => contrib.id === id);
        if (!editor) return undefined;
        return authorToCFF(editor, frontmatter.affiliations);
      })
      .filter((editor): editor is PersonCFF | EntityCFF => !!editor),
    end: typeof last_page === 'number' ? last_page : undefined,
    issue: typeof issue === 'number' ? issue : undefined,
    'issue-title': typeof issue === 'string' ? issue : undefined,
    journal: frontmatter.venue?.title,
    keywords: frontmatter.keywords,
    license: license?.id,
    'license-url': license?.url,
    pages:
      typeof last_page === 'number' && typeof first_page === 'number'
        ? last_page - first_page + 1
        : undefined,
    start: typeof first_page === 'number' ? first_page : undefined,
    url: frontmatter.source,
    volume: typeof volume === 'number' ? volume : undefined,
    'volume-title': typeof volume === 'string' ? volume : undefined,
    repository: frontmatter?.github,
  };
}

/**
 * Convert MyST PageFrontmatter to CFF
 */
export function frontmatterToCFF(frontmatter: PageFrontmatter, abstract?: string): CFF {
  const license = frontmatter.license?.content ?? frontmatter.license?.code;
  const contact = frontmatter.authors
    ?.filter((author) => author.corresponding)
    .map((author) => authorToCFF(author, frontmatter.affiliations));
  let dateString: string | undefined;
  if (frontmatter.date) {
    const date = new Date(frontmatter.date);
    dateString = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000)
      .toISOString()
      .split('T')[0];
  }
  const { title, authors } = frontmatter;
  if (!title) {
    throw new Error('CFF requires title');
  }
  if (!authors?.length) {
    throw new Error('CFF requires at least one author');
  }
  return {
    'cff-version': '1.2.0',
    message: 'Please cite the following works when using this project.',
    abstract,
    title,
    authors: authors?.map((author) => authorToCFF(author, frontmatter.affiliations)),
    'date-released': dateString,
    contact: contact?.length ? contact : undefined,
    identifiers: frontmatter.doi
      ? [
          {
            type: 'doi',
            value: frontmatter.doi,
          },
        ]
      : undefined,
    keywords: frontmatter.keywords,
    license: license?.id,
    'license-url': license?.url,
    url: frontmatter.source,
    repository: frontmatter?.github,
  };
}
