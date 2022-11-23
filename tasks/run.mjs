import { spawn } from 'child_process'

/**
 * Spawns Node.js child process for npm script
 * rather than using Gulp
 *
 * @param {string} name - npm script name
 * @param {string[]} [args] - npm script arguments
 * @returns {Promise<number>} Exit code
 */
export async function npmScript (name, args = []) {
  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'

  return new Promise((resolve, reject) => {
    const script = spawn(command, ['run', name, '--silent', ...args])

    script.stdout.on('data', (data) => console.log(data.toString()))
    script.stderr.on('data', (data) => console.error(data.toString()))

    // Reject on actual script errors to exit `gulp dev`
    script.on('error', reject)

    // Resolve all exit codes to continue `gulp dev`
    script.on('close', resolve)
  })
}

/**
 * Creates a Gulp task for npmScript()
 *
 * @param {string} name - npm script name
 * @param {string[]} [args] - npm script arguments
 * @returns {() => Promise<number>} Exit code
 */
export function npmScriptTask (name, args = []) {
  const task = () => npmScript(name, args)

  // Add task alias
  // https://gulpjs.com/docs/en/api/task#task-metadata
  task.displayName = `npm run ${name} ${args.join(' ')}`.trim()

  return task
}
