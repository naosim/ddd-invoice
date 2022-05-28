// $ deno run --allow-run ./src/createDocJson.ts

async function cmd(values: string[]): Promise<string> {
  const p = Deno.run({
    cmd: values,
    stdout: "piped"
  });
  await p.status();
  return new TextDecoder().decode(await p.output()).trim();
  
}

const pwd = await cmd(["pwd"]);
const domainFiles = (await cmd(["find", "./src/domain", "-name", "*.ts"])).split("\n");
var result = (await Promise.all(domainFiles.map(async (f) => {
  var text = await cmd(["deno", "doc", "--json", f]);
  text = text.split(`file://${pwd}`).join(".")
  const data = {
    filename: f,
    doc: JSON.parse(text)
  }
  // console.log(data)
  return data
})))

console.log(JSON.stringify(result, null, "  "));