export type RoomSize = {
    'W': number;
    'D': number;
};

export type Position = {
    'X': number;
    'Y': number;
};

export type Error = {
    command: string;
    orientation: string;
    size: string;
    position: string;
};

export type Orientation = 'N'|'E'|'S'|'W';
export type DirectionToOrientation = {
    [index in string]: Orientation;
};

export type OrientationToOrientation = {
    [key in string]: DirectionToOrientation
};
export type Result = {finalLocation: {X: number, Y: number}, finalOrientation: string};