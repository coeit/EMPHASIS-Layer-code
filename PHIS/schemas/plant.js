module.exports = `
  type Plant{
    """
    @original-field
    """
    id: ID

    """
    @original-field
       
    """
    plateform: String

    """
    @original-field
       
    """
    technicalPlateau: String

    """
    @original-field
       
    """
    experimentURI: String

    """
    @original-field
       
    """
    experimentAlias: String

    """
    @original-field
       
    """
    specie: String

    """
    @original-field
       
    """
    studyURI: String

    """
    @original-field
       
    """
    studyAlias: String

    """
    @original-field
       
    """
    plantURI: String

    """
    @original-field
       
    """
    plantAlias: String

    """
    @original-field
       
    """
    genotypeURI: String

    """
    @original-field
       
    """
    genotypeAlias: String

    """
    @original-field
       
    """
    seedLot: String

    """
    @original-field
       
    """
    scenario: String

    """
    @original-field
       
    """
    location: String

    """
    @original-field
       
    """
    repetition: String

    """
    @original-field
       
    """
    position: String

    """
    @original-field
       
    """
    potAlias: String

    """
    @original-field
       
    """
    physicalPot: String

    """
    @original-field
       
    """
    sowing: String

    """
    @original-field
       
    """
    thinning: String

    """
    @original-field
       
    """
    harvesting: String

      }

  type VueTablePlant{
    data : [Plant]
    total: Int
    per_page: Int
    current_page: Int
    last_page: Int
    prev_page_url: String
    next_page_url: String
    from: Int
    to: Int
  }

  enum PlantField {
    id 
    plateform  
    technicalPlateau  
    experimentURI  
    experimentAlias  
    specie  
    studyURI  
    studyAlias  
    plantURI  
    plantAlias  
    genotypeURI  
    genotypeAlias  
    seedLot  
    scenario  
    location  
    repetition  
    position  
    potAlias  
    physicalPot  
    sowing  
    thinning  
    harvesting  
  }

  input searchPlantInput {
    field: PlantField
    value: typeValue
    operator: Operator
    search: [searchPlantInput]
  }

  input orderPlantInput{
    field: PlantField
    order: Order
  }

  input plantId {
    plantURI: String!
    experimentURI: String!
  }

  type Query {
    plants(search: searchPlantInput, order: [ orderPlantInput ], pagination: paginationInput ): [Plant]
    readOnePlant(plantId: plantId!): Plant
    countPlants(search: searchPlantInput ): Int
    vueTablePlant : VueTablePlant    csvTableTemplatePlant: [String]
  }

    type Mutation {
      addPlant( plateform: String, technicalPlateau: String, experimentURI: String, experimentAlias: String, specie: String, studyURI: String, studyAlias: String, plantURI: String, plantAlias: String, genotypeURI: String, genotypeAlias: String, seedLot: String, scenario: String, location: String, repetition: String, position: String, potAlias: String, physicalPot: String, sowing: String, thinning: String, harvesting: String): Plant!
    updatePlant(id: ID!, plateform: String, technicalPlateau: String, experimentURI: String, experimentAlias: String, specie: String, studyURI: String, studyAlias: String, plantURI: String, plantAlias: String, genotypeURI: String, genotypeAlias: String, seedLot: String, scenario: String, location: String, repetition: String, position: String, potAlias: String, physicalPot: String, sowing: String, thinning: String, harvesting: String): Plant!
  

  deletePlant(id: ID!): String!
  bulkAddPlantCsv: [Plant] }

`;