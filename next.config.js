const { env } = require('process');

module.exports = {
	env: {
		baseUrl: 'http://localhost:8000',
	},
	reactStrictMode: true,
	swcMinify: true,
	experimental: {
		optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
	},
};
