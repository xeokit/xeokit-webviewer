/**
 * <img style="padding:50px" src="/docs/assets/xeokit_datamodel_icon.png"/>
 *
 * # xeokit Semantic Data Model
 *
 * ---
 *
 * ***The SDK's buildable, queryable, importable and exportable semantic data model***
 *
 * ---
 *
 * # Overview
 *
 * The xeokit SDK uses a generic entity-relationship data graph to manage model semantics. This graph includes entities,
 * properties, and relationships and is compatible with both the browser and NodeJS. It serves as a versatile tool for generating
 * models, converting between model formats, and navigating content within the model viewer.
 *
 * In more detail, the xeokit SDK provides a {@link Data | Data} container class that holds
 * {@link DataModel | DataModels} consisting of {@link DataObject | DataObjects},
 * {@link PropertySet | PropertySets}, and
 * {@link Relationship | Relationships}, as shown in the diagram below.
 *
 * <br>
 *
 * [![](https://mermaid.ink/img/pako:eNqNVMFunDAU_BX0Tu1qgxaW9QLnHBOlSm4VFwc7WVeAkTFV6Wr_vcZmu89A0nIBzxvPmzdGPkMpGYccyop23b2g74rWRcOE4qUWsgkenosmsI9lBPdU0_MVcrjiVPNHI1N9-epVOk5VeXp6_WG0ulmtrExxhtWjRudB0m32sFbJlis9vHC_cP2-LB1bd9i2YGixbLLewk3q5sHWHf7MKzpG1p1Eu6x-uyni4msvKoYBxjut5HCDVqZxDrxT8OYJ9NByvF4bZ6aL_CFhLDuJCP4viQAJNLRGTn7SqkdLbHOmhcPEev5kyrKadxfIDOfMh_92GCMMCogK2NzdmXcYbgq4_SaYZoF1ri_-seaS5xDD3kzsnWOjI_hA9hPWwuk61cvVCl7JN2f5eqz_v3WePPKxzOhanMiwhZqrmgpmLiV78AXoEzd_EeTmk_E32le6gKK5GCrttXwZmhJyrXq-hb5lpv10jUH-RqvOoC1tID_DL8hjEoVRdDxEJE73GSHZYQuDgeMwyY7kkGTRMSbp_nDZwm8pjcIuTGOSJGS_yxKSpjvD50xoqR6na3N82Q7fLX-0cfkD0IeHkg?type=png)](https://mermaid.live/edit#pako:eNqNVMFunDAU_BX0Tu1qgxaW9QLnHBOlSm4VFwc7WVeAkTFV6Wr_vcZmu89A0nIBzxvPmzdGPkMpGYccyop23b2g74rWRcOE4qUWsgkenosmsI9lBPdU0_MVcrjiVPNHI1N9-epVOk5VeXp6_WG0ulmtrExxhtWjRudB0m32sFbJlis9vHC_cP2-LB1bd9i2YGixbLLewk3q5sHWHf7MKzpG1p1Eu6x-uyni4msvKoYBxjut5HCDVqZxDrxT8OYJ9NByvF4bZ6aL_CFhLDuJCP4viQAJNLRGTn7SqkdLbHOmhcPEev5kyrKadxfIDOfMh_92GCMMCogK2NzdmXcYbgq4_SaYZoF1ri_-seaS5xDD3kzsnWOjI_hA9hPWwuk61cvVCl7JN2f5eqz_v3WePPKxzOhanMiwhZqrmgpmLiV78AXoEzd_EeTmk_E32le6gKK5GCrttXwZmhJyrXq-hb5lpv10jUH-RqvOoC1tID_DL8hjEoVRdDxEJE73GSHZYQuDgeMwyY7kkGTRMSbp_nDZwm8pjcIuTGOSJGS_yxKSpjvD50xoqR6na3N82Q7fLX-0cfkD0IeHkg)
 *
 * Various model file formats can be imported into DataModels using methods such as {@link gltf!loadGLTF | loadGLTF}, {@link las!loadLAS | loadLAS},
 * {@link cityjson!loadCityJSON | loadCityJSON}, {@link webifc!loadWebIFC | loadWebIFC}, {@link dotbim!loadDotBIM | loadDotBIM}, and {@link xgf!loadXGF | loadXGF},
 * while DataModels can be exported to various formats, using methods such as {@link dotbim!saveDotBIM | saveDotBIM}.
 *
 * To programmatically build DataModels, builder methods
 * such as {@link Data.createModel | Data.createModel}, {@link DataModel.createObject | DataModel.createObject},
 * {@link DataModel.createPropertySet | DataModel.createPropertySet}, and
 * {@link DataModel.createRelationship | DataModel.createRelationship} can be employed.
 * DataObjects can be queried using the {@link searchObjects | searchObjects} function, and
 * semantic data can be attached to model representations by
 * using it alongside SceneModel.
 *
 * It's important to note that DataObjects and PropertySets are global, created on their DataModels but stored globally
 * on the Data. Additionally, DataModels automatically reuse DataObjects and PropertySets wherever they're already
 * created by other DataModels. Finally, DataObjects can have Relationships with other DataObjects in different DataModels.
 *
 * <br>
 *
 * # Installation
 *
 * ````bash
 * npm install @xeokit/sdk
 * ````
 *
 * # Usage
 *
 * ## Creating a DataModel from JSON
 *
 * We will start with an example where we create a {@link DataModel | DataModel} using a single parameter
 * object of type {@link DataModelParams | DataModelParams}.
 * The DataModel we create will define a simple piece of furniture - a table consisting of a tabletop and four legs.
 * We will then query the data model to retrieve all the {@link DataObject | DataObjects} within it.
 *
 * To achieve this, we will create a DataModel that contains six DataObjects: one for the
 * table, one for the tabletop, and one for each of the four legs. We will also define Relationships
 * to connect the DataObjects into an aggregation hierarchy, and we will assign {@link Property | Properties} to the
 * DataObjects to give them attributes such as height and weight.
 *
 * To give the DataObjects and {@link Relationship | Relationships} semantic meaning, we will assign
 * them types from one of the SDK's bundled data type sets, {@link "basictypes" | @xeokit/basictypes}. This set of types classifies each DataObject
 * as a {@link basictypes!BasicEntity | BasicEntity} and each Relationship as
 * a {@link basictypes!BasicAggregation | BasicAggregation}.
 *
 * It's worth noting that in a real-world scenario, we would likely use a more complex set of data types, such as
 * {@link "ifctypes" | @xeokit/ifctypes}. However, we cannot mix different sets of data types within our {@link Data | Data},
 * as traversals of the DataObjects with {@link searchObjects | searchObjects } must be
 * guided uniformly by the same set of types across all the DataObjects and Relationships in the graph.
 *
 * To create our DataModel, we will use the following code, which creates a new Data object and then
 * creates a DataModel from a set of objects, relationships, and property sets. The {@link core!SDKError | SDKError} class
 * is used to handle errors that may occur during the process:
 *
 * ````javascript
 * import { SDKError } from "@xeokit/sdk/core";
 * import { Data } from "@xeokit/sdk/data";
 * import * as basicTypes from "@xeokit/sdk/basictypes/basicTypes";
 *
 * const myData = new Data({});
 *
 * const myDataModel = myData.createModel({
 *   id: "myTableModel",
 *   objects: [
 *     {
 *       id: "table",
 *       type: basicTypes.BasicEntity,
 *       name: "Table",
 *       propertySetIds: ["tablePropertySet"],
 *     },
 *     {
 *       id: "redLeg",
 *       name: "Red table Leg",
 *       type: basicTypes.BasicEntity,
 *       propertySetIds: ["legPropertySet"],
 *     },
 *     {
 *       id: "greenLeg",
 *       name: "Green table leg",
 *       type: basicTypes.BasicEntity,
 *       propertySetIds: ["legPropertySet"],
 *     },
 *     {
 *       id: "blueLeg",
 *       name: "Blue table leg",
 *       type: basicTypes.BasicEntity,
 *       propertySetIds: ["legPropertySet"],
 *     },
 *     {
 *       id: "yellowLeg",
 *       name: "Yellow table leg",
 *       type: basicTypes.BasicEntity,
 *       propertySetIds: ["legPropertySet"],
 *     },
 *     {
 *       id: "tableTop",
 *       name: "Purple table top",
 *       type: basicTypes.BasicEntity,
 *       propertySetIds: ["tableTopPropertySet"],
 *     },
 *   ],
 *   relationships: [
 *     {
 *       type: basicTypes.BasicAggregation,
 *       relatingObjectId: "table",
 *       relatedObjectId: "tableTop",
 *     },
 *     {
 *       type: basicTypes.BasicAggregation,
 *       relatingObjectId: "tableTop",
 *       relatedObjectId: "redLeg",
 *     },
 *     {
 *       type: basicTypes.BasicAggregation,
 *       relatingObjectId: "tableTop",
 *       relatedObjectId: "greenLeg",
 *     },
 *     {
 *       type: basicTypes.BasicAggregation,
 *       relatingObjectId: "tableTop",
 *       relatedObjectId: "blueLeg",
 *     },
 *     {
 *       type: basicTypes.BasicAggregation,
 *       relatingObjectId: "tableTop",
 *       relatedObjectId: "yellowLeg",
 *     },
 *   ],
 *   propertySets: [
 *     {
 *       id: "tablePropertySet",
 *       originalSystemId: "tablePropertySet",
 *       name: "Table properties",
 *       type: "",
 *       properties: [
 *         {
 *           name: "Weight",
 *           value: 5,
 *           type: "",
 *           valueType: "",
 *           description: "Weight of the thing",
 *         },
 *         {
 *           name: "Height",
 *           value: 12,
 *           type: "",
 *           valueType: "",
 *           description: "Height of the thing",
 *         },
 *       ],
 *     },
 *     {
 *       id: "legPropertySet",
 *       originalSystemId: "legPropertySet",
 *       name: "Table leg properties",
 *       type: "",
 *       properties: [
 *         {
 *           name: "Weight",
 *           value: 5,
 *           type: "",
 *           valueType: "",
 *           description: "Weight of the thing",
 *         },
 *         {
 *           name: "Height",
 *           value: 12,
 *           type: "",
 *           valueType: "",
 *           description: "Height of the thing",
 *         },
 *       ],
 *     },
 *   ],
 * });
 *
 * if (myDataModel instanceof SDKError) {
 *   console.log(myDataModel.message);
 * } else {
 *   myDataModel.build();
 * }
 * ````
 *
 * <br>
 *
 * ## Creating a DataModel using Builder Methods
 *
 * In our second example, we'll create our {@link DataModel | DataModel} again, this time instantiating
 * each {@link PropertySet | PropertySet}, {@link Property}, {@link DataObject | DataObject}
 * and {@link Relationship | Relationship} individually, using the
 * {@link DataModel | DataModel's} builder methods.
 *
 * ````javascript
 * import {SDKError} from "@xeokit/sdk/core";
 * import {Data, searchObjects} from "@xeokit/sdk/data";
 * import * as basicTypes from "@xeokit/sdk/basictypes/basicTypes";
 *
 * const data = new Data();
 *
 * const dataModel = data.createModel({ // DataModel | SDKError
 *     id: "myTableModel"
 * });
 *
 * if (dataModel instanceof SDKError) {
 *      console.log(dataModel.message);
 *
 * } else {
 *
 *      const tablePropertySet = dataModel.createPropertySet({ // PropertySet | SDKError
 *          id: "tablePropertySet",
 *          name: "Table properties",
 *          type: "",
 *          properties: [ // Property[]
 *              {
 *                  name: "Weight",
 *                  value: 5,
 *                  type: "",
 *                  valueType: "",
 *                  description: "Weight of the thing"
 *              },
 *              {
 *                  name: "Height",
 *                  value: 12,
 *                  type: "",
 *                  valueType: "",
 *                  description: "Height of the thing"
 *              }
 *          ]
 *      });
 *
 *      if (tablePropertySet instanceof SDKError) {
 *          console.log(tablePropertySet.message);
 *      }
 *
 *      const legPropertySet = dataModel.createPropertySet({
 *          id: "legPropertySet",
 *          name: "Table leg properties",
 *          type: "",
 *          properties: [
 *              {
 *                  name: "Weight",
 *                  value: 5,
 *                  type: "",
 *                  valueType: "",
 *                  description: "Weight of the thing"
 *              },
 *              {
 *                  name: "Height",
 *                  value: 12,
 *                  type: "",
 *                  valueType: "",
 *                  description: "Height of the thing"
 *              }
 *          ]
 *      });
 *
 *      const myTableObject = dataModel.createObject({ // DataObject | SDKError
 *          id: "table",
 *          type:  basicTypes.BasicEntity,
 *          name: "Table",
 *          propertySetIds: ["tablePropertySet"]
 *      });
 *
 *      if (myTableObject instanceof SDKError) {
 *          console.log(myTableObject.message);
 *      }
 *
 *      dataModel.createObject({
 *          id: "redLeg",
 *          name: "Red table Leg",
 *          type:  basicTypes.BasicEntity,
 *          propertySetIds: ["tableLegPropertySet"]
 *      });
 *
 *      dataModel.createObject({
 *          id: "greenLeg",
 *          name: "Green table leg",
 *          type:  basicTypes.BasicEntity,
 *          propertySetIds: ["tableLegPropertySet"]
 *      });
 *
 *      dataModel.createObject({
 *          id: "blueLeg",
 *          name: "Blue table leg",
 *          type:  basicTypes.BasicEntity,
 *          propertySetIds: ["tableLegPropertySet"]
 *      });
 *
 *      dataModel.createObject({
 *          id: "yellowLeg",
 *          name: "Yellow table leg",
 *          type: "leg",
 *          propertySetIds: ["tableLegPropertySet"]
 *      });
 *
 *      dataModel.createObject({
 *          id: "tableTop",
 *          name: "Purple table top",
 *          type:  basicTypes.BasicEntity,
 *          propertySetIds: ["tableTopPropertySet"]
 *      });
 *
 *      const myRelationship = dataModel.createRelationship({
 *          type: basicTypes.BasicAggregation,
 *          relatingObjectId: "table",
 *          relatedObjectId: "tableTop"
 *      });
 *
 *      if (myRelationship instanceof SDKError) {
 *              console.log(myRelationship.message);
 *      }
 *
 *      dataModel.createRelationship({
 *          type: basicTypes.BasicAggregation,
 *          relatingObjectId: "tableTop",
 *          relatedObjectId: "redLeg"
 *      });
 *
 *      dataModel.createRelationship({
 *          type: basicTypes.BasicAggregation,
 *          relatingObjectId: "tableTop",
 *          relatedObjectId: "greenLeg"
 *      });
 *
 *      dataModel.createRelationship({
 *          type: basicTypes.BasicAggregation,
 *          relatingObjectId: "tableTop",
 *          relatedObjectId: "blueLeg"
 *      });
 *
 *      dataModel.createRelationship({
 *          type: basicTypes.BasicAggregation,
 *          relatingObjectId: "tableTop",
 *          relatedObjectId: "yellowLeg"
 *      });
 *
 *      dataModel.build()
 *          .then(()=>{
 *              // Ready for action
 *          })
 *          .catch((sdkError) => {
 *              console.error(sdkError.message);
 *          });
 * }
 * ````
 *
 * <br>
 *
 * ## Reading DataObjects
 *
 * With our {@link DataModel | DataModel} built, we'll now use the {@link searchObjects | searchObjects} method to
 * traverse it to fetch the IDs of the {@link DataObject | DataObjects} we find on that path.
 *
 * One example of where we use this method is to query the aggregation hierarchy of the DataObjects for building
 * a tree view of an IFC element hierarchy.
 *
 * ````javascript
 * const resultObjectIds = [];
 *
 * searchObjects(data, {
 *     startObjectId: "table",
 *     includeObjects: [basicTypes.BasicEntity],
 *     includeRelated: [basicTypes.BasicAggregation],
 *     resultObjectIds
 * });
 *
 * // resultObjectIds == ["table", "tableTop", "redLeg", "greenLeg", "blueLeg", "yellowLeg"];
 * ````
 *
 * <br>
 *
 * ## Searching DataObjects
 *
 * In our next example, we'll demonstrate how to traverse the {@link DataObject | DataObjects} along their
 * {@link Relationship | Relationships}. We'll start at the root DataObject and visit all the DataObjects
 * we encounter along the outgoing Relationships.
 *
 * ````javascript
 * const table = data.objects["table"];
 *
 * const relations = table.related[basicTypes.BasicAggregation];
 *
 * for (let i = 0, len = relations.length; i < len; i++) {
 *
 *      const relation = relations[i];
 *      const dataObject = relation.related;
 *
 *      //..
 * }
 * ````
 *
 * <br>
 *
 * ## Serializing a DataModel to JSON
 *
 * ````javascript
 *  const dataModelParams = dataModel.toParams();
 * ````
 *
 * <br>
 *
 * ## Deserializing a DataModel from JSON
 *
 * ````javascript
 * const dataModel2 = sce.createDataModel({
 *     id: "myDataModel2"
 * });
 *
 * dataModel2.fromParams(dataModelParams);
 *
 * dataModel2.build();
 * ````
 *
 * <br>
 *
 * ## Destroying a DataModel
 *
 * ````javascript
 *  dataModel2.destroy();
 * ````
 *
 * ## Loading a DataModel from a File
 *
 * We can also import {@link DataModel | DataModels} from several file formats.
 *
 * For example, let's use {@link dotbim!loadDotBIM | loadDotBIM} to load a .BIM file into a new {@link scene!SceneModel | SceneModel} and DataModel:
 *
 * ````javascript
 * const sceneModel3 = scene.createModel({
 *     id: "myModel3"
 * });
 *
 * const dataModel3 = data.createModel({
 *     id: "myModel3"
 * });
 *
 * fetch("model.json").then(response => {
 *
 *     response.json().then(fileData => {
 *
 *         loadDotBIM({
 *             fileData,
 *             sceneModel3,
 *             dataModel3
 *         }).then(() => {
 *
 *             sceneModel3.build();
 *             dataModel3.build();
 *
 *         }).catch(err => {
 *
 *             sceneModel3.destroy();
 *             dataModel3.destroy();
 *
 *             console.error(`Error loading CityJSON: ${err}`);
 *         });
 *
 *     }).catch(err => {
 *         console.error(`Error creating JSON from fetch response: ${err}`);
 *     });
 *
 * }).catch(err => {
 *     console.error(`Error fetching CityJSON file: ${err}`);
 * });
 * ````
 *
 * @module data
 */
export * from "./Data";
export * from "./DataModel";
export * from "./DataObject";
export * from "./Relationship";
export * from "./RelationshipParams";
export * from "./Property";
export * from "./PropertySet";
export * from "./DataModelParams";
export * from "./DataModelContentParams";
export * from "./DataObjectParams";
export * from "./PropertyParams";
export * from "./PropertySetParams";
export * from "./SearchParams";
export * from "./searchObjects";
export * from "./loadDataModel";
