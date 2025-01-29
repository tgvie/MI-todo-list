import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],

    // Custom rules
    rules: {
      'arrow-spacing': ['error', { before: true, after: true }],
      'block-spacing': 'error',
      'brace-style': ['error', '1tbs', { allowSingleLine: false }],
      'comma-dangle': ['error', 'always-multiline'],
      curly: ['error', 'all'],
      'import/no-absolute-path': 'off',
      indent: ['error', 2, { SwitchCase: 1 }],
      'key-spacing': ['error', { afterColon: true, beforeColon: false }],
      'keyword-spacing': ['error', { before: true }],
      'no-console': process.env.PROD ? 'warn' : 'off',
      'no-debugger': process.env.PROD ? 'warn' : 'off',
      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
      'no-undef': process.env.PROD ? 'error' : 'warn',
      'no-unreachable': process.env.PROD ? 'error' : 'warn',
      'no-unused-vars': process.env.PROD ? 'error' : 'warn',
      'object-curly-spacing': ['error', 'always'],
      "quotes": ["error", "single", { "avoidEscape": true }],
      semi: ['error', 'always'],
      'space-before-blocks': ['error', 'always'],
      'space-infix-ops': ['error', { int32Hint: false }],
      "eol-last": ["error", "never"],
    },
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  skipFormatting,
)
