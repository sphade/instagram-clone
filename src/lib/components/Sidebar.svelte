<script lang="ts">
	import { cn } from '$lib/utils';
	import { ActivitySquare, CircleUser, Instagram, Menu, Settings } from 'lucide-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

	const sidebarItems = [
		{
			text: 'home',
			icon: 'Home.svg'
		},
		{
			text: 'search',
			icon: 'Search.svg'
		},
		{
			text: 'explore',
			icon: 'Explore.svg'
		},
		{
			text: 'reels',
			icon: 'Reels.svg'
		},
		{
			text: 'messages',
			icon: 'Messenger.svg'
		},
		{
			text: 'notifications',
			icon: 'Notifications.svg'
		},
		{
			text: 'Create',
			icon: 'New post.svg'
		}
	];
</script>

<aside
	class="fixed flex h-full min-h-screen w-fit flex-col border-r bg-background p-3 md:w-[244px]"
>
	<div class="my-8 pl-3">
		<img src="./icons/Instagram.svg" class=" hidden w-fit md:inline-block" alt="" />
		<Instagram class="md:hidden" />
	</div>
	<div class="flex flex-1 flex-col gap-2">
		{#each sidebarItems as { text, icon }}
			<div
				class="flex cursor-pointer items-center gap-1 rounded-md p-3 text-sm capitalize hover:bg-slate-100"
			>
				<img src={`./icons/${icon}`} alt="" />
				<div
					class={cn('ml-4 hidden md:inline-flex', {
						'font-bold': text === 'home'
					})}
				>
					{text}
				</div>
			</div>
		{/each}
		<div
			class="flex cursor-pointer items-center gap-1 rounded-md p-3 text-sm capitalize hover:bg-slate-100"
		>
			<CircleUser />
			<div class="ml-4 hidden md:inline-block">Profile</div>
		</div>
	</div>

	<DropdownMenu.Root>
		<DropdownMenu.Trigger
			class="flex cursor-pointer items-center gap-1 rounded-md p-3 text-sm capitalize hover:bg-slate-100"
		>
			<Menu />
			<div class="ml-4 hidden md:inline-block">Profile</div>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content class="w-[300px] rounded-xl  p-3 shadow-lg">
			<DropdownMenu.Group>
				<DropdownMenu.Item class="flex cursor-pointer items-center gap-2 p-3">
					<Settings />
					Setting</DropdownMenu.Item
				>
				<DropdownMenu.Item class="flex cursor-pointer items-center gap-2 p-3"
					><ActivitySquare /> your activity</DropdownMenu.Item
				>
				<DropdownMenu.Item class="flex cursor-pointer items-center gap-2 p-3"
					><img src="./icons/Save.svg" alt="" /> Saved</DropdownMenu.Item
				>
				<DropdownMenu.Item class="flex cursor-pointer items-center gap-2 p-3"
					><img src="./icons/Save.svg" alt="" /> Switch apperance</DropdownMenu.Item
				>
				<DropdownMenu.Separator class="h-2" />

				<DropdownMenu.Item class="p-3">Logout</DropdownMenu.Item>
			</DropdownMenu.Group>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</aside>
