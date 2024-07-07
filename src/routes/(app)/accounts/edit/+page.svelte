<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Form from '$lib/components/ui/form';
</script>

<div class=" w-full max-w-[800px] px-10 md:px-20">
	<p class="py-5 text-lg font-bold">Edit profile</p>

	<div class="flex items-center gap-3 rounded-xl bg-gray-100 p-5">
		<div class="size-14 rounded-full bg-gray-500"></div>
		<div>
			<p class="text-sm font-medium">sphade_cigar</p>
			<p class="text-xs text-muted-foreground">armenia</p>
		</div>
		<Button class="ml-auto bg-blue-500 text-sm" size="sm">Change Profile</Button>
	</div>
	<!-- <form action="">
		<form method="POST" use:enhance>
			<Form.Field {form} name="field">
				<Form.Control let:attrs>
					<Form.Label>Label</Form.Label>
					<input {...attrs} bind:value={formData.field} />
				</Form.Control>
				<Form.Description>Description</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Button>Submit</Form.Button>
		</form>
	</form> -->
</div>
