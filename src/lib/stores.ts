import { writable, type Writable } from 'svelte/store';
import type { Message } from './types/types';

export const newMessage = writable({text:''}) as Writable<Message>;