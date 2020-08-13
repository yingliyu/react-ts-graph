import { AppGet } from '../../utils/request';

// 获取示例接口
interface exampleType {
    page: number;
}
export function getExamples(params: exampleType) {
    return AppGet('/aikg/data-service/search/getExamples', params);
}

// 获取联想词接口
interface suggestType {
    word: string;
}
export function getSuggestWords(params: suggestType) {
    return AppGet('/aikg/data-service/search/suggest', params);
}
