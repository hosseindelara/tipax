import { useEffect, useState, useContext } from 'react';
import { DataGrid, GridValueFormatterParams, GridRowId } from '@mui/x-data-grid';
import { IconButton, Grid, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import SiteContext from './../context/index';
import { DialogDeleteCity } from './DialogDeleteCity';
import { ModalCreateAndUpdateCity } from './ModalCreateAndUpdateCity';

const GridTabel = ({ idCity }: any) => {
    const { baseuri, token } = useContext(SiteContext)
    const [DeleteItem, setDeleteItem] = useState<any>({})
    const [editItem, setEditItem] = useState<any>({})
    const [openModal, setOpenModal] = useState(false)
    const [DataTabel, setDataTabel] = useState([
        {
            cityname: 'تهران',
            codeCity: '021',
            id: 1

        },
        {
            cityname: 'کیش',
            codeCity: '021',
            id: 2

        },
        {
            cityname: 'مشهد',
            codeCity: '021',
            id: 3

        }
    ])
    const [tabelconfig, setTabelconfig] = useState<any>({ pageNumber: 1, recordsNumber: 25 })
    const dataFetching = async () => {
        try {
            const res = await axios.get(`${baseuri}Cities/Search`, {
                headers: {
                    "content-type": "application/json; charset=utf-8 ",
                    Authorization: token
                },
                params: {
                    ...tabelconfig
                }
            })
            const datafetch = res.data.data
            console.log(datafetch);
            setDataTabel(datafetch)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (idCity) {
            dataFetching()
        }
        return () => {

        }
    }, [idCity])

    const handelEditRow = (row: any) => {
        setOpenModal(true)
        setEditItem(row)
    }
    const handleDeleteRow = (row: any) => setDeleteItem(row);
    const columns = [
        { field: 'cityname', type: 'string', width: 250, },
        { field: 'codeCity', type: 'string', width: 250, },
        {
            field: 'actions', width: 150, type: 'actions', renderCell: (params: any) => (
                <span>
                    <IconButton
                        onClick={() => handelEditRow(params.row)}
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => handleDeleteRow(params.row)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </span>
            )
        }
    ]
    const handleCreateCity = () => {
        setOpenModal(true)
        setEditItem({})
    }
    return (
        <Grid container >
            <Grid item xs={12} style={{ marginBottom: '10px' }} >
                <Button size="large" color="success" variant="contained" onClick={handleCreateCity} >ایجاد شهر جدید</Button>
            </Grid>
            <Grid item xs={12} style={{ height: 600, width: '100%' }} >
                <DataGrid rows={DataTabel} columns={columns} />
            </Grid>
            {DeleteItem.id ?
                <DialogDeleteCity iditem={DeleteItem.id} cityname={DeleteItem.cityname} />
                : null}
            <ModalCreateAndUpdateCity itemEdit={editItem} openModal={openModal} />
        </Grid>
    )
}
export default GridTabel