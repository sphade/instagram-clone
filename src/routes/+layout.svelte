<script lang="ts">
	import '@fontsource-variable/inter';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	let { children } = $props();
</script>

<ModeWatcher />

{@render children()}
