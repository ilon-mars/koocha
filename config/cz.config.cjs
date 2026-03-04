// config/cz.config.cjs
/** @type {import('cz-git').UserConfig} */
module.exports = {
  types: [
    { value: 'feat', name: 'feat: Новая функциональность' },
    { value: 'fix', name: 'fix: Исправление бага' },
    { value: 'docs', name: 'docs: Документация' },
    { value: 'style', name: 'style: Форматирование кода' },
    { value: 'refactor', name: 'refactor: Рефакторинг кода' },
    { value: 'perf', name: 'perf: Улучшение производительности' },
    { value: 'test', name: 'test: Добавление или исправление тестов' },
    { value: 'build', name: 'build: Изменения в системе сборки' },
    { value: 'ci', name: 'ci: Настройка CI/CD' },
    { value: 'chore', name: 'chore: Обслуживание кодовой базы' },
    { value: 'revert', name: 'revert: Откат изменений' }
  ],

  scopes: [
    { name: 'components' },
    { name: 'pages' },
    { name: 'composables' },
    { name: 'store' },
    { name: 'router' },
    { name: 'types' },
    { name: 'api' },
    { name: 'utils' },
    { name: 'styles' },
    { name: 'assets' },
    { name: 'config' },
    { name: 'deps' }
  ],

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix', 'refactor', 'perf', 'types'],
  subjectLimit: 100
};
