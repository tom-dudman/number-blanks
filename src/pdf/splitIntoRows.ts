const ROW_LENGTH = 3;

const splitIntoRows = <T>(problems: T[]) =>
  problems.reduce<T[][]>((acc, problem, index) => {
    if (!(index % (ROW_LENGTH - 1))) return [...acc, [problem]];
    const [last, ...rest] = acc.reverse();
    return [...rest, [...last, problem]];
  }, []);

export default splitIntoRows;
