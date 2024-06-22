const { default: axios } = require("axios")
const DATA = require('../data/data.json')

exports.createProducts = async () =>
{
    console.log("We are creating post!!")
    await axios.post("http://localhost:5000/api/products",
        DATA.items)
        .then((res) => console.log(res.message))
        .catch((err) => console.log(err.response.data))
}