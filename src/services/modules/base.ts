import { AppGet } from '../../utils/request';

type exampleType = {
  page: number;
};
export function getExamples(params: exampleType) {
  return AppGet('/aikg/data-service/search/getExamples?page=1', params);
}
