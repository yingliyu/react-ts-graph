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
