/*
    Resolvers for basic CRUD operations
*/

const path = require('path');
const study = require(path.join(__dirname, '..', 'models_index.js')).Study;
const helper = require('../utils/helper');
const checkAuthorization = require('../utils/check-authorization');
const fs = require('fs');
const {
    handleError
} = require('../utils/errors');
const os = require('os');



/**
 * study.prototype.locations - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
study.prototype.locations = function({
    search
}, context) {
    return this.locationsImpl(search);
}





module.exports = {

    /**
     * studies - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Offset and limit to get the records from and to respectively
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records holding conditions specified by search, order and pagination argument
     */
    studies: function({
        search,
        order,
        pagination
    }, context) {
        return checkAuthorization(context, 'study', 'read').then(authorization => {
            if (authorization === true) {
                return study.readAll(search, order, pagination);
            } else {
                return new Error("You don't have authorization to perform this action");
            }
        }).catch(error => {
            handleError(error);
        })
    },

    /**
     * readOneStudy - Check user authorization and return one record with the specified id in the id argument.
     *
     * @param  {number} {id}    Id of the record to retrieve
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Record with id requested
     */
    readOneStudy: function({
        id
    }, context) {
        return checkAuthorization(context, 'study', 'read').then(authorization => {
            if (authorization === true) {
                return study.readById(id);
            } else {
                return new Error("You don't have authorization to perform this action");
            }
        }).catch(error => {
            handleError(error);
        })
    },

    /**
     * addStudy - Check user authorization and creates a new record with data specified in the input argument
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         New record created
     */
    addStudy: function(input, context) {
        return checkAuthorization(context, 'study', 'create').then(authorization => {
            if (authorization === true) {
                return study.addOne(input);
            } else {
                return new Error("You don't have authorization to perform this action");
            }
        }).catch(error => {
            handleError(error);
        })
    },

    /**
     * bulkAddStudyCsv - Load csv file of records
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     */
    bulkAddStudyCsv: function(_, context) {
        return checkAuthorization(context, 'study', 'create').then(authorization => {
            if (authorization === true) {
                return study.bulkAddCsv(context);
            } else {
                return new Error("You don't have authorization to perform this action");
            }
        }).catch(error => {
            return error;
        })
    },

    /**
     * deleteStudy - Check user authorization and delete a record with the specified id in the id argument.
     *
     * @param  {number} {id}    Id of the record to delete
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {string}         Message indicating if deletion was successfull.
     */
    deleteStudy: function({
        id
    }, context) {
        return checkAuthorization(context, 'study', 'delete').then(authorization => {
            if (authorization === true) {
                return study.deleteOne(id);
            } else {
                return new Error("You don't have authorization to perform this action");
            }
        }).catch(error => {
            handleError(error);
        })
    },

    /**
     * updateStudy - Check user authorization and update the record specified in the input argument
     *
     * @param  {object} input   record to update and new info to update
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Updated record
     */
    updateStudy: function(input, context) {
        return checkAuthorization(context, 'study', 'update').then(authorization => {
            if (authorization === true) {
                return study.updateOne(input);
            } else {
                return new Error("You don't have authorization to perform this action");
            }
        }).catch(error => {
            handleError(error);
        })
    },

    /**
     * countStudies - Counts number of records that holds the conditions specified in the search argument
     *
     * @param  {object} {search} Search argument for filtering records
     * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {number}          Number of records that holds the conditions specified in the search argument
     */
    countStudies: function({
        search
    }, context) {
        return checkAuthorization(context, 'study', 'read').then(authorization => {
            if (authorization === true) {
                return study.countRecords(search);
            } else {
                return new Error("You don't have authorization to perform this action");
            }
        }).catch(error => {
            handleError(error);
        })
    },

    /**
     * vueTableStudy - Return table of records as needed for displaying a vuejs table
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Records with format as needed for displaying a vuejs table
     */
    vueTableStudy: function(_, context) {
        return checkAuthorization(context, 'study', 'read').then(authorization => {
            if (authorization === true) {
                return helper.vueTable(context.request, study, ["id", "documentationURL", "studyDbId", "trialName", "studyType", "studyName", "trialDbId", "studyDescription"]);
            } else {
                return new Error("You don't have authorization to perform this action");
            }
        }).catch(error => {
            handleError(error);
        })
    },

    /**
     * csvTableTemplateStudy - Returns table's template
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {Array}         Strings, one for header and one columns types
     */
    csvTableTemplateStudy: function(_, context) {
        return checkAuthorization(context, 'study', 'read').then(authorization => {
            if (authorization === true) {
                return study.csvTableTemplate();
            } else {
                return new Error("You don't have authorization to perform this action");
            }
        }).catch(error => {
            handleError(error);
        })
    }

}