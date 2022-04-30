import { AnyParamConstructor, BeAnObject, ReturnModelType } from '@typegoose/typegoose/lib/types';

const paginate = <T extends AnyParamConstructor<any>>(
  Model: ReturnModelType<T, BeAnObject>,
  sort: [string, number],
  cursor?: string,
  query: Record<string, any> = {},
) => {
  const sortField: string = sort[0];
  const sortOperator = sort[1] === 1 ? '$gt' : '$lt';

  const filterQuery = cursor ? { [sortField]: { [sortOperator]: cursor }, ...query } : query;

  const getNextCursor = async (
    items: any[],
  ): Promise<{ cursor: string | null; hasMore: boolean }> => {
    if (items.length === 0) return { cursor: null, hasMore: false };

    const lastDoc = await Model.findOne(query)
      .sort({ $natural: -1 * sort[1] })
      .lean();

    const lastItem = items[items.length - 1];

    let cursor = null;

    if (sortOperator === '$gt') {
      cursor = lastItem[sortField] < lastDoc[sortField] ? lastItem[sortField] : null;
    } else {
      cursor = lastItem[sortField] > lastDoc[sortField] ? lastItem[sortField] : null;
    }

    return {
      cursor,
      hasMore: JSON.stringify(lastDoc[sortField]) !== JSON.stringify(lastItem[sortField]),
    };
  };

  return { filterQuery, sort, getNextCursor };
};

export default paginate;
