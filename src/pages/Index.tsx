import { Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import style from './Index.module.css'
export const Index: React.FC<{}> = () => {
    return (
        <Grid container direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <Grid item xs={4} className={style.card}   >
                <Link to='/login' className={style.link} >ورود به پنل</Link>
            </Grid >
        </Grid >
    )
}