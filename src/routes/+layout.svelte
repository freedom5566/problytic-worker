<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';
	const baseUrl = __BASE_URL__;
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<div class="navbar bg-neutral shadow-sm text-neutral-content">
	<div class="navbar-start">
		<div class="dropdown">
			<div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h8m-8 6h16"
					/>
				</svg>
			</div>
			<ul
				class="menu menu-sm dropdown-content bg-neutral text-neutral-content rounded-box z-1 mt-3 w-52 p-2 shadow"
			>
				<li><a class="btn btn-ghost text-xl" href={baseUrl}>首頁</a></li>
				<li><a class="btn btn-ghost text-xl" href="{baseUrl}/monster">怪物掉落查詢</a></li>
				<li><a class="btn btn-ghost text-xl" href={baseUrl}>物品掉落查詢</a></li>

				<li><a class="btn btn-ghost text-xl" href={baseUrl}>常見問題</a></li>
				<li><a class="btn btn-ghost text-xl" href="{baseUrl}/about">關於我們</a></li>
			</ul>
		</div>
		<a class="btn btn-ghost text-xl" href={baseUrl}>Problytic</a>
	</div>
	<div class="navbar-center hidden lg:flex">
		<ul class="menu menu-horizontal px-1">
			<li><a class="btn btn-ghost text-xl" href={baseUrl}>首頁</a></li>
			<li><a class="btn btn-ghost text-xl" href="{baseUrl}/monster">怪物掉落查詢</a></li>
			<li><a class="btn btn-ghost text-xl" href={baseUrl}>物品掉落查詢</a></li>

			<li><a class="btn btn-ghost text-xl" href={baseUrl}>常見問題</a></li>
			<li><a class="btn btn-ghost text-xl" href="{baseUrl}/about">關於我們</a></li>
		</ul>
	</div>
	<div class="navbar-end">
		<a class="btn btn-primary" href={baseUrl}>登入</a>
	</div>
</div>

{@render children?.()}
