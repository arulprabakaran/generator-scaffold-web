'use strict';

const s = require('underscore.string'),
  Generators = require('yeoman-generator'),
  config = require('./config'),
  mkdirp = require('mkdirp');

module.exports = class extends Generators{

  async getPrompts() {

    var prompts = [{
      name: 'appName',
      message: 'What would you like to call your application?',
      default: 'Scaffold'
    }, {
      name: 'appAuthor',
      message: 'What is your company/author name?'
    }];

    this.answers = await this.prompt(prompts);

    this.slugifiedAppName = s(this.answers.appName).slugify().value();
    this.humanizedAppName = s(this.answers.appName).humanize().value();
    this.capitalizedAppAuthor = s(this.answers.appAuthor).capitalize().value();

  }

  writingFiles() {

    const templateData = {
      appName: this.answers.appName,
      appAuthor: this.answers.appAuthor,
      slugifiedAppName: this.slugifiedAppName,
      humanizedAppName: this.humanizedAppName,
      capitalizedAppAuthor: this.capitalizedAppAuthor
    };

    var copy = (input, output) => {
      this.fs.copy(this.templatePath(input), this.destinationPath(output));
    };

    var copyTpl = (input, output, data) => {
      this.fs.copyTpl(
        this.templatePath(input),
        this.destinationPath(output),
        data
      );
    };

    // Render Files
    config.filesToRender.forEach(file => {
      copyTpl(file.input, file.output, templateData);
    });

    // Copy Files
    config.filesToCopy.forEach(file => {
      copy(file.input, file.output);
    });

    // Create extra directories
    config.dirsToCreate.forEach(item => {
      mkdirp(item);
    });

  }

  install() {
    this.npmInstall();
  }

}