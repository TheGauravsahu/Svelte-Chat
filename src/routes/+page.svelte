<script>
	import Chat from '$lib/components/Chat.svelte';
	import Login from '$lib/components/Login.svelte';
	import { user } from '$lib/firebase.js';
</script>

<main>
	{#if $user}
		<Chat />
	{:else}
		<Login />
	{/if}
</main>
