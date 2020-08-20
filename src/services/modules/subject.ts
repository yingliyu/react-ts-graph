import { AppPost } from '../../utils/request';
// 学科词关系图谱
interface subjectGraphParams {
    entityId: string;
    entityName: string;
}
export function getSubjectGraph(params: subjectGraphParams) {
    return AppPost('/aikg/data-service/subject/relation-graph/v1', params);
}
