import { CardUpdateData } from "../repositories/cardRepository";

export function mapObjectToUpdateQuery(object:{object: CardUpdateData, offset:number}) {
  const objectColumns = Object.keys(object.object)
    .map((key, index) => `"${key}"=$${index + object.offset}`)
    .join(",");
  const objectValues = Object.values(object.object);
  return { objectColumns, objectValues };
}
