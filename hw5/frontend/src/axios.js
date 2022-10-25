import axios from 'axios'

const instance = axios.create({baseURL: 'http://localhost:4000/api/guess'})

const startGame = async() => {
    const { data: {msg}} = await instance.post('/start')
    return msg
}

const guess = async(number) => {
    console.log("given number is: ", number)
    try {
        const { data: {msg} } = await instance.get('/guess', {params: {number}})
        return msg
    }
    catch (error) {
        console.log(error)
        return error.response.data['msg']
    }
}

const restart = async() => {
    const { data: {msg} } = await instance.post('/restart')
    return msg
}

export {startGame, guess, restart}