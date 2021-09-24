import { useContext, useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';
import SiteContext from './../context/index';
interface poropsCheck {
    iditem: number | undefined
    cityname: string | undefined
}
export const DialogDeleteCity = ({ iditem, cityname }: poropsCheck) => {
    const { baseuri, token } = useContext(SiteContext)
    const [open, setOpen] = useState<boolean>(false)
    const [loding, setLoding] = useState<boolean>(false)
    const handleClose = () => {
        setOpen(false)
    }
    const deleteRest = async () => {
        try {
            const res = await axios.delete(`${baseuri}Cities/${iditem}`, {
                headers: {
                    "content-type": "application/json; charset=utf-8 ",
                    Authorization: token
                },
            })

            const dataDeltet = await res.data
            console.log(dataDeltet);
            setLoding(false)
        } catch (error) {
            console.log(error);
            setLoding(false)
        }

    }
    const handleyes = () => {
        setLoding(true)
        deleteRest()
    }
    useEffect(() => {
        if (iditem) {
            setOpen(true)
        }
        return () => {

        }
    }, [iditem])
    return (
        <Dialog
            open={open}
            // onClose={handleClose}
        >
            <DialogTitle>حذف شهر انتخاب شده</DialogTitle>
            <DialogContent>
                {`آیا از حذف ${cityname} مطئن هستید؟`}
            </DialogContent>
            <DialogActions>
                <IconButton onClick={handleyes} disabled={loding} color="secondary"  >
                    {loding ? <CircularProgress /> : <CheckIcon />
                    }
                </IconButton>
                <IconButton onClick={handleClose} disabled={loding} color="primary" >
                    <CloseIcon />
                </IconButton>
            </DialogActions>
        </Dialog>
    )
}