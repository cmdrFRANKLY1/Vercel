// resources/topics/mukb/data/sections.js
// Assembles the MuKb sections from ./sections/*.

import { section as s1 } from './sections/01-kundenakte.js';
import { section as s2 } from './sections/02-lastenheft.js';
import { section as s3 } from './sections/03-lasten-pflichten.js';
import { section as s4 } from './sections/04-soll-ist.js';

export const sections = [s1, s2, s3, s4];