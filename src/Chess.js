import { useRef, useEffect } from "react";

import { ChessConsole } from "chess-console/src/chess-console/ChessConsole";
import { LocalPlayer } from "chess-console/src/chess-console/players/LocalPlayer.js";
import { Board } from "chess-console/src/chess-console/components/Board/Board.js";
import { GameStateOutput } from "chess-console/src/chess-console/components/GameStateOutput.js";
import { History } from "chess-console/src/chess-console/components/History.js";
import { CapturedPieces } from "chess-console/src/chess-console/components/CapturedPieces.js";
import { HistoryControl } from "chess-console/src/chess-console/components/HistoryControl.js";
import { GameControl } from "chess-console/src/chess-console/components/GameControl/GameControl.js";
import { Persistence } from "chess-console/src/chess-console/components/Persistence.js";
import { Sound } from "chess-console/src/chess-console/components/Sound.js";

const Chess = () => {
    const ref = useRef();

    useEffect(() => {
        new ChessConsole(
            ref.current,
            { name: "Local Player 1", type: LocalPlayer },
            { name: "Local Player 2", type: LocalPlayer },
            {
                figuresSpriteFile: "assets/images/chessboard-sprite-staunty.svg",
            }
        ).initialization.then((chessConsole) => {
            new Board(chessConsole).initialization.then(() => {
                new Persistence(chessConsole, {
                    savePrefix: "Local",
                }).load();
            });
            new GameStateOutput(chessConsole);
            new History(chessConsole, {
                notationType: "figures",
            });
            new HistoryControl(chessConsole);
            new CapturedPieces(chessConsole);
            new GameControl(chessConsole);
            new Sound(chessConsole, {
                soundSpriteFile: "assets/sounds/chess_console_sounds.mp3",
            });
        });
    }, []);

    return (
        <div
            ref={ref}
            style={{
                width: "800px",
                height: "800px",
            }}
        >
            Chess
        </div>
    );
};

export default Chess;
