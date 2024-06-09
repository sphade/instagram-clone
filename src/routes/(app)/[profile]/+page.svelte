<script lang="ts">
	import { CircleUser, Grid, Heart, MessageCircle, Plus } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
</script>

<div class="px-10 md:px-20">
	<div class="mb-11 flex">
		<div class="px-8 md:px-16">
			<CircleUser class="size-36 " />
		</div>

		<div class="space-y-5">
			<div class="flex items-center gap-5">
				<p class="text-xl">sphade_cigar</p>
				<Button variant="secondary">Edit profile</Button>
			</div>
			<div class="flex items-center gap-5 text-lg">
				<p>1 post</p>
				<p>11 followers</p>
				<p>91 following</p>
			</div>
			<p class="text-sm font-semibold">armenia</p>
		</div>
	</div>

	<div class="mb-14 p-2 pl-10">
		<div class="w-fit space-y-2">
			<div
				class="flex size-20 items-center justify-center rounded-full border border-gray-400 bg-gray-100"
			>
				<Plus class="size-16  font-thin text-gray-400" />
			</div>
			<p class="text-center text-xs font-medium">New</p>
		</div>
	</div>
	<Separator />
	<div class="mx-auto flex w-fit gap-14">
		<div class="flex w-fit items-center gap-3 border-t border-black py-4 text-xs capitalize">
			<Grid class="size-3" />
			Posts
		</div>
		<div class="flex w-fit items-center gap-3 border-t border-black py-4 text-xs capitalize">
			<Grid class="size-3" />
			Posts
		</div>
		<div class="flex w-fit items-center gap-3 border-t border-black py-4 text-xs capitalize">
			<Grid class="size-3" />
			Posts
		</div>
	</div>

	<div class="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
		<div class="group relative h-[308px] cursor-pointer">
			<img src="./dj.jpg" class="h-full w-full" alt="" />
			<div
				class="absolute top-0 hidden h-full w-full items-center justify-center gap-10 bg-black/20 group-hover:flex"
			>
				<div class="flex items-center gap-2 text-white">
					<Heart class="fill-white" />
					4
				</div>
				<div class="flex items-center gap-2 text-white">
					<MessageCircle class="fill-white" />
					4
				</div>
			</div>
		</div>
	</div>
</div>
