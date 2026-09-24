// resources/topics/wiso/data/sections.js
// Assembles the nine WiSo sections from ./sections/*.

import { section as s1 } from './sections/01-codetermination.js';
import { section as s2 } from './sections/02-labor-law.js';
import { section as s3 } from './sections/03-works-council.js';
import { section as s4 } from './sections/04-social-security.js';
import { section as s5 } from './sections/05-corporate-forms.js';
import { section as s6 } from './sections/06-market-structures.js';
import { section as s7 } from './sections/07-supply-demand.js';
import { section as s8 } from './sections/08-commercial-law.js';
import { section as s9 } from './sections/09-tldr.js';

export const sections = [s1, s2, s3, s4, s5, s6, s7, s8, s9];