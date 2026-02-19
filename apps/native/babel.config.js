module.exports = (api) => {
	api.cache(true);

	return {
		presets: [
			[
				"babel-preset-expo",
				{
					reanimated: false,
					worklets: false,
				},
			],
		],
		// Only include reanimated plugin - it must be listed last (includes worklets in Reanimated 4)
		plugins: ["react-native-reanimated/plugin"],
	};
};
