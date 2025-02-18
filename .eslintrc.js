module.exports = {
  extends: [
    'eslint-config-purrweb-react',
    'plugin:react/recommended'
  ],
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ["@src", "./src"],
          ["@ducks", "./src/store/ducks"],
          ["@routes", "./src/routes/"],
          ["@utils", "./src/utils"],
          ["@components", "./src/views/components"],
          ["@enhancers", "./src/views/enhancers"],
          ["@layouts", "./src/views/layouts"],
          ["@pages", "./src/views/pages"],
          ["@prop-types", "./src/views/prop-types"],
          ["@UI", "./src/views/UI"],
          ["@constants", "./src/constants"],
        ],
      },
    },
  },
};