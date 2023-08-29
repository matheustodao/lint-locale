const validateEmailOnBegging = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}.*/;
const validateHttpsOnBegging = /^https:\/\/.*/
const validateKebabCaseOnBegging = /^-?[a-z]+(-[a-z]+)*$/

export function capitalizeFirstLetter(sentence) {
  if (typeof sentence !== 'string') {
    return sentence;
  }

  const sentenceParsed = sentence.replace(/(^|[.!?]\s+)([a-z])/g, (match, separator, letter, offset, text) => {
    if (validateEmailOnBegging.test(text)) {
      return match;
    }

    if (validateHttpsOnBegging.test(text)) {
      return match;
    }

    if (validateKebabCaseOnBegging.test(text)) {
      return match;
    }

    if (separator && separator.includes('@')) {
      return match;
    } else {
      return separator + letter.toUpperCase();
    }
  });

  return sentenceParsed
}
