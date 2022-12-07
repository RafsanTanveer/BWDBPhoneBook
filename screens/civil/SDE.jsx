import * as React from "react";
import { DATA_SDE_CIVIL } from '../../data/DATA'
import DataRender from "../../data/DataRender";



const SDE = ({ navigation }) => {
    return (
        <DataRender DATA={DATA_SDE_CIVIL} />
    )
}

export default SDE



