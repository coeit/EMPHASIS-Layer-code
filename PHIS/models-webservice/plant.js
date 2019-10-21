const _ = require('lodash');
const path = require('path');
const models = require(path.join(__dirname, '..', 'models_index.js'));

const axios = require('axios');
const loginHandler = new (require('../utils/phisLoginHandler'));
const phisGlobals = require('../config/phisGlobals');
const globals = require('../config/globals');
// An exact copy of the the model definition that comes from the .json file
const definition = {
    model: 'Plant',
    storageType: 'webservice',
    attributes: {
        plateform: 'String',
        technicalPlateau: 'String',
        experimentURI: 'String',
        experimentAlias: 'String',
        specie: 'String',
        studyURI: 'String',
        studyAlias: 'String',
        plantURI: 'String',
        plantAlias: 'String',
        genotypeURI: 'String',
        genotypeAlias: 'String',
        seedLot: 'String',
        scenario: 'String',
        location: 'String',
        repetition: 'String',
        position: 'String',
        potAlias: 'String',
        physicalPot: 'String',
        sowing: 'String',
        thinning: 'String',
        harvesting: 'String'
    }
};

module.exports = class Plant {

    /**
     * constructor - Creates an instance of the model stored in webservice
     *
     * @param  {obejct} input    Data for the new instances. Input for each field of the model.
     */

    constructor({
        id,
        plateform,
        technicalPlateau,
        experimentURI,
        experimentAlias,
        specie,
        studyURI,
        studyAlias,
        plantURI,
        plantAlias,
        genotypeURI,
        genotypeAlias,
        seedLot,
        scenario,
        location,
        repetition,
        position,
        potAlias,
        physicalPot,
        sowing,
        thinning,
        harvesting
    }) {
        this.id = id;
        this.plateform = plateform;
        this.technicalPlateau = technicalPlateau;
        this.experimentURI = experimentURI;
        this.experimentAlias = experimentAlias;
        this.specie = specie;
        this.studyURI = studyURI;
        this.studyAlias = studyAlias;
        this.plantURI = plantURI;
        this.plantAlias = plantAlias;
        this.genotypeURI = genotypeURI;
        this.genotypeAlias = genotypeAlias;
        this.seedLot = seedLot;
        this.scenario = scenario;
        this.location = location;
        this.repetition = repetition;
        this.position = position;
        this.potAlias = potAlias;
        this.physicalPot = physicalPot;
        this.sowing = sowing;
        this.thinning = thinning;
        this.harvesting = harvesting;
    }

    /*static async readById(plantURI, experimentURI) {
        let plantURIencoded = encodeURIComponent(plantURI);
        let loginResponse = (await phisLogin.login()).data.session_token
        console.log(JSON.stringify(loginResponse))
        let plantResponse = await axios.get(phisPlantBaseURL + plantURIencoded, {
            params: {
                experimentURI: experimentURI,
                sessionId: loginResponse
            }
        })
        let plant = new Plant(plantResponse.data.result.data[0])
        console.log(JSON.stringify(plant));
        return plant;
    }*/

    static readById (plantURI, experimentURI) {
        try {
            let plant = this.readByIdImpl(plantURI, experimentURI);
            return plant;
        } catch (error) {
            console.log(error);
            //check if Status code 401: if yes retry
        } // else throw error
    }

    static async readByIdImpl(plantURI, experimentURI){
        let plantURIencoded = encodeURIComponent(plantURI);
    
        let plantResponse = await axios.get(phisGlobals.PLANT_BASE_URL + plantURIencoded, {
            params: {
                experimentURI : experimentURI,
                sessionId: await loginHandler.getSessionToken()
            }
        });
        let plant = new Plant(plantResponse.data.result.data[0]);
        //console.log(JSON.stringify(plant));
        return plant;
    }

    static countRecords(search) {

        /*
        YOUR CODE GOES HERE
        */
        throw new Error('countPlants is not implemented');
    }

    static async readAll(search, order, pagination) {
        //validate experimentURI
        //validate order: throw error: order argument not supported by backend breedingAPI

        //validate search is not undefined (throw error: specify experimentURI)
        //first implementation: allow only the following search
        //search: {field: experiment, value: {type: "String", value: "my_expURI"}, operator: eq}

        if (pagination === undefined) {
            throw new Error('You must use pagination for this request');
        }

        if (globals.LIMIT_RECORDS < pagination.limit) {
            throw new Error(`Request of total users exceeds max limit of ${globals.LIMIT_RECORDS}. Please use pagination.`);
        }

        if (search.field != "experimentURI") {
            throw new Error('You must specify an experimentURI');
        }

        if (order !== undefined) {
            throw new Error('order argument not supported by backend breedingAPI')
        }

        let plantResponse = await axios.get(phisGlobals.PLANT_BASE_URL, {
            params: {
                experimentURI : search.value.value,
                sessionId : await loginHandler.getSessionToken(),
                pageSize : pagination.limit,
                page : pagination.offset
            }
        });
        
        let plants = [];

        for (var i in plantResponse.data.result.data) {
            plants.push(plantResponse.data.result.data[i])
        }

        //console.log(JSON.stringify(plants));
        return plants;

        //throw new Error('Read all plants is not implemented');

    }

    static addOne(input) {
        /*
        YOUR CODE GOES HERE
        */
        throw new Error('addPlant is not implemented');
    }

    static deleteOne(id) {
        /*
        YOUR CODE GOES HERE
        */
        throw new Error('deletePlant is not implemented');
    }

    static updateOne(input) {
        /*
        YOUR CODE GOES HERE
        */
        throw new Error('updatePlant is not implemented');
    }

    static bulkAddCsv(context) {
        /*
        YOUR CODE GOES HERE
        */
        throw new Error('bulkAddPlantCsv is not implemented');
    }

    static csvTableTemplate() {
        /*
        YOUR CODE GOES HERE
        */
        throw new Error('csvTableTemplatePlant is not implemented');
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
        let attributes = Object.keys(Plant.definition.attributes);
        attributes.push('id');
        let data_values = _.pick(this, attributes);
        return data_values;
    }


};