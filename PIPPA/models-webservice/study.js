const _ = require('lodash');
const path = require('path');
const models = require(path.join(__dirname, '..', 'models_index.js'));

const brAPIGlobals = require('../config/BrAPIGlobals');
const axios = require('axios');

// An exact copy of the the model definition that comes from the .json file
const definition = {
    model: 'study',
    storageType: 'webservice',
    attributes: {
        documentationURL: 'String',
        studyDbId: 'String',
        active: 'Boolean',
        trialName: 'String',
        studyType: 'String',
        studyName: 'String',
        trialDbId: 'String',
        endDate: 'Date',
        studyDescription: 'String',
        startDate: 'Date'
    },
    associations: {
        locations: {
            type: 'to_one',
            target: 'location',
            targetKey: 'locationId',
            targetStorageType: 'webservice',
            label: 'locationDbId',
            name: 'locations',
            name_lc: 'locations',
            name_cp: 'Locations',
            target_lc: 'location',
            target_lc_pl: 'locations',
            target_pl: 'locations',
            target_cp: 'Location',
            target_cp_pl: 'Locations'
        }
    }
};

module.exports = class Study {

    /**
     * constructor - Creates an instance of the model stored in webservice
     *
     * @param  {obejct} input    Data for the new instances. Input for each field of the model.
     */

    constructor({
        id,
        documentationURL,
        studyDbId,
        active,
        trialName,
        studyType,
        studyName,
        trialDbId,
        endDate,
        studyDescription,
        startDate
    }) {
        this.id = id;
        this.documentationURL = documentationURL;
        this.studyDbId = studyDbId;
        this.active = active;
        this.trialName = trialName;
        this.studyType = studyType;
        this.studyName = studyName;
        this.trialDbId = trialDbId;
        this.endDate = endDate;
        this.studyDescription = studyDescription;
        this.startDate = startDate;
    }

    static async readById(id) {
        console.log(brAPIGlobals.STUDY_BASE_URL + id);
        let studyResponse = await axios.get(brAPIGlobals.STUDY_BASE_URL + id);
        /*console.log("\n\n" + Object.keys(plantResponse));
        console.log("\n\n" + JSON.stringify(plantResponse.status));
        console.log("\n\n" + JSON.stringify(plantResponse.statusText));*/
        //console.log(plantResponse)
        console.log(JSON.stringify(studyResponse.data.result));
        let study = new Study(studyResponse.data.result);
        console.log(JSON.stringify(study));
        return study;
    }

    static countRecords(search) {

        /*
        YOUR CODE GOES HERE
        */
        throw new Error('countStudies is not implemented');
    }

    static readAll(search, order, pagination) {
        /*
        YOUR CODE GOES HERE
        */
        throw new Error('Read all studies is not implemented');

    }

    static addOne(input) {
        /*
        YOUR CODE GOES HERE
        */
        throw new Error('addStudy is not implemented');
    }

    static deleteOne(id) {
        /*
        YOUR CODE GOES HERE
        */
        throw new Error('deleteStudy is not implemented');
    }

    static updateOne(input) {
        /*
        YOUR CODE GOES HERE
        */
        throw new Error('updateStudy is not implemented');
    }

    static bulkAddCsv(context) {
        /*
        YOUR CODE GOES HERE
        */
        throw new Error('bulkAddStudyCsv is not implemented');
    }

    static csvTableTemplate() {
        /*
        YOUR CODE GOES HERE
        */
        throw new Error('csvTableTemplateStudy is not implemented');
    }


    locationsImpl(search) {
        if (search === undefined) {
            return models.location.readById(this.locationId);
        } else {
            /*
            YOUR CODE GOES HERE
            */
            throw new Error('locationsImpl is not implemented in the model');
        }
    }







    static get definition() {
        return definition;
    }

    static base64Decode(cursor) {
        return Buffer.from(cursor, 'base64').toString('utf-8');
    }

    base64Enconde() {
        return Buffer.from(JSON.stringify(this.stripAssociations())).toString('base64');
    }

    stripAssociations() {
        let attributes = Object.keys(study.definition.attributes);
        attributes.push('id');
        let data_values = _.pick(this, attributes);
        return data_values;
    }


};