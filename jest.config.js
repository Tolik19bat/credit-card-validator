module.exports = {
  testMatch: ['**/__tests__/**/*.test.js', '**/__e2e__/**/*.test.js'], // Шаблоны для поиска тестов
  coverageDirectory: './coverage', // Директория для отчетов о покрытии кода
  collectCoverageFrom: [
    'src/js/**/*.js', // Файлы, для которых нужно собирать данные о покрытии
    '!**/__tests__/**', // Исключаем тесты из отчета о покрытии
    '!**/__e2e__/**',
    '!**/node_modules/**',
  ],
};
