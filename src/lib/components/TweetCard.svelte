<script lang="ts">
	import { Bookmark, CircleUser, Ellipsis, Heart, MessageCircle, Send } from 'lucide-svelte';
	import { Separator } from '$lib/components/ui/separator';
</script>

<div class="px-20">
	<div class="mb-3 flex items-center gap-3">
		<CircleUser />
		<div class="">
			<p class="text-sm font-medium">memez.ng</p>
			<p class="text-xs text-muted-foreground">funny videos</p>
		</div>
		<Ellipsis class="ml-auto w-fit" />
	</div>
	<img src="./electronics.png" class="h-[585px] w-full rounded bg-gray-100 object-contain" alt="" />

	<div class="my-1 flex items-center gap-5">
		<Heart />
		<MessageCircle />
		<Send />

		<Bookmark class="ml-auto" />
	</div>

	<p class="text-sm font-medium">11,448 likes</p>
	<p class="text-sm font-medium">
		memez.ng: <span class="font-light">which slide i your favorite</span>
	</p>

	<button class="mt-2 text-sm capitalize text-muted-foreground">view all 24 comments</button>
	<input
		type="text"
		class="block border-none outline-none placeholder:text-sm"
		placeholder="Add a comments"
	/>
	<Separator class="mt-3" />
</div>
