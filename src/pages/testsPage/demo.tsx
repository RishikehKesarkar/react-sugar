import adminLayout from "../../masterLayout/adminLayout";
import CustomTable from "../../common/CustomTable";
import { useState } from "react";
import Control from "../../components";
import { IHeadCell } from "../../interface/tableHead/IHeadCell";

export interface Data {
    calories: number;
    carbs: number;
    fat: number;
    name: string;
    protein: number;
}

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
): Data {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
    };
}

const rows: any = [
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Donut', 452, 25.0, 51, 4.9),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Honeycomb', 408, 3.2, 87, 6.5),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Jelly Bean', 375, 0.0, 94, 0.0),
    createData('KitKat', 518, 26.0, 65, 7.0),
    createData('Lollipop', 392, 0.2, 98, 0.0),
    createData('Marshmallow', 318, 0, 81, 2.0),
    createData('Nougat', 360, 19.0, 9, 37.0),
    createData('Oreo', 437, 18.0, 63, 4.0),
];


const headCells: IHeadCell[] = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Dessert (100g serving)',
        filter: true
    },
    {
        id: 'calories',
        numeric: true,
        disablePadding: false,
        label: 'Calories',
    },
    {
        id: 'fat',
        numeric: true,
        disablePadding: false,
        label: 'Fat (g)',
        filter: true
    },
    {
        id: 'carbs',
        numeric: true,
        disablePadding: false,
        label: 'Carbs (g)',
    },
    {
        id: 'protein',
        numeric: true,
        disablePadding: false,
        label: 'Protein (g)',
    },
];

const Demo = () => {
    const [filterText, setFilterText] = useState("")
    return (
        <Control.Paper>
            <Control.GridContainer>
                <Control.GridItem>
                    <Control.Input onChange={(e: any) => { setFilterText(e.target.value) }} />
                </Control.GridItem>
                <CustomTable tableName="Demo" rows={rows} headCells={headCells} checkboxRequire={false} filterText={filterText} actions={true} />
            </Control.GridContainer>
        </Control.Paper>
    )
}

export default adminLayout(Demo);