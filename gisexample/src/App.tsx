import React, {useEffect, useState} from "react";
import "./App.css";
import BasicSimpleTreeView from "./components/menu/catalog";
import { createStyles, makeStyles } from "@mui/material/styles"; 
import { Theme, createTheme, ThemeProvider, useTheme} from "@mui/material/styles";
import theme from "../src/components/theme"; 
import Graph from "./components/svgGraphics/Graph";
import CustomAppBar from "./components/menu/CustomAppBar";
import SvgCanvas from "./components/svgGraphics/SvgCanvas"; 
import FileLoader from "./components/menu/menuItems/FileLoader";
import CompleteLine from "./components/menu/menuItems/CompleteLine";
import ArrowWidth from "./components/menu/menuItems/ArrowWidth";
import AnimationSpeed from "./components/menu/menuItems/AnimationSpeed";
import ArrowNumber from "./components/menu/menuItems/ArrowNumber";
import AnimationPlay from "./components/menu/menuItems/AnimationPlay";
import ContourLineWidth from "./components/menu/menuItems/ContourLineWidth";
import ZoomSettings from "./components/menu/menuItems/ZoomSettings";
import { useSelector, useDispatch } from "react-redux";
import { State } from "./components/redux/types"; // Импорт action

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

// TODO ERROR IN GRAPH
// TODO code style
// TODO Update => update
// TODO zoom in last arrow

// TODO define initial values by file
// TODO fix zoom move after open of hiding menu
// TODO add zoom to cursor
// TODO add svg to giff converter & loader

// TODO fix interface
// TODO divide hiding menu interface to style, anim options
// TODO add colorizer
// TODO add second hiding panel
// TODO fix hiding menu icons
// TODO make custom icons
// TODO make sprites
// TODO make light theme
// TODO add slider range changer with file limits

// TODO add points photo digitizer
// TODO add photo loader
// TODO add mobile version using react native
// TODO add user testing

function App() {

    const g = useSelector((state: State) => state.points);

    const [isTree, setIsTree] = useState(true); 
    const theme = useTheme();

    const [zoomReturn, setZoomReturn] = useState<boolean>(false);

    // TODO fix return zoom
    const handleReturnZoom = () => {
        setZoomReturn(true); 
    }

    return (
        <div className="App" >
            <ThemeProvider theme={darkTheme}>
                <CustomAppBar 
                    hideMenuChildren={
                        <div className="scrollbar my-style">
                            <div className="force-overflow">
                                <AnimationSpeed />
                                <ContourLineWidth />
                                <ArrowWidth />
                                <ArrowNumber />
                                <AnimationPlay />
                                <CompleteLine />
                                <ZoomSettings />
                                <FileLoader />
                            </div>
                        </div>
                    }
                >
                    <SvgCanvas >
                        <Graph />
                    </SvgCanvas>
                </CustomAppBar>
            </ThemeProvider>
        </div>
    );
}

export default App;
