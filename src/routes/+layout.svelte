<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { auth, user } from '$lib/firebase.js';
	import { signOut } from 'firebase/auth';

	let isOpen = false;

	onMount(() => {
		const unsubscribe = auth.onAuthStateChanged((u) => {
			user.set(u);
		});
		return () => unsubscribe();
	});
</script>

{#if $user}
	<nav class="flex items-center justify-around border-b p-4 mb-4 px-8">
		<h1 class="text-2xl">ChatApp</h1>
		<div class="flex items-center gap-4">
			{#if $user.displayName}
				<p class="hidden md:block">Welcome {$user.displayName}</p>
			{:else}
				<p class="hidden md:block">Welcome {$user.email}</p>
			{/if}
			{#if $user.photoURL}
				<button on:click={() => (isOpen = !isOpen)}>
					<img class="rounded-full w-8 cursor-pointer" src={$user.photoURL} alt="" />
				</button>
			{:else}
				<button on:click={() => (isOpen = !isOpen)}>
					<img
						class="rounded-full w-8 cursor-pointer"
						src="https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
						alt=""
					/>
				</button>
			{/if}
			<button on:click={() => signOut(auth)} class="btn">Logout</button>
		</div>

		<!-- small device -->
		{#if isOpen}
			<div
				class="bg-zinc-100 shadow-lg h-fit w-[250px] absolute z-[99] right-4 top-20 p-4 block md:hidden lg:hidden"
			>
				{#if $user.displayName}
					<p class="">Welcome {$user.displayName}</p>
				{:else if $user.email != null}
					<p class="">Welcome {$user.email}</p>
				{:else}
					<p class="">Welcome as Guest</p>
				{/if}
			</div>
		{/if}
	</nav>
{/if}
<main class="mx-auto md:px-24 px-8">
	<slot />
</main>
