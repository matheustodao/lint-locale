import { _dirname, args } from '../config/process.js';
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter.js';
import { readAndWriteDirOrFile } from '../utils/readAndWriteDirOrFile.js';

function capitalizeFirstLetterObj(objAsJson) {
  const immutableObj = objAsJson;
  const parseObj = {};

  Object.entries(immutableObj).map(([key, value]) => {
    const parseValue = {
      current: null
    };

    if ((typeof value === 'string' && !Array.isArray(value))) {
      Object.assign(parseValue, {
        current: capitalizeFirstLetter(value)
      })
    }

    if (typeof value === 'object') {
      Object.assign(parseValue, {
        current: capitalizeFirstLetterObj(value)
      })
    }

    if (Array.isArray(value)) {
      const array = []

      value.map((item) => {
        if (typeof item === 'object') {
          array.push(capitalizeFirstLetterObj(item))
        }

        if (typeof item === 'string') {
          array.push(capitalizeFirstLetter(item))
        }
      })

      Object.assign(parseValue, {
        current: array
      })
    }

    Object.assign(parseObj, {
      [key]: parseValue.current
    })
  })

  return parseObj;
}

function capitalizeSentences(argPath) {
  readAndWriteDirOrFile({
    argPath,
    callback: capitalizeFirstLetterObj,
  })
}

capitalizeSentences(args[0])
