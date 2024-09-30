<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { auth, user } from '$lib/firebase.js';
	import { signOut } from 'firebase/auth';

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
				<p>Welcome {$user.displayName}</p>
			{:else}
				<p>Welcome {$user.email}</p>
			{/if}
			{#if $user.photoURL}
				<img class="rounded-full w-8" src={$user.photoURL} alt="" />
			{:else}
				<img
					class="rounded-full w-8"
					src="https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
					alt=""
				/>
			{/if}
			<button on:click={() => signOut(auth)} class="btn">Logout</button>
		</div>
	</nav>
{/if}
<main class="mx-auto px-24">
	<slot />
</main>
