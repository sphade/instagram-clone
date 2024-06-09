<script lang="ts">
	import { fly, slide } from 'svelte/transition';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';

	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms';

	let { data } = $props();
	let loading = $state(false);
	let deleting: string[] = $state([]);
	let form = superForm(data.form);
	let { enhance, delayed, form: formData, errors } = form;
</script>

<div class="mx-auto w-96 space-y-3">
	<form action="?/logout" use:enhance method="POST">
		<button class="btn-error btn">logout </button>
	</form>

	<form
		method="POST"
		action="/todo?/createTodo"
		use:enhance
		class="card mt-10 space-y-3 border p-10 shadow"
	>
		<p class="text-center text-lg font-semibold capitalize text-orange-500">
			sveltekit form action
		</p>
		<Form.Field {form} name="task">
			<Form.Control let:attrs>
				<Form.Label>Label</Form.Label>
				<Input {...attrs} bind:value={$formData.task} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Button>
			{#if $delayed}
				loading...
			{:else}
				Add todo
			{/if}
		</Form.Button>
	</form>

	<ul class="menu bg-base-200 rounded-box">
		{#if data?.todos.length > 0}
			{#each data.todos as todo (todo.id)}
				<li>
					<form method="POST" action="?/delete" class="flex items-center justify-between">
						<span>{todo.task}</span>
					</form>
				</li>
			{/each}
		{/if}
	</ul>
</div>
