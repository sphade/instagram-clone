<script lang="ts">
	import { cn } from '$lib/utils';
	import { ActivitySquare, Bookmark, CircleUser, Instagram, Menu, Settings } from 'lucide-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';
	import { toggleMode, mode } from 'mode-watcher';
	import Home from './icons/Home.svelte';
	import Search from './icons/Search.svelte';
	import Explore from './icons/Explore.svelte';
	import Reels from './icons/Reels.svelte';
	import Messenger from './icons/Messenger.svelte';
	import Notifications from './icons/Notifications.svelte';
	import NewPost from './icons/NewPost.svelte';
	import Media from './icons/media.svelte';
	import Save from './icons/Save.svelte';
	import Logo from './icons/Logo.svelte';
	import { enhance } from '$app/forms';
	const sidebarItems = [
		{
			text: 'home',
			icon: Home,
			href: '/'
		},
		{
			text: 'search',
			icon: Search
		},
		{
			text: 'explore',
			icon: Explore
		},
		{
			text: 'reels',
			icon: Reels,
			href: '/accounts/edit'
		},
		{
			text: 'messages',
			icon: Messenger,
			href: '/sphade_cigar'
		},
		{
			text: 'notifications',
			icon: Notifications
		},
		{
			text: 'Create',
			icon: NewPost
		}
	];
	let openModal = $state(false);
</script>

<aside
	class="fixed flex h-full min-h-screen w-fit flex-col border-r bg-background p-3 md:w-[244px]"
>
	<div class="my-8 pl-3">
		<div class=" hidden w-fit md:inline-block">
			<Logo />
		</div>
		<Instagram class="md:hidden" />
	</div>
	<div class="flex flex-1 flex-col gap-2">
		{#each sidebarItems as { text, icon, href }}
			<svelte:element
				this={href ? 'a' : text === 'Create' ? 'button' : 'div'}
				{href}
				role="none"
				onclick={() => {
					if (text === 'Create') {
						openModal = true;
					}
				}}
				class="flex cursor-pointer items-center gap-1 rounded-md p-3 text-sm capitalize hover:bg-muted"
			>
				<svelte:component this={icon}></svelte:component>
				<div
					class={cn('ml-4 hidden md:inline-flex', {
						'font-bold': text === 'home'
					})}
				>
					{text}
				</div>
			</svelte:element>
		{/each}
		<div
			class="flex cursor-pointer items-center gap-1 rounded-md p-3 text-sm capitalize hover:bg-muted"
		>
			<CircleUser />
			<div class="ml-4 hidden md:inline-block">Profile</div>
		</div>
	</div>

	<DropdownMenu.Root>
		<DropdownMenu.Trigger
			class="flex cursor-pointer items-center gap-1 rounded-md p-3 text-sm capitalize hover:bg-muted"
		>
			<Menu />
			<div class="ml-4 hidden md:inline-block">Profile</div>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content class="w-[300px] rounded-xl  p-3 shadow-lg">
			<DropdownMenu.Group>
				<DropdownMenu.Item class="flex cursor-pointer items-center gap-2 p-3">
					<Settings />
					<a href="/">Setting</a>
				</DropdownMenu.Item>
				<DropdownMenu.Item class="flex cursor-pointer items-center gap-2 p-3"
					><ActivitySquare /> your activity</DropdownMenu.Item
				>
				<DropdownMenu.Item class="flex cursor-pointer items-center gap-2 p-3">
					<Bookmark /> Saved</DropdownMenu.Item
				>
				<DropdownMenu.Item onclick={toggleMode} class="flex cursor-pointer items-center gap-2 p-3"
					>{#if $mode === 'dark'}
						<Sun />
						light mode
					{:else if $mode === 'light'}
						<Moon />
						Dark mode
					{/if}

					<span class="sr-only">Toggle theme</span>
				</DropdownMenu.Item>
				<DropdownMenu.Separator class="h-2" />

				<DropdownMenu.Item type="submit" class="p-3">
					<form action="/?/logOut" method="POST" use:enhance>
						<button type="submit" class="w-full">Log out</button>
					</form>
				</DropdownMenu.Item>
			</DropdownMenu.Group>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</aside>

<Dialog.Root bind:open={openModal}>
	<Dialog.Content class="max-w-[450px]">
		<Dialog.Header>
			<Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
			<Dialog.Description class="grid h-[450px] place-items-center  ">
				<div class="space-y-3 text-center">
					<div class="mx-auto w-fit">
						<Media />
					</div>
					<p>Drag Photos and videos here</p>
					<Button size="sm" class="bg-blue-500">select from computers</Button>
				</div>
			</Dialog.Description>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
