function commandBuilder({ dotCommand = 'dot', suppressWarnings = true, format = 'svg' } = {}) {
  const args = [
    ...(function* () {
      if (suppressWarnings) yield '-q';
      yield `-T${format}`;
    })(),
  ];
  return [dotCommand, args];
}

/**
 * Execute the Graphviz dot command and make a Stream of the results.
 */
export async function toStream(dot, options) {
  const [command, args] = commandBuilder(options);
  const cp = new Deno.Command(command, {
    args: args,
    stdin: 'piped',
    stdout: 'piped',
  }).spawn();
  const stdin = cp.stdin.getWriter();
  await stdin.write(new TextEncoder().encode(dot));
  await stdin.close();
  return cp.stdout;
}

function open(path) {
  try {
    return Deno.open(path, { write: true });
  } catch (e) {
    if (e instanceof Deno.errors.NotFound) {
      return Deno.open(path, { createNew: true, write: true });
    }
    throw e;
  }
}

/**
 * Execute the Graphviz dot command and output the results to a file.
 */
export async function toFile(dot, path, options) {
  const output = await open(path);
  const stream = await toStream(dot, options);
  await stream.pipeTo(output.writable);
}
