<script lang="ts">
	import { getDatas } from '$lib/front/monster';

	let monsters = getDatas();

	console.log(monsters);
</script>

<div class="min-h-screen flex justify-center items-center gap-8 flex-col md:flex-row px-4">
	<div class="card bg-base-100 shadow-xl p-4 overflow-x-auto w-full max-w-5xl mx-auto">
		<h2 class="text-2xl font-bold mb-4">資料輸入</h2>
		<form class="space-y-4">
			<!-- 下拉選單 -->
			<div class="form-control">
				<label for="monster-selector">
					<span class="label-text">怪物種類</span>
				</label>
				<select class="select select-bordered w-full" id="monster-selector" required>
					<option disabled selected>請選擇</option>
					<option value="1">項目 1</option>
					<option value="2">項目 2</option>
					<option value="3">項目 3</option>
				</select>
			</div>

			<!-- 輸入框 1 -->
			<div class="form-control">
				<label for="monster-share-datas">
					<span class="label-text">輸入內容一</span>
				</label>
				<input
					type="text"
					placeholder="請輸入內容一"
					class="input input-bordered w-full"
					id="monster-share-datas"
				/>
			</div>

			<!-- 送出按鈕 -->
			<div class="form-control mt-4">
				<button class="btn btn-primary w-full">送出</button>
			</div>
		</form>
	</div>
</div>
