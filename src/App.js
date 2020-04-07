import React, { useState, useEffect } from 'react'
import { fetchData } from './api'

import Cards from './components/cards'
import CountryPicker from './components/countryPicker'
import Charts from './components/charts'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    imageContainer: {
        textAlign: 'center'
    },
    image: {
        width: 270,
        margin: '50px auto 0'
    }
})

export default props => {
    const classes = useStyles()

    const [data, setData] = useState({})
    const [country, setCountry] = useState('')

    useEffect(() => {
        getData()
    }, [])


    const getData = async country => {
        const res = await fetchData(country)
        setData(res)
    }

    const handleChange = country => {
        getData(country)
        setCountry(country)
    }

    return (
        <>
            <div className={classes.imageContainer}>
                <img className={classes.image} src={'https://i.ibb.co/7QpKsCX/image.png'} />
            </div>
            <Cards data={data} />
            <CountryPicker handleChange={handleChange} />
            <Charts country={country} data={data} />
        </>
    )
}