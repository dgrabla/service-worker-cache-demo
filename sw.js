self.addEventListener('install', event => {
	console.info(`Installing Service Worker...`);
	// Adding requests to the cache
	event.waitUntil(
		caches.open('nemo-cache-v1')
			.then(cache => cache.addAll([
				'/',
				'/index.html',
				'/content/a1.html',
				'/content/a3.html',
				'/content/a4.html'
			]))
			.then(() => self.skipWaiting())
	);
});

self.addEventListener('activate', () => {
	console.info('Service Worker Activate');
});

self.addEventListener('fetch', event => {
	console.info(`Service Worker fetch ${event.request.method} ${event.request.url}`);
	// Delivering from the cache
	event.respondWith(
		caches.match(event.request)
			.then(response => response || fetch(event.request))
	);
});

