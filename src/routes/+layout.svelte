<script lang="ts">
	import Sidebar from '$lib/components/Sidebar.svelte';
	import '@fontsource-variable/inter';
	import '../app.css';
	let { children } = $props();
</script>

<div class="">
	<Sidebar />
	<main class="ml-[73px] md:ml-[244px]">
		{@render children()}
	</main>
</div>
