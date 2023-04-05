import { writable, type Writable } from 'svelte/store';
import type { Message } from '$lib/types/types';

export const newMessage = writable({message:'', sender:''}) as unknown as Writable<Message>;