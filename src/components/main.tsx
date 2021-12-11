import React, {ChangeEvent, FormEvent, useState} from 'react';

type RoomSize = {
    'W': number;
    'D': number;
}

export type Position = {
    'X': number;
    'Y': number;
}

type Error = {
    command: string;
    orientation: string;
}


const Main = () => {
    const [size, setSize] = useState<RoomSize>({W: 5, D: 5});
    const [initPosition, setInitPosition] = useState<Position>({X: 0, Y: 0});
    const [orientation, setOrientation] = useState<string>('');
    const [command, setCommand] = useState<string>('');
    const [error, setError] = useState<Error>({command: '', orientation: ''});

    const setWidth = (e: ChangeEvent<HTMLInputElement>) => {
        setSize({...size, W: Number(e.target.value)})
    };

    const setDepth = (e: ChangeEvent<HTMLInputElement>) => {
        setSize({...size, D: Number(e.target.value)})
    };

    const setInitalPositionX = (e: ChangeEvent<HTMLInputElement>) => {
        setInitPosition({...initPosition, X: Number(e.target.value)});
    };
    const setInitalPositionY = (e: ChangeEvent<HTMLInputElement>) => {
        setInitPosition({...initPosition, Y: Number(e.target.value)});
    };

    const setOrientationValue = (e: ChangeEvent<HTMLInputElement>) => {
        setOrientation(e.target.value);
    }
    const setCommandValue = (e: ChangeEvent<HTMLInputElement>) => {
        setCommand(e.target.value);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const curError: Error = {command: '', orientation: ''};
        if (!command.match(/^[LRF]+$/)) {
            curError.command = 'wrong command characters';
        }
        if (!orientation.match(/^[NESW]$/)) {
            curError.orientation = 'wrong orientation characters';
        }
        setError(curError);
    }

    return <form onSubmit={handleSubmit}>
        <div>
            <label className="main-field">Room size:</label>
            <label htmlFor="width">room width:</label><input name="width" type="number" value={size.W} onChange={setWidth} />
            <label htmlFor="depth">room depth:</label><input name="depth" type="number" value={size.D} onChange={setDepth} />
        </div>
        <div>
            <label className="main-field">Initial position:</label>
            <label htmlFor="positionX">Position X:</label><input name="positionX" type="number" value={initPosition.X} onChange={setInitalPositionX}/>
            <label htmlFor="positionY">Position Y:</label><input name="positionY" type="number" value={initPosition.Y} onChange={setInitalPositionY}/>
        </div>
        <div>
            <label className="main-field" htmlFor="orientation">Initial orientation:</label>
            <input name="orientation" type="text" value={orientation} onChange={setOrientationValue} />
            {error?.orientation && <span>{error.orientation}</span>}
        </div>
        <div>
            <label className="main-field" htmlFor="command">Command:</label>
            <input name="command" type="text" value={command} onChange={setCommandValue}/>
            {error?.command && <span>{error.command}</span>}
        </div>
        <button type="submit">Submit</button>
    </form>
};

export default Main;