const extender = (...classes: any[]) => {
  return classes.reduce(
    (accumulatorClass, currentClass) => currentClass(accumulatorClass),
    class Accumulator {},
  );
};

export default extender;
