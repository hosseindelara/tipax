import { Grid } from '@mui/material'
import { Link } from 'react-router-dom'

export const Index: React.FC<{}> = () => {
    return (
        <Grid container >
            <Grid item xs={12} >
                <Link to='/login'>ورود به پنل</Link>
            </Grid>
        </Grid>
    )
}