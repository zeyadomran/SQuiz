module.exports = {
	//...other configs
	webpack: (config) => {
		config.module.rules.push(
			{
				test: /\.svg$/,
				use: ["@svgr/webpack"],
			},
			{
				test: /\.mp3$/,
				loader: "file-loader",
			}
		);
		return config;
	},
};
