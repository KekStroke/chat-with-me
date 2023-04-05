<script lang="ts">
	export let name: string;
	export let width = '1rem';
	export let height = '1rem';
	export let focusable: boolean = false;

	let icons = [
		{
			box: 24,
			name: 'save',
			svg: `<g stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8"/><path d="M7 3v5h8"/></g>`
		},
		{
			box: 32,
			name: 'trash',
			svg: `<path d="M12 12h2v12h-2z" /><path d="M18 12h2v12h-2z" /><path d="M4 6v2h2v20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8h2V6zm4 22V8h16v20z" /><path d="M12 2h8v2h-8z" />`
		},
		{
			box: 16,
			name: 'send',
			svg: `<path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"></path>`
		}
	];
	let displayIcon = icons.find((e) => e.name === name);
</script>

<svg
	class={$$props.class}
	focusable={String(focusable)}
	{width}
	{height}
	viewBox="0 0 {displayIcon?.box} {displayIcon?.box}">{@html displayIcon?.svg}</svg
>
