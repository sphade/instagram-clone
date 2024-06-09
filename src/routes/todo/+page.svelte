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
		{#if $errors}
			<p
				in:fly={{ y: 20 }}
				out:slide
				class="alert alert-error text-center font-medium capitalize text-white"
			>
				{$errors.task}
			</p>
		{/if}
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

		<Form.Button>Add todo</Form.Button>
	</form>

	<ul class="menu bg-base-200 rounded-box">
		{#if data?.todos.length > 0}
			{#each data.todos as todo (todo.id)}
				<li>
					<form method="POST" action="?/delete" class="flex items-center justify-between">
						<input type="hidden" name="id" value={todo.id} />
						<span>{todo.task}</span>
						<img
							src={`http://127.0.0.1:8090/api/files/users/${todo?.expand?.user?.id}/${todo?.expand?.user?.avatar}`}
							class="avatar h-10 w-10"
							alt=""
						/>
						<button class="h-5 w-5"><img src="./remove.svg" alt="" /></button>
					</form>
				</li>
			{/each}
			{#if $delayed}
				loading
			{/if}
		{/if}
		<img src="" alt="" />
	</ul>
</div>
