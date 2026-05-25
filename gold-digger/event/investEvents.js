import { EventEmitter } from 'node:events';
import { saveInvestments } from '../utils/saveInvestments.js';

export const investEvents = new EventEmitter();

investEvents.addListener('investment-made', saveInvestments);