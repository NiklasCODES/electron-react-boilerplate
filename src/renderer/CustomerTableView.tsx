import React, { useState, useRef } from "react";
import CustomerTable from "./CustomerTable";
import EditCustomerTableModal from "./EditCustomerModal";
import DeleteCustomerTableModal from "./DeleteCustomerModal";
import CreateCustomerTableModal from "./CreateCustomerModal";
import AddNoteModal from "./AddNoteModal";
import AddPurchaseModal from "./AddPurchaseModal";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';


export default function CustomerTableView(props: any) {

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [addNoteModalVisible, setAddNoteModalVisible] = useState(false);
    const [addPurchaseModalVisible, setAddPurchaseModalVisible] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState("NULL");
    const [forceRender, setForceRender] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [shouldSearch, setShouldSearch] = useState(false);
    //const [selectedCustomerName, setSelectedCustomerName] = useState("");
    console.log("selected customer name", selectedCustomer);
    return (
        <div style={styles.tableView}>
            <div style={{ height: 400 }}></div>
            <div>
                <Button onClick={() => setCreateModalVisible(true)}>Neuen Kunden anlegen</Button>
                <TextField variant="outlined" label="Suchen" onChange={event=> {
                    setShouldSearch(true);
                    setSearchText(event.target.value)}
                }/>
            </div>
            <CustomerTable 
                setEditModalVisible={setEditModalVisible}
                shouldSearch={shouldSearch} 
                nameToSearch={searchText} 
                setDeleteModalVisible={setDeleteModalVisible} 
                forceRender={forceRender}
                setSelectedCustomer={setSelectedCustomer}
                setAddNoteModalVisible={setAddNoteModalVisible}
                setAddPurchaseModalVisible={setAddPurchaseModalVisible}
                setForceRender={setForceRender}
            />
            <EditCustomerTableModal
                visible={editModalVisible}
                setVisible={setEditModalVisible}
                forceRender={forceRender}
                setForceRender={setForceRender}
                selectedCustomer={selectedCustomer}
            />
            <DeleteCustomerTableModal
                visible={deleteModalVisible}
                setVisible={setDeleteModalVisible}
                forceRender={forceRender}
                setForceRender={setForceRender}
                selectedCustomer={selectedCustomer}
                setSelectedCustomer={setSelectedCustomer}
            />
            <CreateCustomerTableModal
                visible={createModalVisible}
                setVisible={setCreateModalVisible}
                forceRender={forceRender}
                setForceRender={setForceRender}
                selectedCustomer={selectedCustomer}
            />
            <AddNoteModal
                visible={addNoteModalVisible}
                setVisible={setAddNoteModalVisible}
                selectedCustomer={selectedCustomer}
                forceRender={forceRender}
                setForceRender={setForceRender}
            />
            <AddPurchaseModal
                visible={addPurchaseModalVisible}
                setVisible={setAddPurchaseModalVisible}
                selectedCustomer={selectedCustomer}
                forceRender={forceRender}
                setForceRender={setForceRender}
            />
        </div>
    );
}

const styles = {
    tableView: {
        width: "100%",
        display: "flex",
        flexDirection: "column" as "column",
        alignItems: "center",
        justifyCenter: "center"
    }
}