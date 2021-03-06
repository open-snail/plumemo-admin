// cp package.json _package.json &&preset=`conventional-commits-detector` && echo $preset && bump=`conventional-recommended-bump -p angular` && echo ${1:-$bump} && npm --no-git-tag-version version ${1:-$bump} &>/dev/null && conventional-changelog -i CHANGELOG.md -s -p ${2:-$preset} && git add CHANGELOG.md package.json package-lock.json && version=`cat package.json` && git commit -m'docs(CHANGELOG): $version' && mv -f _package.json package.json && npm version ${1:-$bump} -m 'chore(release): %s' && git push --follow-tags

const fs = require('fs');
const path = require('path');
const execa = require('execa');

async function genNewRelease() {
  const nextVersion = require('../lerna.json').version;
  const { stdout } = await execa(require.resolve('lerna-changelog/bin/cli'), ['--next-version', nextVersion]);
  return stdout;
}

const gen = (module.exports = async () => {
  const newRelease = await genNewRelease();
  if (!newRelease) {
    return;
  }
  const changelogPath = path.resolve(__dirname, '../CHANGELOG.md');

  const newChangelog = newRelease + '\n\n\n' + fs.readFileSync(changelogPath, { encoding: 'utf8' });
  fs.writeFileSync(changelogPath, newChangelog);

  delete process.env.PREFIX;
});

if (require.main === module) {
  gen().catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
  });
}
