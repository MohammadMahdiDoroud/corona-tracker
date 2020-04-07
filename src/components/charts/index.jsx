import React, { useState, useEffect } from 'react'
import { Line, Bar } from 'react-chartjs-2'
import { makeStyles } from '@material-ui/core/styles'

import { fetchDailyData } from '../../api'

const useStyles = makeStyles({
    root: {
        width: '75%',
        margin: 'auto'
    }
})

export default ({ data: { confirmed, deaths, recovered }, country }) => {
    const classes = useStyles()

    const [dailyData, setDailyData] = useState([])

    useEffect(() => {
        getDailyData()
    }, [])

    const getDailyData = async () => {
        setDailyData(await fetchDailyData())
    }

    const lineChart = (
        dailyData.length ? (<Line
            data={{
                labels: dailyData.map(({ date }) => date),
                datasets: [{
                    data: dailyData.map(({ confirmed }) => confirmed),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true
                }, {
                    data: dailyData.map(({ deaths }) => deaths),
                    label: 'Deaths',
                    borderColor: 'red',
                    backgroundColor: 'rgba(250,0,0,.5)',
                    fill: true
                }]
            }}
        />) : null
    )

    const barChart = (
        confirmed
            ? (
                <Bar
                    data={{
                        labels: ['Infected', 'Recovered', 'Deaths'],
                        datasets: [{
                            label: 'People',
                            backgroundColor: ['rgba(0,0,250,.5)', 'rgba(0,250,0.5)', 'rgba(250,0,0,.5)'],
                            data: [confirmed.value, recovered.value, deaths.value]
                        }]
                    }}
                    options={{
                        legend: { display: false },
                        title: { display: true, text: `Current state in ${country}` }
                    }}
                />
            ) : null
    )

    return (
        <div className={classes.root}>
            {country ? barChart : lineChart}
        </div>
    )
}