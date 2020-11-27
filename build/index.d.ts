interface Area {
    id?: any;
    x?: number;
    top?: number;
    y?: number;
    left?: number;
    right?: number;
    bottom?: number;
    width: number;
    height: number;
    center?: [number, number];
}
interface OptimizeArea {
    id?: number;
    top: number;
    left: number;
    right: number;
    bottom: number;
    width: number;
    height: number;
    center: [number, number];
}
interface RestrictPosition {
    top: number;
    left: number;
    x: number;
    y: number;
    id: any;
}
export declare class RectRestrict {
    static optimizeRect(area: Partial<Area>): OptimizeArea;
    areas: OptimizeArea[];
    constructor({ areas }?: {
        areas?: Area[];
    });
    setAreas(areas: Area[]): void;
    check(target: Area): RestrictPosition | null;
    getPosInArea(target: Area): OptimizeArea | null;
}
export {};
