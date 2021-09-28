export default function (subjectCode) {
  const colors = [
    // Lighten 4
    '#FFCDD2', '#F8BBD0', '#E1BEE7', '#D1C4E9', '#C5CAE9', '#BBDEFB',
    '#B3E5FC', '#B2EBF2', '#B2DFDB', '#C8E6C9', '#DCEDC8', '#F0F4C3',
    '#FFF9C4', '#FFECB3', '#FFE0B2', '#FFCCBC', '#D7CCC8', '#CFD8DC',
  ];

  let hash = 0;
  if (subjectCode.length === 0) {
    return colors[hash];
  }

  for (let i = 0; i < subjectCode.length; i += 1) {
    // eslint-disable-next-line no-bitwise
    hash = subjectCode.charCodeAt(i) + ((hash << 5) - hash);
    // eslint-disable-next-line no-bitwise
    hash &= hash;
  }

  hash = ((hash % colors.length) + colors.length) % colors.length;

  return colors[hash];
}
