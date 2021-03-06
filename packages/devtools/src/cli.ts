import * as dev from './dev';
import * as build from './build';

const commands: Record<string, (file: string, arg: Record<string, any>) => void> = {
  dev: dev.run,
  build: build.run,
};

export function run(cmd: string, file: string, args: Record<string, any>) {
  let command = commands.dev;
  if (commands[cmd]) {
    command = commands[cmd];
  }
  return command(file, args);
}
