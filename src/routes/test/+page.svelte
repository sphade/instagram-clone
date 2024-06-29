<script lang="ts">
	import { enhance } from '$app/forms';
	let { data } = $props();
	$inspect(data);
</script>

{#each data.todos as todo}
	<div>
		<p class="inline-block">{todo.content}</p>
	</div>
{/each}

<form use:enhance method="POST">
	<button type="submit">submit</button>
</form>
