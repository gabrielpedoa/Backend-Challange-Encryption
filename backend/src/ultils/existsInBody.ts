export default (value: string | number, type: number | string) => {
  if (!value) throw new Error(`O(a) ${type} é necessário(a)`);
};
