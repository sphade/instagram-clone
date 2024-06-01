<script lang="ts">
	import Stories from '$lib/components/Stories.svelte';
	import TweetCard from '$lib/components/TweetCard.svelte';
	import { CircleUser } from 'lucide-svelte';
</script>

<div class="flex gap-5 pt-6">
	<div class="flex-1 flex-shrink">
		<div class="mx-auto w-full max-w-[630px]">
			<Stories />

			<div class="mt-5 space-y-5">
				{#each { length: 10 } as _}
					<TweetCard />
				{/each}
			</div>
		</div>
	</div>

	<div class="mx-16 hidden w-[319px] px-3 text-sm xl:inline-block">
		<div class="flex items-center gap-3">
			<CircleUser class="size-11" />
			<div>
				<p class="font-medium">lawal_adebola</p>
				<p class="text-muted-foreground">fawaz</p>
			</div>
		</div>
		<div class="mb-3 mt-8 flex items-center justify-between">
			<p class="capitalize text-muted-foreground">suggested for you</p>
			<a class="text-xs font-medium" href="/">See All</a>
		</div>
		<div class="space-y-4">
			{#each { length: 5 } as _}
				<div class="flex items-center gap-3">
					<CircleUser class="size-11" />
					<div>
						<p class="font-medium">lawal_adebola</p>
						<p class="text-muted-foreground">fawaz</p>
					</div>
					<a href="/" class="ml-auto text-xs text-blue-500">Follow</a>
				</div>
			{/each}
		</div>
	</div>
</div>
