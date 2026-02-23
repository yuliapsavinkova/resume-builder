import { Paragraph, TextRun, AlignmentType, BorderStyle, ExternalHyperlink } from 'docx';
import { colors, sizes, font } from './styles';
import type { Profile } from './types';

export function nameBlock(text: string): Paragraph {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text, bold: true, size: sizes.name, color: colors.navy, font })],
    spacing: { before: 0, after: 80 },
  });
}

export function titleBlock(text: string): Paragraph {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text, size: sizes.title, color: colors.dark, font })],
    spacing: { before: 0, after: 80 },
  });
}

function link(label: string, url: string): ExternalHyperlink {
  return new ExternalHyperlink({
    link: url,
    children: [
      new TextRun({ text: label, size: sizes.small, color: colors.navy, font, underline: {} }),
    ],
  });
}

export function contactBlock(profile: Profile): Paragraph {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      link(profile.email, `mailto:${profile.email}`),
      new TextRun({ text: '  /  ', size: sizes.small, color: colors.dark, font }),
      link('LinkedIn', profile.linkedin),
      new TextRun({ text: '  /  ', size: sizes.small, color: colors.dark, font }),
      link('GitHub', profile.github),
    ],
    spacing: { before: 0, after: 0 },
  });
}

export function divider(): Paragraph {
  return new Paragraph({
    children: [new TextRun('')],
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: colors.navy, space: 1 } },
    spacing: { before: 140, after: 120 },
  });
}

export function sectionHeader(text: string): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text: text.toUpperCase(),
        bold: true,
        size: sizes.section,
        color: colors.navy,
        font,
      }),
    ],
    spacing: { before: 0, after: 100 },
  });
}

export function jobHeader(
  company: string,
  title?: string,
  location?: string,
  dates?: string,
): Paragraph {
  const children: TextRun[] = [
    new TextRun({ text: company, bold: true, size: sizes.job, color: colors.navy, font }),
  ];

  if (title) {
    children.push(
      new TextRun({ text: ' - ', size: sizes.job, color: colors.dark, font }),
      new TextRun({ text: title, bold: true, size: sizes.job, color: colors.navy, font }),
    );
  }

  const meta = [location, dates].filter(Boolean).join('  ·  ');
  if (meta) {
    children.push(
      new TextRun({ text: '  ·  ', size: sizes.job, color: colors.dark, font }),
      new TextRun({ text: meta, size: sizes.job, color: colors.dark, font }),
    );
  }

  return new Paragraph({ children, spacing: { before: 180, after: 50 } });
}

export function bullet(text: string): Paragraph {
  return new Paragraph({
    numbering: { reference: 'bullets', level: 0 },
    children: [new TextRun({ text, size: sizes.body, color: colors.dark, font })],
    spacing: { before: 38, after: 38 },
  });
}

export function bodyText(text: string): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, size: sizes.body, color: colors.dark, font })],
    spacing: { before: 0, after: 0 },
  });
}

export function educationRow(text: string): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, size: sizes.body, color: colors.dark, font })],
    spacing: { before: 0, after: 0 },
  });
}
