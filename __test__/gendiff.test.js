import fs from 'node:fs';
import path from 'node:path';
import genDiff from '../src';

const getPath = (fileName) => path.resolve(process.cwd(), `./__fixtures__/${fileName}`);
// const readFile = (fileName) => fs.readFileSync(getPath(fileName), 'utf-8');
test('genDiff', () =>{
    expect(genDiff(getPath('file1.json'), getPath('file2.json'))).toBe(
`{
- follow: false
  host: hexlet.io
- proxy: 123.234.53.22
- timeout: 50
+ timeout: 20
+ verbose: true
}`);
})