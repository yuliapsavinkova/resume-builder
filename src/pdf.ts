import PDFDocument from 'pdfkit';
import { createWriteStream } from 'fs';
import { loadResume, outputFilename } from './load';

const { profile, experience, skills, education } = loadResume();
const OUTPUT = outputFilename(profile).replace('.docx', '.pdf');

const NAVY = '#002D5B';
const DARK = '#222222';
const FONTB = 'Helvetica-Bold';
const FONT = 'Helvetica';
const ML = 54;
const MR = 54;
const MT = 54;

const doc = new PDFDocument({ size: 'LETTER', margin: 0, bufferPages: true });
doc.pipe(createWriteStream(OUTPUT));

const W = doc.page.width - ML - MR;
let y = MT;

function divider() {
  y += 10;
  doc
    .moveTo(ML, y)
    .lineTo(ML + W, y)
    .lineWidth(0.75)
    .strokeColor(NAVY)
    .stroke();
  y += 10;
}

function sectionHead(label: string) {
  doc.font(FONTB).fontSize(10.5).fillColor(NAVY);
  doc.text(label.toUpperCase(), ML, y, { width: W, lineBreak: false });
  y += 16;
}

function bodyText(str: string) {
  doc.font(FONT).fontSize(10).fillColor(DARK);
  doc.text(str, ML, y, { width: W });
  y = doc.y;
}

function jobHead(company: string, title?: string, location?: string, dates?: string) {
  const parenIdx = company.indexOf(' (');
  const companyMain = parenIdx !== -1 ? company.slice(0, parenIdx) : company;
  const companyQualifier = parenIdx !== -1 ? company.slice(parenIdx) : '';
  const rest = [title, [location, dates].filter(Boolean).join(' · ')].filter(Boolean).join(', ');
  const plainText = companyQualifier + (rest ? ` - ${rest}` : '');

  doc.font(FONTB).fontSize(11).fillColor(NAVY);
  const boldWidth = doc.widthOfString(companyMain);

  if (plainText) {
    doc.text(companyMain, ML, y, { lineBreak: false });
    doc
      .font(FONT)
      .fontSize(11)
      .fillColor(DARK)
      .text(plainText, ML + boldWidth, y, { width: W - boldWidth });
  } else {
    doc.text(companyMain, ML, y, { width: W });
  }
  y = doc.y + 4;
}

function bulletItem(str: string) {
  doc.font(FONT).fontSize(10).fillColor(DARK);
  doc.text('•', ML, y, { lineBreak: false });
  doc.text(str, ML + 14, y, { width: W - 14 });
  y = doc.y + 2;
}

doc.font(FONTB).fontSize(18).fillColor(NAVY);
doc.text(profile.name, ML, y, { width: W, align: 'center' });
y = doc.y + 4;

doc.font(FONT).fontSize(10.5).fillColor(DARK);
doc.text(profile.title, ML, y, { width: W, align: 'center' });
y = doc.y + 4;

doc.font(FONT).fontSize(9).fillColor(NAVY);
doc.text([profile.email, 'LinkedIn', 'GitHub'].join('  /  '), ML, y, { width: W, align: 'center' });
y = doc.y;

divider();
sectionHead('Summary');
bodyText(profile.summary);

divider();
sectionHead('Experience');

for (const job of experience) {
  y += 10;
  jobHead(job.company, job.title, job.location, job.dates);
  for (const b of job.bullets) bulletItem(b);
}

divider();
sectionHead('Key Skills');
bodyText(skills.join('  |  '));

divider();
sectionHead('Education');
for (const e of education) {
  bodyText(`${e.degree}, ${e.school}, ${e.location}`);
}

doc.end();
console.log(`✓ Built ${OUTPUT}`);
