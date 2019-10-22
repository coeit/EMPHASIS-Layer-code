const _ = require('lodash');
const path = require('path');
const models = require(path.join(__dirname, '..', 'models_index.js'));

// An exact copy of the the model definition that comes from the .json file
const definition = {
    model: 'location',
    storageType: 'webservice',
    attributes: {
        abbreviation: 'String',
        name: 'String',
        countryCode: 'String',
        altitude: 'String',
        longitude: 'String',
        latitude: 'String',
        countryName: 'String',
        locationDbId: 'String'
    },
    associations: {
        studies: {
            type: 'to_one',
            target: 'study',
            targetKey: 'studyId',
            targetStorageType: 'webservice',
            label: 'studyDbId',
            name: 'studies',
            name_lc: 'studies',
            name_cp: 'Studies',
            target_lc: 'study',
            target_lc_pl: 'studies',
            target_pl: 'studies',
            target_cp: 'Study',
            target_cp_pl: 'Studies'
        }
    }
};

module.exports = class location {

    /**
     * constructor - Creates an instance of the model stored in webservice
     *
     * @param  {obejct} input    Data for the new instances. Input for each field of the model.
     */

    constructor({
        id,
        abbreviation,
        name,
        countryCode,
        altitude,
        longitude,
        latitude,
        countryName,
        locationDbId
    }) {
        this.id = id;
        this.abbreviation = abbreviation;
        this.name = name;
        this.countryCode = countryCode;
        this.altitude = altitude;
        this.longitude = longitude;
        this.latitude = latitude;
        this.countryName = countryName;
        this.locationDbId = locationDbId;
    }

    static readById(id) {
        /*
        YOUR CODE GOES HERE
        */
        throw new Error('readOneLocation is not implemented');
    }

    static countRecords(search) {

        /*
        YOUR CODE GOES HERE
        */
        throw new Error('countLocations is not implemented');
    }

    static readAll(search, order, pagination) {
        /*
        YOUR CODE GOES HERE
        */
        throw new Error('Read all locations is not implemented');

    }

    static addOne(input) {
        /*
        YOUR CODE GOES HERE
        */
        throw new Error('addLocation is not implemented');
    }

    static deleteOne(id) {
        /*
        YOUR CODE GOES HERE
        */
        throw new Error('deleteLocation is not implemented');
    }

    static updateOne(input) {
        /*
        YOUR CODE GOES HERE
        */
        throw new Error('updateLocation is not implemented');
    }

    static bulkAddCsv(context) {
        /*
        YOUR CODE GOES HERE
        */
        throw new Error('bulkAddLocationCsv is not implemented');
    }

    static csvTableTemplate() {
        /*
        YOUR CODE GOES HERE
        */
        throw new Error('csvTableTemplateLocation is not implemented');
    }


    studiesImpl(search) {
        if (search === undefined) {
            return models.study.readById(this.studyId);
        } else {
            /*
            YOUR CODE GOES HERE
            */
            throw new Error('studiesImpl is not implemented in the model');
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
        let attributes = Object.keys(location.definition.attributes);
        attributes.push('id');
        let data_values = _.pick(this, attributes);
        return data_values;
    }


};