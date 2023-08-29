export const getFileTye = (filename) => (
  filename
    .split('.')
    .filter(Boolean) // removes empty extensions (e.g. `filename...txt`)
    .slice(1)
    .join('.')
)
