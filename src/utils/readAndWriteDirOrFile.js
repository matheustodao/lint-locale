import fs from 'node:fs';
import path from 'node:path'
import { getFileTye } from '../config/fileType.js';
import { _dirname } from '../config/process.js';

export function readAndWriteDirOrFile({
  callback,
  argPath,
}) {
  const fullPath = path.join(_dirname, argPath);
  const stats = fs.statSync(fullPath);

  function isJsonFile(filename) {
    const fileType = getFileTye(filename)

    if (fileType !== '.json') return;
  }

  if (stats.isFile()) {
    const fileType = getFileTye(fullPath);

    isJsonFile(fileType);

    const fileContent = fs.readFileSync(fullPath, {
      encoding: 'utf-8'
    });

    if (!callback) {
      return new SyntaxError('There must be a callback within the object data as a return');
    };

    const parseContent = callback(JSON.parse(fileContent));

    if (typeof parseContent !== 'object' || !parseContent) {
      return new SyntaxError('The return value must be an object');
    }

    const indentFileContent = JSON.stringify(parseContent, null, 2)

    fs.writeFileSync(fullPath, indentFileContent, {
      encoding: 'utf-8'
    })
  }

  if (stats.isDirectory()) {
    const files = fs.readdirSync(fullPath);

    files.forEach((currentFilename) => readDirOrFile(`${argPath}/${currentFilename}`))
  }
}
