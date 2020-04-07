import axios from "axios"

const url = 'https://covid19.mathdro.id/api'

export const fetchData = async country => {
    var changableUrl = url

    if (country) changableUrl = `${url}/countries/${country}`

    if (country === 'global') changableUrl = url

    try {
        const { data: { confirmed, deaths, recovered, lastUpdate } } = await axios.get(changableUrl)
        return { confirmed, deaths, recovered, lastUpdate }
    } catch (err) {
        console.log(err)
    }
}

export const fetchCountries = async () => {
    try {
        const { data: { countries } } = await axios.get(`${url}/countries`)
        return countries.map(country => ({ name: country.name }))
    } catch (err) {
        console.log(err)
    }
}

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`)
        return data.map(({ confirmed, deaths, reportDate }) => ({
            confirmed: confirmed.total,
            deaths: deaths.total,
            date: reportDate
        }))
    } catch (err) {

    }
}