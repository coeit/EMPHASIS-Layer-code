/*
    Resolvers for basic CRUD operations
*/

const path = require('path');
const plant = require(path.join(__dirname, '..', 'models_index.js')).Plant;
const helper = require('../utils/helper');
const checkAuthorization = require('../utils/check-authorization');
const fs = require('fs');
const {
    handleError
} = require('../utils/errors');
const os = require('os');








module.exports = {

    /**
     * plants - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Offset and limit to get the records from and to respectively
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records holding conditions specified by search, order and pagination argument
     */
    plants: function({
        search,
        order,
        pagination
    }, context) {
        return checkAuthorization(context, 'Plant', 'read').then(authorization => {
            if (authorization === true) {
                return plant.readAll(search, order, pagination);
            } else {
                return new Error("You don't have authorization to perform this action");
            }
        }).catch(error => {
            handleError(error);
        })
    },

    /**
     * readOnePlant - Check user authorization and return one record with the specified id in the id argument.
     *
     * @param  {number} {plantId}    Id of the record to retrieve
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Record with id requested
     */
    readOnePlant: function({
        plantId
    }, context) {
        return checkAuthorization(context, 'Plant', 'read').then(authorization => {
            if (authorization === true) {
                console.log(JSON.stringify(plantId));
                return plant.readById(plantId.plantURI, plantId.experimentURI);
            } else {
                return new Error("You don't have authorization to perform this action");
            }
        }).catch(error => {
            handleError(error);
        })
    },

    /**
     * addPlant - Check user authorization and creates a new record with data specified in the input argument
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         New record created
     */
    addPlant: function(input, context) {
        return checkAuthorization(context, 'Plant', 'create').then(authorization => {
            if (authorization === true) {
                return plant.addOne(input);
            } else {
                return new Error("You don't have authorization to perform this action");
            }
        }).catch(error => {
            handleError(error);
        })
    },

    /**
     * bulkAddPlantCsv - Load csv file of records
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     */
    bulkAddPlantCsv: function(_, context) {
        return checkAuthorization(context, 'Plant', 'create').then(authorization => {
            if (authorization === true) {
                return plant.bulkAddCsv(context);
            } else {
                return new Error("You don't have authorization to perform this action");
            }
        }).catch(error => {
            return error;
        })
    },

    /**
     * deletePlant - Check user authorization and delete a record with the specified id in the id argument.
     *
     * @param  {number} {id}    Id of the record to delete
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {string}         Message indicating if deletion was successfull.
     */
    deletePlant: function({
        id
    }, context) {
        return checkAuthorization(context, 'Plant', 'delete').then(authorization => {
            if (authorization === true) {
                return plant.deleteOne(id);
            } else {
                return new Error("You don't have authorization to perform this action");
            }
        }).catch(error => {
            handleError(error);
        })
    },

    /**
     * updatePlant - Check user authorization and update the record specified in the input argument
     *
     * @param  {object} input   record to update and new info to update
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Updated record
     */
    updatePlant: function(input, context) {
        return checkAuthorization(context, 'Plant', 'update').then(authorization => {
            if (authorization === true) {
                return plant.updateOne(input);
            } else {
                return new Error("You don't have authorization to perform this action");
            }
        }).catch(error => {
            handleError(error);
        })
    },

    /**
     * countPlants - Counts number of records that holds the conditions specified in the search argument
     *
     * @param  {object} {search} Search argument for filtering records
     * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {number}          Number of records that holds the conditions specified in the search argument
     */
    countPlants: function({
        search
    }, context) {
        return checkAuthorization(context, 'Plant', 'read').then(authorization => {
            if (authorization === true) {
                return plant.countRecords(search);
            } else {
                return new Error("You don't have authorization to perform this action");
            }
        }).catch(error => {
            handleError(error);
        })
    },

    /**
     * vueTablePlant - Return table of records as needed for displaying a vuejs table
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Records with format as needed for displaying a vuejs table
     */
    vueTablePlant: function(_, context) {
        return checkAuthorization(context, 'Plant', 'read').then(authorization => {
            if (authorization === true) {
                return helper.vueTable(context.request, plant, ["id", "plateform", "technicalPlateau", "experimentURI", "experimentAlias", "specie", "studyURI", "studyAlias", "plantURI", "plantAlias", "genotypeURI", "genotypeAlias", "seedLot", "scenario", "location", "repetition", "position", "potAlias", "physicalPot", "sowing", "thinning", "harvesting"]);
            } else {
                return new Error("You don't have authorization to perform this action");
            }
        }).catch(error => {
            handleError(error);
        })
    },

    /**
     * csvTableTemplatePlant - Returns table's template
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {Array}         Strings, one for header and one columns types
     */
    csvTableTemplatePlant: function(_, context) {
        return checkAuthorization(context, 'Plant', 'read').then(authorization => {
            if (authorization === true) {
                return plant.csvTableTemplate();
            } else {
                return new Error("You don't have authorization to perform this action");
            }
        }).catch(error => {
            handleError(error);
        })
    }

}