module.exports = {
  dirsToCreate: ['assets/images', 'assets/fonts', 'assets/scripts'],
  filesToCopy: [
    {
      input: '_fonts.scss',
      output: 'assets/scss/includes/_fonts.scss'
    },
    {
      input: '_colors.scss',
      output: 'assets/scss/includes/_colors.scss'
    },
    {
      input: '_mixins.scss',
      output: 'assets/scss/includes/_mixins.scss'
    },
    {
      input: '_functions.scss',
      output: 'assets/scss/includes/_functions.scss'
    },
    {
      input: '_variables.scss',
      output: 'assets/scss/includes/_variables.scss'
    },
    {
      input: 'main.scss',
      output: 'assets/scss/main.scss'
    },
    {
      input: 'main.js',
      output: 'assets/scripts/main.js'
    },
    {
      input: 'gulpfile.js',
      output: 'gulpfile.js'
    },
    {
      input: 'robots.txt',
      output: 'robots.txt'
    },
    {
      input: '_gitignore',
      output: '.gitignore'
    }
  ],
  filesToRender: [
    {
      input: '_package.json',
      output: 'package.json'
    },
    {
      input: 'index.html',
      output: 'index.html'
    }
  ]
};