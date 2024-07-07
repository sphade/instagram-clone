<script lang="ts">
	import { Bookmark, CircleUser, Ellipsis, Heart, MessageCircle, Send } from 'lucide-svelte';
	import { Separator } from '$lib/components/ui/separator';
	import type { PostWithUser } from '$lib/types';
	import { CldImage } from 'svelte-cloudinary';

	let { caption, imageUrl, user, userId }: PostWithUser = $props();
</script>

<div class=" ">
	<a href={userId} class="mb-3 flex items-center gap-3">
		<CircleUser />
		<div class="">
			<p class="text-sm font-medium">{user.firstName}</p>
			<p class="text-xs text-muted-foreground">{user.email}</p>
		</div>
		<Ellipsis class="ml-auto w-fit" />
	</a>
	<CldImage
		width="960"
		height="600"
		src={imageUrl}
		class="h-[585px] w-full rounded bg-gray-100 object-contain"
		sizes="100vw"
		alt="post image"
	/>
	<div class="my-2 flex items-center gap-5">
		<Heart />
		<MessageCircle />
		<Send />

		<Bookmark class="ml-auto" />
	</div>

	<p class="mb-2 text-sm font-medium">100,4480 likes</p>
	<p class="mb-2 text-sm font-medium">
		{user.firstName}: <span class="font-light">{caption}</span>
	</p>

	<button class=" mb-2 text-sm capitalize text-muted-foreground">view all 24 comments</button>
	<input
		type="text"
		class="block border-none bg-transparent outline-none placeholder:text-sm"
		placeholder="Add a comments"
	/>
	<Separator class="mt-3" />
</div>
