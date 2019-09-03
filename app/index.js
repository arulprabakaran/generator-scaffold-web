'use strict';

const s = require('underscore.string'),
  generators = require('yeoman-generator'),
  config = require('./config'),
  mkdirp = require('mkdirp');

module.exports = generators.Base.extend({

  getPrompts: function () {
    var done = this.async();

    var prompts = [{
      name: 'appName',
      message: 'What would you like to call your application?',
      default: 'Scaffold'
    }, {
      name: 'appAuthor',
      message: 'What is your company/author name?'
    }];

    this.prompt(prompts, function(props) {
      this.appName = props.appName;
      this.appAuthor = props.appAuthor;

      this.slugifiedAppName = s(this.appName).slugify().value();
      this.humanizedAppName = s(this.appName).humanize().value();
      this.capitalizedAppAuthor = s(this.appAuthor).capitalize().value();

      done();
    }.bind(this));
  },

  writingFiles: function () {
    var templateData = {
      appName: this.appName,
      appAuthor: this.appAuthor,
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

  },

  install: function() {
    this.npmInstall();
  }

});