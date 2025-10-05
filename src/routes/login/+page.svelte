<script>
	const userPattern = '[A-Za-z][A-Za-z0-9\\-]*';
	const passwordPattern = '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}';
	let username = '';
	let password = '';
	let showModal = false;
	let registerTitle = '';

	let registerMsg = '';
	async function register() {
		const res = await fetch('/api/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		});

		const data = await res.json();
		console.log(data);
		if (res.ok) {
			registerTitle = '🎉 恭喜！';
			registerMsg = '註冊成功！';
		} else {
			registerTitle = '';
			registerMsg = '註冊失敗！';
		}
		showModal = true;
	}

	async function login() {
		const res = await fetch('/api/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		});
		console.log(await res.json());
	}
	function confirmSuccess() {
		showModal = false;
		registerTitle = '';
		registerMsg = '';
		location.reload(); // 模擬 F5
	}
</script>

<svelte:head>
	<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
</svelte:head>
<div class="min-h-screen flex justify-center items-center bg-base-200 px-4">
	{#if showModal}
		<dialog class="modal modal-open">
			<div class="modal-box">
				<h3 class="font-bold text-lg">{registerTitle}</h3>
				<p class="py-4">{registerMsg}</p>
				<div class="modal-action">
					<button class="btn btn-primary" on:click={confirmSuccess}>OK</button>
				</div>
			</div>
		</dialog>
	{/if}
	<div class="card bg-base-100 shadow-xl p-8 w-full max-w-md">
		<h2 class="text-2xl font-bold text-center mb-6">Login</h2>

		<!-- Username -->
		<label class="input input-bordered flex items-center gap-2 mb-4 w-full">
			<svg
				class="h-5 w-5 opacity-50"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
				/>
				<circle cx="12" cy="7" r="4"></circle>
			</svg>
			<input
				type="text"
				required
				bind:value={username}
				placeholder="Username"
				pattern={userPattern}
				minlength="3"
				maxlength="30"
				title="Only letters, numbers or dash"
				class="grow"
			/>
		</label>
		<p class="text-sm text-gray-500 mb-4">
			Must be 3 to 30 characters, only letters, numbers or dash
		</p>

		<!-- Password -->
		<label class="input input-bordered flex items-center gap-2 mb-4 w-full">
			<svg
				class="h-5 w-5 opacity-50"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
				/>
				<circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
			</svg>
			<input
				type="password"
				required
				bind:value={password}
				placeholder="Password"
				minlength="8"
				pattern={passwordPattern}
				title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
				class="grow"
			/>
		</label>
		<p class="text-sm text-gray-500 mb-6">
			Must be at least 8 characters, include number, lowercase and uppercase
		</p>
		<div class="cf-turnstile w-full" data-sitekey="0x4AAAAAAB4_zQGEEut2yvVg"></div>
		<!-- Submit Button -->
		<button class="btn btn-primary w-full" on:click={login}>Login</button>
		<button class="btn btn-accent w-full" on:click={register}>Register</button>
	</div>
</div>
