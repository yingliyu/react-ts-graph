import { AppGet } from '../../utils/request';

interface exampleType {
  page: number;
}
export function getExamples(params: exampleType) {
  return AppGet('/aikg/data-service/search/getExamples', params);
}
