import React from 'react'
import { Grid, Card, CardContent, Typography, Backdrop, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import CountUp from 'react-countup'

const useStyles = makeStyles({
    root: {
        margin: '50px 0 !important',
    },
    confirmed: {
        borderBottom: '10px solid rgba(0,0,250,.5)'
    },
    recovered: {
        borderBottom: '10px solid rgba(0,250,0,.5)'
    },
    deaths: {
        borderBottom: '10px solid rgba(250,0,0,.5)'
    },
})

export default ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
    const classes = useStyles()

    if (!confirmed) {
        return (
            <Backdrop className={classes.backdrop} open={!confirmed}>
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    }

    return (
        <Grid container spacing={3} justify="center" className={classes.root}>
            <Grid item>
                <Card className={classes.confirmed}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Infected</Typography>
                        <Typography variant="h6" gutterBottom>
                            <CountUp start={0} end={confirmed.value} duration={2.5} separator="," />
                        </Typography>
                        <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant="body2">Number of active cases of COVID-19</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item>
                <Card className={classes.recovered}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Recovered</Typography>
                        <Typography variant="h6" gutterBottom>
                            <CountUp start={0} end={recovered.value} duration={2.5} separator="," />
                        </Typography>
                        <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant="body2">Number of recoveries COVID-19</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item>
                <Card className={classes.deaths}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Deaths</Typography>
                        <Typography variant="h6" gutterBottom>
                            <CountUp start={0} end={deaths.value} duration={2.5} separator="," />
                        </Typography>
                        <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant="body2">Number of deaths caused by COVID-19</Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}