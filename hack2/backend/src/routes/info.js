// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ info.js ]
// * PackageName  [ server ]
// * Synopsis     [ Get restaurant info from database ]
// * Author       [ Chin-Yi Cheng ]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////

import Info from '../models/info'

exports.GetSearch = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const priceFilter = req.query.priceFilter
    const mealFilter  = req.query.mealFilter
    const typeFilter  = req.query.typeFilter
    const sortBy      = req.query.sortBy
    /****************************************/

    // NOTE Hint: 
    // use `db.collection.find({condition}).exec(err, data) {...}`
    // When success, 
    //   do `res.status(200).send({ message: 'success', contents: ... })`
    // When fail,
    //   do `res.status(403).send({ message: 'error', contents: ... })` 
    

    // TODO Part I-3-a: find the information to all restaurants
    // id: { type: Number, required: true },
    // name: { type: String, required: true },
    // tag: [{ type: String }],
    // img: { type: String },
    // time: { type: Schema.Types.Mixed },
    // distance: { type: Number },
    // price: { type: Number }
    console.log("<getSearch>: ", mealFilter, typeFilter)
    try {
        // const data = await Info.find({price: priceFilter}).sort({sortFilter: -1})
        // const data = await Info.find({price: priceFilter, tag: { $all: {mealFilter, typeFilter}})
        // const data = await Info.find(
        //     {$and: [ 
        //         {}
        //         {price: { $in: priceFilter }},
        //         {tag: { $in: mealFilter }}, 
        //     // { tag: { $ne: null, $all: typeFilter}} 
        //     ]}
        // )
        const data = await Info.find()
        console.log(data)
        if (data.length) {
            res.status(200).send(
                {
                    message: 'success',
                    contents: data
                }
            );
        }
        else {
            throw new Error('Something Wrong with GetSearch !')
        }

    } catch (error) {
        console.error(error.name + ' ' + error.message)
        res.status(403).send(
            {
                message: 'error',
                data: null
            }
        )
    }
    
    // TODO Part II-2-a: revise the route so that the result is filtered with priceFilter, mealFilter and typeFilter
    // TODO Part II-2-b: revise the route so that the result is sorted by sortBy
}

exports.GetInfo = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const id = req.query.id
    /****************************************/

    // NOTE USE THE FOLLOWING FORMAT. Send type should be 
    // if success:
    // {
    //    message: 'success'
    //    contents: the data to be sent. Hint: A dictionary of the restaruant's information.
    // }
    // else:
    // {
    //    message: 'error'
    //    contents: []
    // }

    // TODO Part III-2: find the information to the restaurant with the id that the user requests
}