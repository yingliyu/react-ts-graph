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
    title?: string;
    entities: INode[];
    relations: ILink[];
    expertId: string;
    svgWidth?: number;
    svgHeight?: number;
    entityTotal: number;
    relationTotal: number;
}
