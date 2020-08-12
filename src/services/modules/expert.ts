import { AppPost } from '../../utils/request';

interface expertGraphParams {
  entityId: string;
  entityName: string;
}
export function getExpertGraph(params: expertGraphParams) {
  return AppPost('/aikg/data-service/expert/relation-graph/v1', params);
}
