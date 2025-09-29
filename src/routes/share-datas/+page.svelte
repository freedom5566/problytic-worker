<script lang="ts">
	import { getDatas } from '$lib/front/monster';

	let monsters = getDatas();
	let ref_number = '';
	// 轉換成 [{id, name, datas}, ...] 方便操作
	let monsterList = Object.entries(monsters).map(([id, obj]) => ({
		id,
		name: obj.name,
		datas: obj.datas
	}));

	let selectedMonsterId: string | null = null;
	let selectedDataId: string | null = null;

	// 取得目前選到的怪物
	$: selectedMonster = monsterList.find((m) => m.id === selectedMonsterId);

	async function handleSubmit() {
		if (!selectedMonster || !selectedDataId || !ref_number) return;

		const payload = {
			monsters_id: selectedMonsterId,
			monsters_name: selectedMonster.name,
			monsters_drop_id: selectedDataId,
			monsters_drop_name: selectedMonster.datas[selectedDataId],
			ref_number: Number(ref_number)
		};

		try {
			const res = await fetch('/api/share-datas', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload)
			});

			if (!res.ok) {
				const err = await res.json();
				console.error('送出失敗:', err.message);
				alert('送出失敗: ' + err.message);
				return;
			}

			const data = await res.json();
			console.log('送出成功:', data);
			alert('送出成功！');

			// 清空表單
			selectedMonsterId = null;
			selectedDataId = null;
			ref_number = '';
		} catch (e) {
			console.error('發生錯誤:', e);
			alert('伺服器錯誤，請稍後再試');
		}
	}
</script>

<div class="min-h-screen flex justify-center items-center gap-8 flex-col md:flex-row px-4">
	<div class="card bg-base-100 shadow-xl p-4 overflow-x-auto w-full max-w-5xl mx-auto">
		<h2 class="text-2xl font-bold mb-4">資料輸入</h2>
		<form class="space-y-4" on:submit|preventDefault={handleSubmit}>
			<!-- 怪物選單 -->
			<div class="form-control">
				<label for="monster-selector">
					<span class="label-text">怪物種類</span>
				</label>
				<select
					class="select select-bordered w-full"
					id="monster-selector"
					required
					bind:value={selectedMonsterId}
				>
					<option disabled selected value={null}>請選擇怪物</option>
					{#each monsterList as monster (monster.id)}
						<option value={monster.id}>{monster.name}</option>
					{/each}
				</select>
			</div>

			<!-- 掉落物品選單 -->
			<div class="form-control">
				<label for="monster-datas-selector">
					<span class="label-text">參照數量</span>
				</label>
				<input
					type="number"
					required
					bind:value={ref_number}
					placeholder="請輸入數量"
					class="input input-bordered w-full"
				/>
			</div>

			<!-- 掉落物品選單 -->
			<div class="form-control">
				<label for="monster-datas-selector">
					<span class="label-text">掉落物品</span>
				</label>
				<select
					class="select select-bordered w-full"
					id="monster-datas-selector"
					required
					bind:value={selectedDataId}
					disabled={!selectedMonster}
				>
					<option disabled selected value={null}>請選擇物品</option>
					{#if selectedMonster}
						{#each Object.entries(selectedMonster?.datas || {}) as [id, name] (id)}
							<option value={id}>{name}</option>
						{/each}
					{/if}
				</select>
			</div>

			<!-- 送出按鈕 -->
			<div class="form-control mt-4">
				<button class="btn btn-primary w-full">送出</button>
			</div>
		</form>
	</div>
</div>
