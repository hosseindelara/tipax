import { useContext, useState, useEffect } from 'react';
import { Grid, Box, TextField, Button, CircularProgress } from '@mui/material';
import { toast } from "react-toastify";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import SiteContext from '../context';

type DataForm = { UserName: string, Password: string }
function Login() {
    const { handleToken, baseuri, token } = useContext(SiteContext);
    const [dataForm, setDataForm] = useState<DataForm>({ UserName: '', Password: '' })
    const [loding, setLoding] = useState(false)
    let history = useHistory();
    const handelsubmit = async () => {
        let data = {
            grant_type: "password",
            username: dataForm.UserName,
            password: dataForm.Password,
            refreshToken: "",
            scope: "",
            clientId: "",
            clientSecret: ""
        }
        try {
            const res = await axios.post(`${baseuri}Users/Token`, JSON.stringify(data), {
                headers: {
                    "content-type": "application/json; charset=utf-8 "
                }
            })
            const dataFeching = await res.data.data
            console.log(dataFeching);
            setLoding(false)
            handleToken(`${dataFeching.token_type} ${dataFeching.access_token}`, dataFeching.expires_in)
            toast.success('Welcome to the citys panel')
            history.push('/city')

        } catch (error) {
            console.log(error);
            setLoding(false)

        }


    }
    const handleLogin = () => {
        setLoding(true)
        if (!dataForm.UserName) {
            toast.error('Please enter a username');
            setLoding(false)
        }
        else if (!dataForm.Password) {
            toast.error('Please enter a Password');
            setLoding(false)
        }
        else {
            handelsubmit()
        }
    }
    const handleonChangeUserName = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setDataForm(prev => ({ ...prev, UserName: e.target.value }))
    }
    const handleonChangePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setDataForm(prev => ({ ...prev, Password: e.target.value }))
    }
    useEffect(() => {
        if (token) {
            history.push('/city')
        }
        return () => {

        }
    }, [])
    return (
        <Grid container
            direction="row"
            justifyContent="center"
            alignItems="center" >

            <Grid item xs={4}
            >
                <Grid container
                    justifyContent="center"
                    alignItems="center"
                    style={{ marginTop: '20%' }}
                >
                    <Box>
                        <Grid item xs={12} >
                            <TextField autoFocus label="User Name" value={dataForm.UserName} name='UserName' onChange={handleonChangeUserName} variant="outlined" />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField label="Password" name='Password' value={dataForm.Password} onChange={handleonChangePassword} variant="outlined" />
                        </Grid>
                        <Grid item xs={12} >
                            <Button onClick={handleLogin} disabled={loding} variant="outlined">{loding ? <CircularProgress /> : 'login'}</Button>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>

        </Grid>
    )
}

Login.propTypes = {

}

export default Login

