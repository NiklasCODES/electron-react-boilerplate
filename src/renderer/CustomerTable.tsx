import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import SimpleAccordion from "./SimpleAccordion";
import ExpandableRow from "./ExpandableTableRow";
import ExpandableTableRow from "./ExpandableTableRow";


interface CustomerTablePropType {
   setEditModalVisible: Dispatch<SetStateAction<boolean>>;
   setDeleteModalVisible: Dispatch<SetStateAction<boolean>>;
   setSelectedCustomer: Dispatch<SetStateAction<string>>;
   setAddNoteModalVisible: Dispatch<SetStateAction<boolean>>;
   setAddPurchaseModalVisible: Dispatch<SetStateAction<boolean>>;
   setForceRender: Dispatch<SetStateAction<number>>;
   forceRender: number;
   shouldSearch: boolean;
   nameToSearch: string;
};

//ipcRenderer.createCustomer("CREATE_CUSTOMER", "hallo");

export default function CustomerTable(props: CustomerTablePropType) {


    const [customers, setCustomers] = useState([]);
    const [showNote, setShowNote] = useState("");
    const { 
        setEditModalVisible, 
        setDeleteModalVisible,
        setSelectedCustomer,
        forceRender,
        shouldSearch,
        nameToSearch,
        setAddNoteModalVisible,
        setAddPurchaseModalVisible,
        setForceRender
    } = props;
    
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios({ method: "get", url: "http://localhost:3000/getAllCustomers" });
            setCustomers(data);
        };

        fetchData();
    }, [forceRender]);

    return (
        <div style={{ width: 800 }}>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Kundenname</TableCell>
                        <TableCell align="left">Tiername</TableCell>
                        <TableCell align="left">Tierart</TableCell>
                        <TableCell align="left">Guthaben(in €)</TableCell>
                        <TableCell align="left">Aktionen</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {!shouldSearch ? (customers == null) ? <div>Loading...</div> : (customers != null) ? customers.map((item: any)=>{
                            return (
                                <>
                                <ExpandableTableRow
                                    item={item}
                                    forceRender={forceRender}
                                    setForceRender={setForceRender}
                                    handleEdit={() => {
                                        setSelectedCustomer(item._id);
                                        setEditModalVisible(true);
                                    }}
                                    handleDelete={() => {
                                            setSelectedCustomer(item._id);
                                            setDeleteModalVisible(true);
                                    }}
                                    setAddNoteModalVisible={setAddNoteModalVisible}
                                    setAddPurchaseModalVisible={setAddPurchaseModalVisible}
                                    setSelectedCustomer={setSelectedCustomer}
                                />
                                </> 
                            );
                    }) : null : customers.map((item: any) => {
                        if(item.customer_name.includes(nameToSearch)) {
                            return (
                                <TableRow key={item.customer_name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align="left">{item.customer_name}</TableCell>
                                    <TableCell align="left">{item.pet_name}</TableCell>
                                    <TableCell align="left">{item.pet_art}</TableCell>
                                    <TableCell align="left">{item.amount}</TableCell>
                                    <TableCell align="left">
                                        <Button onClick={() => {
                                            setSelectedCustomer(item._id);
                                            setEditModalVisible(true);
                                        }}>Bearbeiten</Button>
                                        <Button onClick={() => {
                                            setSelectedCustomer(item._id);
                                            setDeleteModalVisible(true);
                                        }}>Löschen</Button>
                                        <Button>Notitzen</Button>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    })}
                </TableBody> 
        </Table>
      </TableContainer> 
       </div>
    );
}

const styles = {
    table: { 
        color: "black",
        backgroundColor: "white",
        border: "1px solid black",
        borderRadius: 5,
    },
};