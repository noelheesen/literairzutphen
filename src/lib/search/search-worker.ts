import flexsearch from 'flexsearch';

const flexIndex = new flexsearch.Index({ tokenize: 'full' });
const map = new Map<number, any>();

addEventListener('message', async (event) => {
	const { type, payload } = event.data;

	if (type === 'init') {
		const writers = await (await fetch(`/writers.generated.json`)).json();

		writers.forEach((writer, index) => {
			map.set(index, writer);
			flexIndex.add(index, writer.slug);
		});

		postMessage({ type: 'ready' });
	}

	if (type === 'query') {
		const foundIndexes = flexIndex.search(payload);
		const results = foundIndexes.map((index) => map.get(index as number));

		postMessage({
			type: 'results',
			payload: results
		});
	}
});
