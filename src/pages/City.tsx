import { useContext, useEffect, useState } from 'react'
import { Grid, Box, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import SiteContext from '../context';
import ColumnTypesGrid from '../componets/GridTabel';
import { useHistory } from 'react-router-dom';
type Cities = {
    title: string
    fProvincesId: number
    latinName: string
    jetId: string
    operatorId: number
    id: number
    provinceTitle: string
}
function City() {
    let history = useHistory();
    const { token, baseuri } = useContext(SiteContext);
    const [datastate, setDatastate] = useState<Cities[]>([])
    const [citiySelect, setCitiySelect] = useState<Cities | null>(null)
    const getData = async () => {
        try {
            const res = await axios.get(`${baseuri}Cities`, {
                headers: {
                    "content-type": "application/json; charset=utf-8 ",
                    Authorization: token
                }
            })
            const datafetch = res.data.data
            setDatastate(datafetch);
        } catch (error) {

        }
    }

    useEffect(() => {
        if (token) {
            getData()
        } else{
            history.push('/login')
        }
        
        return () => {

        }
    }, [])
    const handleongange = (event: any, newValue: Cities | null): void => setCitiySelect(newValue);

    return (
        <Grid container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <Grid item xs={6}>
                <Autocomplete
                    id='serch_state'
                    value={citiySelect}
                    onChange={handleongange}
                    options={datastate}
                    autoHighlight
                    getOptionLabel={(option: any) => option.provinceTitle}
                    renderOption={(props, option: any) => (
                        <Box component="li" {...props} key={option.id} >
                            {option.provinceTitle} {option.provinceCountryTitle}
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="select City"
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            }}
                        />
                    )}
                />
            </Grid>

            <ColumnTypesGrid />

        </Grid>
    )
}

City.propTypes = {

}

export default City

