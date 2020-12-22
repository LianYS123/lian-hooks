/// <reference types="react" />
interface IConfig {
    onDragStart?: (data: any, e: React.DragEvent) => void;
    onDragEnd?: (data: any, e: React.DragEvent) => void;
}
export declare const useDrag: (config?: IConfig) => (data: any) => {
    draggable: "true";
    key: string;
    onDragStart: (ev: React.DragEvent) => void;
    onDragEnd: (ev: React.DragEvent) => void;
};
export interface DropProps {
    onDragOver: React.DragEventHandler;
    onDragEnter: React.DragEventHandler;
    onDragLeave: React.DragEventHandler;
    onDrop: React.DragEventHandler;
}
export declare const useDrop: (options: {
    onDrop(data: any, ev: React.DragEvent): void;
}) => [DropProps, {
    isHovering: boolean;
}];
export {};
