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

export interface IGraphComponentProps {
    entities: INode[];
    relations: ILink[];
    expertId: string;
    subjectId: string;
    entityTotal: number;
    relationTotal: number;
    allNodeTypes: {
        [propName: string]: string;
    };

    nodeAttribute: {
        color: string[];
        radius: number[];
        fontSize: number[];
    };
    title?: string;
    svgWidth?: number;
    svgHeight?: number;
}
