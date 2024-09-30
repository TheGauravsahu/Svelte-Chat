<script>
	import { onMount, afterUpdate } from 'svelte';
	import { firestore } from '$lib/firebase.js';
	import { user } from '$lib/firebase.js';
	import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';

	let chatContainer;
	let message = '';
	let chats = [];

	const scrollToBottom = () => {
		chatContainer.scrollTop = chatContainer.scrollHeight;
	};

	onMount(() => {
		scrollToBottom();
	});

	afterUpdate(() => {
		scrollToBottom();
	});

	async function sendMessage() {
		try {
			await addDoc(collection(firestore, 'chats'), {
				uid: $user.uid,
				message: message,
				avatar: $user.photoURL,
				sentAt: +new Date()
			});
			message = '';
		} catch (error) {
			console.log(error);
		}
	}
	function fetchMessages() {
		const chatCollection = collection(firestore, 'chats');

		// Create a query to order by sentAt field in ascending order
		const chatQuery = query(chatCollection, orderBy('sentAt', 'asc'));

		// Use the query to fetch and listen to changes in the chat collection
		onSnapshot(chatQuery, (chatSnapshot) => {
			chats = chatSnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data()
			}));
		});
	}

	onMount(() => {
		fetchMessages();
	});

	function formatTimestamp(timestamp) {
		const date = new Date(timestamp);
		return date.toLocaleString('en-US', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: true // Change to false for 24-hour format
		});
	}
</script>

<section class="w-full h-full flex flex-col">
	<div bind:this={chatContainer} class="flex-grow overflow-y-auto p-4 max-h-[70vh]">
		{#each chats as chat}
			{#if $user.uid === chat.uid}
				<div class="chat chat-end">
					<div class="chat-image avatar">
						<div class="w-10 rounded-full">
							{#if chat.avatar}
								<img class="rounded-full w-8" src={chat.avatar} alt="" />
							{:else}
								<img
									class="rounded-full w-8"
									src="https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
									alt=""
								/>
							{/if}
						</div>
					</div>
					<div class="chat-bubble">{chat.message}</div>
					<div class="chat-footer opacity-50">{formatTimestamp(chat.sentAt)}</div>
				</div>
			{:else}
				<div class="chat chat-start">
					<div class="chat-image avatar">
						<div class="w-10 rounded-full">
							{#if chat.avatar}
								<img class="rounded-full w-8" src={chat.avatar} alt="" />
							{:else}
								<img
									class="rounded-full w-8"
									src="https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
									alt=""
								/>
							{/if}
						</div>
					</div>
					<div class="chat-bubble chat-bubble-accent">{chat.message}</div>
					<div class="chat-footer opacity-50">{formatTimestamp(chat.sentAt)}</div>
				</div>
			{/if}
		{/each}
	</div>

	<form class="w-full p-4 flex gap-4 fixed bottom-0 left-0" on:submit={sendMessage}>
		<input
			bind:value={message}
			placeholder="Send message"
			class="input w-[80%] input-bordered"
			type="text"
		/>
		<button class="btn flex gap-1 items-center text-lg"
			>Send <svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-send-horizontal"
				><path
					d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z"
				/><path d="M6 12h16" /></svg
			></button
		>
	</form>
</section>
