import fs from 'node:fs/promises'
import url from 'node:url'
import path from 'node:path'
import cp from 'node:child_process'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const root = path.resolve(__dirname, '..', '..')

function exec (command, framework) {
  const prefix = framework ? `[${framework}]: ` : ''
  const cwd = framework
    ? path.resolve(root, framework)
    : process.cwd()

  return new Promise((resolve, reject) => {
    console.log(`▶️  ${prefix}${command}`);
    const res = cp.exec(command, { cwd }, (err, stdout) => {
      if (err) return reject(err)
      console.log(prefix + stdout);
      return resolve()
    })
  })
}

const hasNCUInstalled = await exec('which ncu').then(() => true, () => false)
if (!hasNCUInstalled) {
  throw new Error(`Missing global dependency "ncu", please install via "npm i -g npm-check-updates"`)
}

const frameworkDirs = await Promise.all((await fs.readdir(root))
  .filter((entry) => !entry.startsWith('.'))
  .map(async (entry) => [entry, (await fs.stat(entry)).isDirectory()])
).then((res) => res
  .filter(([, isDirectory]) => isDirectory)
  .map(([entry]) => entry)
  .filter((entry) => !entry.startsWith('framework-comparison')))

await Promise.all(frameworkDirs.map(async (framework) => {
  console.log(`🪄  Update dependencies for ${framework}`)
  await fs.unlink(path.join(root, framework, 'node_modules'))
    .catch((err) => { /* ignore */ })
  await exec(`rm -fr ./node_modules`, framework)
  await exec(`ncu -u`, framework)
  await exec(`npm i`, framework)
}))
