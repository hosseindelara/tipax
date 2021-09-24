import { useContext, useState, useEffect } from 'react'
import { Modal, Grid, TextField, IconButton, CircularProgress } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';
import SiteContext from './../context/index';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 1,
    pb: 2,
};
type PropsCheck = {
    itemEdit: any | undefined
    openModal: boolean
}
type FromType = { title: string, latinName: string, provinceTitle: string, provinceCountryTitle: string }
export const ModalCreateAndUpdateCity = ({ itemEdit, openModal }: PropsCheck) => {
    const { token, baseuri } = useContext(SiteContext);
    const [open, setOpen] = useState<boolean>(false)
    const [loding, setLoding] = useState<boolean>(false)
    const [dataForm, setDataForm] = useState<FromType>({ title: '', latinName: '', provinceTitle: '', provinceCountryTitle: '', })
    const handleonChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        setDataForm(prev => ({ ...prev, [name]: e.target.value }))
    }
    const handleClose = () => setOpen(false)
    const saveData = async () => {
        try {
            if (itemEdit) {
                axios.put(`${baseuri}Cities`, JSON.stringify(dataForm), {
                    headers: {
                        "content-type": "application/json; charset=utf-8 ",
                        Authorization: token
                    }
                })
            }
            else {
                axios.post(`${baseuri}Cities`, JSON.stringify(dataForm), {
                    headers: {
                        "content-type": "application/json; charset=utf-8 ",
                        Authorization: token
                    }
                })
            }
            setOpen(false)
            setLoding(false)
        } catch (error) {
            console.log(error);
            setLoding(false)
        }
    }
    const handleSave = () => {
        setLoding(true)
        saveData()
    }
    useEffect(() => {
        if (itemEdit) {
            setDataForm(itemEdit)
        }
        setOpen(openModal)
        return () => {

        }
    }, [itemEdit, openModal])
    return (
        <Modal open={open} >
            <Grid container sx={{ ...style }}
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs={3} >
                    <TextField label='نام شهر' name='title' value={dataForm.title} />

                </Grid>
                <Grid item xs={3}>
                    <TextField label='نام شهر( انگلیسی)' name='latinName' value={dataForm.latinName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleonChange(e, 'latinName')} />
                </Grid>
                <Grid item xs={3}>
                    <TextField label='نام استان' name='provinceTitle' value={dataForm.provinceTitle} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleonChange(e, 'provinceTitle')} />
                </Grid>
                <Grid item xs={3}>
                    <TextField label='نام کشور' name='provinceCountryTitle' value={dataForm.provinceCountryTitle} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleonChange(e, 'provinceCountryTitle')} />
                </Grid>
                <Grid item xs={12} >
                    <IconButton onClick={handleSave} disabled={loding} color="success"  >
                        {loding ? <CircularProgress /> : <SaveIcon />
                        }
                    </IconButton>
                    <IconButton onClick={handleClose} disabled={loding} color="primary" >
                        <CloseIcon />
                    </IconButton>
                </Grid>
            </Grid>

        </Modal>
    )
}