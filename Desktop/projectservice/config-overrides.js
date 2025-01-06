module.exports = function override(config) {
    config.resolve.fallback = {
      ...(config.resolve.fallback || {}),
      "url": require.resolve("url"),
      "fs": false,
    };
    return config;
  };
  