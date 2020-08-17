export type INode = d3.SimulationNodeDatum & {
    id: string;
    name: string;
    type: string;
    level: number;
};

export type ILink = d3.SimulationLinkDatum<INode> & {
    label?: string;
    relType: string;
};

export interface LiteratureType {
    name: string;
    value: number;
}

export interface ICommonProps {
    name: string;
    value: number;
}

export interface IExampleData {
    entityId: string;
    entityName: string;
    entityType: string;
    orgId: string;
    orgName: string;
}

export interface IGraphProps {
    title?: string;
    entities: INode[];
    relations: ILink[];
    expertId: string;
    svgWidth: number;
    svgHeight: number;
}
