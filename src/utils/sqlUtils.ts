import { CardUpdateData } from "../repositories/cardRepository";

export function mapObjectToUpdateQuery(object:any, offset = 1 ) {
  const objectColumns = Object.keys(object)
    .map((key, index) => `"${key}"=$${index + offset}`)
    .join(",");
  const objectValues = Object.values(object);

  return { objectColumns, objectValues };
}
