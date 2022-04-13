import { AnyParamConstructor, BeAnObject, ReturnModelType } from '@typegoose/typegoose/lib/types';

const paginate = <T extends AnyParamConstructor<any>>(
  Model: ReturnModelType<T, BeAnObject>,
  sort: [string, number],
  cursor?: string,
) => {
  const sortField: string = sort[0];
  const sortOperator = sort[1] === 1 ? '$gt' : '$lt';

  const filterQuery = cursor ? { [sortField]: { [sortOperator]: cursor } } : {};

  const getNextCursor = async (items: any[]): Promise<string | null> => {
    if (items.length === 0) return null;

    const lastDoc = await Model.findOne()
      .sort({ $natural: -1 * sort[1] })
      .lean();

    const lastItem = items[items.length - 1];

    let cursor = null;

    if (sortOperator === '$gt') {
      cursor = lastItem[sortField] < lastDoc[sortField] ? lastItem[sortField] : null;
    } else {
      cursor = lastItem[sortField] > lastDoc[sortField] ? lastItem[sortField] : null;
    }

    return cursor;
  };

  return { filterQuery, sort, getNextCursor };
};

export default paginate;
