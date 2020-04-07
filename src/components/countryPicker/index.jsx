import React, { useState, useEffect } from 'react'
import { FormControl, Select, MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { fetchCountries } from '../../api'

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        margin: 60
    },
    formControl: {
        width: 300
    }
})

export default ({ handleChange }) => {
    const classes = useStyles()
    const [countries, setCountries] = useState([])

    useEffect(() => {
        getCountries()
    }, [])

    const getCountries = async () => {
        const res = await fetchCountries()
        setCountries(res)
    }

    if (!countries) { return null }

    const change = e => handleChange(e.target.value)

    return (
        <div className={classes.root}>
            {countries.length ?
                <FormControl className={classes.formControl}>
                    <Select
                        defaultValue=""
                        onChange={change}
                    >
                        <MenuItem value="">Global</MenuItem>
                        {countries.map(({ name }) => <MenuItem key={name} value={name}>{name}</MenuItem>)}
                    </Select>
                </FormControl> : null
            }
        </div >
    )
}