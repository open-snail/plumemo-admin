#!/usr/bin/env node

require('yargs')
  .usage('$0 <cmd> [options] <entry>')
  .command(
    'dev <entry>',
    'devtools',
    (yargs) => {
      yargs
        .positional('entry', {
          type: 'string',
          describe: 'entry file or directory',
        })
        .option('name', {
          type: 'string',
          describe: `name for lib  (default: "name" in package.json or entry filename),
        it will be ignored when entry is a directory`,
          // demandOption: true,
        })
        .option('filename', {
          type: 'string',
          describe: `file name for output (default: value of --name),
      it will be ignored when entry is a directory`,
        })
        .option('dest', {
          type: 'string',
          default: 'dist',
          describe: 'output directory',
        })
        .option('plugin', {
          type: 'boolean',
          describe: 'run as plugin module, otherwise will run as theme module',
          default: false,
        })
        .option('admin', {
          type: 'boolean',
          describe: 'run as admin module',
          default: false,
        })
        .option('port', {
          type: 'number',
          describe: ' specify port',
          default: 5007,
        })
        .option('host', {
          type: 'string',
          describe: ' specify host',
          default: 'localhost',
        })
        .option('proxy-api-target', {
          type: 'string',
          describe: 'proxy to a specify api address(ex: http://localhost:5007)',
          default: '',
        });
    },
    (argv) => {
      const { entry, ...args } = argv;
      require('../dist/cli').run('dev', entry, args);
    },
  )
  .command(
    'build <entry>',
    'build modules',
    (yargs) => {
      yargs
        .positional('entry', {
          type: 'string',
          describe: 'entry file or directory',
        })
        .option('name', {
          type: 'string',
          describe: `name for lib  (default: "name" in package.json or entry filename),
          it will be ignored when entry is a directory`,
          // demandOption: true,
        })
        .option('filename', {
          type: 'string',
          describe: `file name for output (default: value of --name),
        it will be ignored when entry is a directory`,
        })
        .option('dest', {
          type: 'string',
          default: 'dist',
          describe: 'output directory',
        })
        .option('info', {
          type: 'boolean',
          default: false,
          describe: 'show build infos',
        });
    },
    (argv) => {
      const { entry, ...args } = argv;
      require('../dist/cli').run('build', entry, args);
    },
  )
  .help().argv;
