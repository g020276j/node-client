const startBundle = async (contents: string) => {
	Bun.plugin({
		name: 'bundle-loader',
		setup(build) {
			build.module('bundle', () => ({ contents, loader: 'js' }));
		}
	});

	// @ts-ignore
	const bundle = await import('bundle');
	process.send(JSON.stringify(bundle.metadata));
	console.log(`\n-*- ${bundle.metadata.name} v${bundle.metadata.version} by ${bundle.metadata.developer} -*-`)
	bundle.init();
}

process.on('message', startBundle);