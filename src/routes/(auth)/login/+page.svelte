<script lang="ts">
	import Logo from '$lib/components/icons/Logo.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Form from '$lib/components/ui/form';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { loginSchema } from '$lib/validator/index.js';
	import { Loader } from 'lucide-svelte';
	let { data } = $props();
	const form = superForm(data.form, {
		validators: zodClient(loginSchema)
	});

	const { form: formData, enhance, delayed } = form;
</script>

<Card.Root class="mx-auto w-full max-w-sm">
	<Card.Header>
		<div class="mx-auto w-fit">
			<Logo />
		</div>
	</Card.Header>
	<Card.Content>
		<form method="POST" use:enhance class="grid gap-4">
			<Form.Field {form} name="email">
				<Form.Control let:attrs>
					<Input {...attrs} placeholder="email" bind:value={$formData.email} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="password">
				<Form.Control let:attrs>
					<Input
						{...attrs}
						type="password"
						placeholder="password"
						bind:value={$formData.password}
					/>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Button type="submit" class="w-full bg-blue-500 hover:bg-blue-600">
				{#if $delayed}
					<Loader class="size-4 animate-spin" />
				{:else}
					Create an account
				{/if}
			</Button>
		</form>
		<div class="mt-4 text-center text-sm">
			Already have an account?,
			<a href="/register" class="underline"> register </a>
		</div>
	</Card.Content>
</Card.Root>
