import { Document, Packer, AlignmentType, LevelFormat } from 'docx';
import { writeFileSync } from 'fs';
import { loadResume, outputFilename } from './load';
import {
  nameBlock,
  titleBlock,
  contactBlock,
  divider,
  sectionHeader,
  jobHeader,
  bullet,
  bodyText,
  educationRow,
} from './components';

const { profile, experience, skills, education } = loadResume();
const OUTPUT = outputFilename(profile);

const doc = new Document({
  numbering: {
    config: [
      {
        reference: 'bullets',
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: '•',
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 320, hanging: 160 } } },
          },
        ],
      },
    ],
  },
  styles: { default: { document: { run: { font: 'Arial', size: 20 } } } },
  sections: [
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 900, right: 1080, bottom: 900, left: 1080 },
        },
      },
      children: [
        nameBlock(profile.name),
        titleBlock(profile.title),
        contactBlock(profile),

        divider(),
        sectionHeader('Summary'),
        bodyText(profile.summary),

        divider(),
        sectionHeader('Experience'),
        ...experience.flatMap((job) => [
          jobHeader(job.company, job.title, job.location, job.dates),
          ...job.bullets.map(bullet),
        ]),

        divider(),
        sectionHeader('Key Skills'),
        bodyText(skills.join('  |  ')),

        divider(),
        sectionHeader('Education'),
        ...education.map((e) => educationRow(`${e.degree}, ${e.school}, ${e.location}, ${e.date}`)),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  writeFileSync(OUTPUT, buffer);
  console.log(`✓ Built ${OUTPUT}`);
});
