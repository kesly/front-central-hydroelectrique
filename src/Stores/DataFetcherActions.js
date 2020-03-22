import { TURBINES_COMMON_PROPERTIES } from "./GraphActions";

export const ADD_HYDRAULIC_TO_FETCHER = "ADD_HYDRAULIC_TO_FETCHER";
export const ADD_TURBINE_TO_FETCHER = "ADD_TURBINE_TO_FETCHER";
export const ADD_ATTRIBUTE_TO_FETCHER = "ADD_ATTRIBUTE_TO_FETCHER";

export const DEL_HYDRAULIC_FROM_FETCHER = "DEL_HYDRAULIC_FROM_FETCHER";
export const DEL_TURBINE_FROM_FETCHER = "DEL_TURBINE_FROM_FETCHER";
export const DEL_ATTRIBUTE_FROM_FETCHER = "DEL_ATTRIBUTE_FROM_FETCHER";

export const addHydraulic = (type, hydraulicID, turbineID) => ({
  type,
  hydraulicID,
  turbineID
});

export const addTurbine = (type, hydraulicID, turbineID) => ({
  type,
  hydraulicID,
  turbineID
});

export const addAttribute = (type, hydraulicID, turbineID, attribute) => ({
  type,
  hydraulicID,
  turbineID,
  attribute
});

export const delHydraulic = (hydraulicID) => ({
  type: DEL_HYDRAULIC_FROM_FETCHER,
  hydraulicID
});

export const delTurbine = (hydraulicID, turbineID) => ({
  type: DEL_TURBINE_FROM_FETCHER,
  hydraulicID,
  turbineID
});

export const delAttribute = (hydraulicID, turbineID, attribute) => ({
  type: DEL_ATTRIBUTE_FROM_FETCHER,
  hydraulicID,
  turbineID,
  attribute
});

export function addGraphToDataAndFetcher(types, obj, hydraulicID, turbineID, attribute1, attribute2 = null) {
  return (dispatch) => {
    let turbineIDForAttributes = {
      attribute1: (TURBINES_COMMON_PROPERTIES.includes(attribute1) ? "all" : turbineID),
      attribute2: (TURBINES_COMMON_PROPERTIES.includes(attribute2) ? "all" : turbineID)
    }

    // Si la centrale existe
    if (obj.hasOwnProperty(hydraulicID)) {
      // Si les turbines existent
      if (obj[hydraulicID].hasOwnProperty(turbineIDForAttributes.attribute1) && (!attribute2 || obj[hydraulicID].hasOwnProperty(turbineIDForAttributes.attribute2))) {
        // Si l'attribut attribute1 n'existe pas
        if ((!Array.isArray(obj[hydraulicID][turbineIDForAttributes.attribute1]) && !obj[hydraulicID][turbineIDForAttributes.attribute1].hasOwnProperty(attribute1)) || (Array.isArray(obj[hydraulicID][turbineIDForAttributes.attribute1]) && !obj[hydraulicID][turbineIDForAttributes.attribute1].includes(attribute1))) {
          // Ajouter l'attribut attribute1
          dispatch(addAttribute(types.addAttribute, hydraulicID, turbineIDForAttributes.attribute1, attribute1));
        }
        // Si l'attribut attribute2 n'existe pas et n'est pas nul
        if (attribute2 && ((!Array.isArray(obj[hydraulicID][turbineIDForAttributes.attribute2]) && !obj[hydraulicID][turbineIDForAttributes.attribute2].hasOwnProperty(attribute2)) || (Array.isArray(obj[hydraulicID][turbineIDForAttributes.attribute2]) && !obj[hydraulicID][turbineIDForAttributes.attribute2].includes(attribute2)))) {
          // Ajouter l'attribut attribute2
          dispatch(addAttribute(types.addAttribute, hydraulicID, turbineIDForAttributes.attribute2, attribute2));
        }
      }

      // Si au moins une turbine n'existe pas
      else {
        // Si la turbine de l'attribut attribute1 n'existe pas
        if (!obj[hydraulicID].hasOwnProperty(turbineIDForAttributes.attribute1)) {
          // Ajouter la turbine de l'attribut attribute1
          dispatch(addTurbine(types.addTurbine, hydraulicID, turbineIDForAttributes.attribute1));
        }
        // Si l'attribut attribute2 n'est pas nul et que sa turbine n'existe pas
        if (attribute2 && !obj[hydraulicID].hasOwnProperty(turbineIDForAttributes.attribute2)) {
          // Ajouter la turbine de l'attribut attribute2
          dispatch(addTurbine(types.addTurbine, hydraulicID, turbineIDForAttributes.attribute2));
        }
        // Ajouter l'attribut attribute1
        dispatch(addAttribute(types.addAttribute, hydraulicID, turbineIDForAttributes.attribute1, attribute1));
        // Ajouter l'attribut attribute2 s'il n'est pas nul
        if (attribute2) {
          dispatch(addAttribute(types.addAttribute, hydraulicID, turbineIDForAttributes.attribute2, attribute2));
        }
      }
    }

    // Si la centrale n'existe pas
    else {
      // Ajouter la centrale avec la turbine de l'attribut attribute1
      dispatch(addHydraulic(types.addHydraulic, hydraulicID, turbineIDForAttributes.attribute1));
      // Si l'attribut attribute2 n'a pas la même turbine que l'attribut attribute1 et n'est pas nul
      if (attribute2 && turbineIDForAttributes.attribute1 !== turbineIDForAttributes.attribute2) {
        // Ajouter la turbine de l'attribut attribute2
        dispatch(addTurbine(types.addTurbine, hydraulicID, turbineIDForAttributes.attribute2));
      }
      // Ajouter l'attribut attribute1
      dispatch(addAttribute(types.addAttribute, hydraulicID, turbineIDForAttributes.attribute1, attribute1));
      // Ajouter l'attribut attribute2 s'il n'est pas nul
      if (attribute2) {
        dispatch(addAttribute(types.addAttribute, hydraulicID, turbineIDForAttributes.attribute2, attribute2));
      }
    }
  };
}

export function delGraphFromFetcher(graphs, dataFetcher, hydraulicID, turbineID, attribute1, attribute2 = null) {
  return (dispatch) => {
    let dataInOtherGraphs = [];
    let thisGraphParameters = {
      turbineID,
      attribute1
    }

    if (attribute2) {
      thisGraphParameters.attribute2 = attribute2;
    }

    // Si les attributs sont des attributs paratgés
    if (TURBINES_COMMON_PROPERTIES.includes(attribute1) && (!attribute2 || TURBINES_COMMON_PROPERTIES.includes(attribute2))) {
      // Regarder si ces attributs sont utilisés dans d'autres graphs de la centrale
      Object.values(graphs[hydraulicID]).forEach((graphParameters, index) => {
        let graphParametersAttributesArray = [
          graphParameters.attribute1,
          graphParameters.attribute2
        ];

        // S'il ne s'agit pas du graphique actuel
        if (!ObjectAreEquals(graphParameters, thisGraphParameters)) {
          // Regarder l'attribut attribute1
          if (!dataInOtherGraphs.includes(attribute1) && graphParametersAttributesArray.includes(attribute1)) {
            dataInOtherGraphs.push(attribute1);
          }
          // Regarder l'attribut attribute2
          if (!dataInOtherGraphs.includes(attribute2) && graphParametersAttributesArray.includes(attribute2)) {
            dataInOtherGraphs.push(attribute2);
          }
        }
      });

      // Si ces attributs sont les seuls dans les attributs partagés et s'ils ne sont pas utilisés dans d'autres graphs de la centrale
      if ((dataFetcher[hydraulicID].all.length === 1 || (attribute2 && dataFetcher[hydraulicID].all.length === 2)) && !dataInOtherGraphs.length) {
        // Si la turbine est la seule dans la centrale
        if (Object.keys(dataFetcher[hydraulicID]).length === 1) {
          // Supprimer la centrale
          dispatch(delHydraulic(hydraulicID));
        // Si la turbine n'est pas la seule dans la centrale
        } else {
          // Supprimer la turbine
          dispatch(delTurbine(hydraulicID, "all"));
        }
      // Si ces attributs ne sont pas les seuls dans les attributs partagés
      } else {
        // Si l'attribut attribute1 n'est pas utilisé dans un autre graph de la centrale
        if (!dataInOtherGraphs.includes(attribute1)) {
          // Supprimer l'attribut partagé attribute1
          dispatch(delAttribute(hydraulicID, "all", attribute1));
        }
        // Si l'attribut attribute2 n'est pas utilisé dans un autre graph de la centrale et s'il existe
        if (attribute2 && !dataInOtherGraphs.includes(attribute2)) {
          // Supprimer l'attribut partagé attribute2
          dispatch(delAttribute(hydraulicID, "all", attribute2));
        }
      }
    }

    // Si les attributs sont des attributs non partagés
    else if (!TURBINES_COMMON_PROPERTIES.includes(attribute1) && (!attribute2 || !TURBINES_COMMON_PROPERTIES.includes(attribute2))) {
      // Regarder si ces attributs sont utilisés dans d'autres graphs de la turbine
      Object.values(graphs[hydraulicID]).forEach((graphParameters, index) => {
        // Si la turbine concernée est la même et qu'il ne s'agit pas du graphique actuel
        if (turbineID === graphParameters.turbineID && !ObjectAreEquals(graphParameters, thisGraphParameters)) {
          let graphParametersAttributesArray = [
            graphParameters.attribute1,
            graphParameters.attribute2
          ];

          // Regarder l'attribut attribute1
          if (!dataInOtherGraphs.includes(attribute1) && graphParametersAttributesArray.includes(attribute1)) {
            dataInOtherGraphs.push(attribute1);
          }
          // Regarder l'attribut attribute2
          if (!dataInOtherGraphs.includes(attribute2) && graphParametersAttributesArray.includes(attribute2)) {
            dataInOtherGraphs.push(attribute2);
          }
        }
      });

      // Si ces attributs sont les seuls dans les attributs non partagés et s'ils ne sont pas utilisés dans d'autres graphs de la turbine
      if ((dataFetcher[hydraulicID][turbineID].length === 1 || (attribute2 && dataFetcher[hydraulicID][turbineID].length === 2)) && !dataInOtherGraphs.length) {
          // Si la turbine est la seule dans la centrale
          if (Object.keys(dataFetcher[hydraulicID]).length === 1) {
            // Supprimer la centrale
            dispatch(delHydraulic(hydraulicID));
          // Si la turbine n'est pas la seule dans la centrale
          } else {
            // Supprimer la turbine
            dispatch(delTurbine(hydraulicID, turbineID));
          }
      // Si ces attributs ne sont pas les seuls dans les attributs partagés
      } else {
        // Si l'attribut attribute1 n'est pas utilisé dans un autre graph de la centrale
        if (!dataInOtherGraphs.includes(attribute1)) {
          // Supprimer l'attribut non partagé attribute1
          dispatch(delAttribute(hydraulicID, turbineID, attribute1));
        }
        // Si l'attribut attribute2 n'est pas utilisé dans un autre graph de la centrale et s'il existe
        if (attribute2 && !dataInOtherGraphs.includes(attribute2)) {
          // Supprimer l'attribut non partagé attribute2
          dispatch(delAttribute(hydraulicID, turbineID, attribute2));
        }
      }
    }

    // Si un des attributs est un attribut partagé et l'autre non
    else {
      // Regarder si ces attributs sont utilisés dans d'autres graphs de la centrale pour l'attribut partagé ou de la turbine pour l'attribut non partagé
      Object.values(graphs[hydraulicID]).forEach((graphParameters, index) => {
        // Si la turbine concernée est la même
        let graphParametersAttributesArray = [
          graphParameters.attribute1,
          graphParameters.attribute2
        ];

        // S'il ne s'agit pas du graphique actuel
        if (!ObjectAreEquals(graphParameters, thisGraphParameters)) {
          // Regarder l'attribut attribute1
          if (!dataInOtherGraphs.includes(attribute1) && graphParametersAttributesArray.includes(attribute1)) {
            // Si l'attribut attribute1 est partagé ou s'il est dans la bonne turbine
            if (turbineID === graphParameters.turbineID || TURBINES_COMMON_PROPERTIES.includes(attribute1)) {
              dataInOtherGraphs.push(attribute1);
            }
          }
          // Regarder l'attribut attribute2
          if (!dataInOtherGraphs.includes(attribute2) && graphParametersAttributesArray.includes(attribute2)) {
            // Si l'attribut attribute2 est partagé ou s'il est dans la bonne turbine
            if (turbineID === graphParameters.turbineID || TURBINES_COMMON_PROPERTIES.includes(attribute1)) {
              dataInOtherGraphs.push(attribute2);
            }
          }
        }
      });

      // Si ces attributs sont les seuls dans les attributs paratgés et non partagés et s'ils ne sont pas utilisés dans d'autres graphs de la centrale pour l'attribut partagé ou de la turbine pour l'attribut non partagé
      if ((dataFetcher[hydraulicID].all.length + dataFetcher[hydraulicID][turbineID].length === 1 || (attribute2 && dataFetcher[hydraulicID].all.length + dataFetcher[hydraulicID][turbineID].length === 2)) && !dataInOtherGraphs.length) {
        // Si la turbine est seule
        if (Object.keys(dataFetcher[hydraulicID]).length === 2) {
          // Supprimer la centrale
          dispatch(delHydraulic(hydraulicID));
        // Si la turbine n'est pas la seule dans la centrale
        } else {
          // Supprimer la turbine
          dispatch(delTurbine(hydraulicID, turbineID));
        }
      // Si ces attributs ne sont pas les seuls dans les attributs partagés
      } else {
        // Si attribute1 est un attribut paratgé
        if (TURBINES_COMMON_PROPERTIES.includes(attribute1)) {
          // Supprimer l'attribut partagé attribute1
          dispatch(delAttribute(hydraulicID, "all", attribute1));
          // Supprimer l'attribut non partagé attribute2 s'il n'est pas nul
          if (attribute2) {
            dispatch(delAttribute(hydraulicID, turbineID, attribute2));
          }
        // Si attribute1 n'est pas un attribut paratgé
        } else {
          // Si l'attribut attribute1 n'est pas utilisé dans un autre graph de la centrale
          if (!dataInOtherGraphs.includes(attribute1)) {
            // Supprimer l'attribut non partagé attribute1
            dispatch(delAttribute(hydraulicID, turbineID, attribute1));
          }
          // Si l'attribut attribute2 n'est pas utilisé dans un autre graph de la centrale et s'il existe
          if (attribute2 && !dataInOtherGraphs.includes(attribute2)) {
            // Supprimer l'attribut partagé attribute2
            dispatch(delAttribute(hydraulicID, "all", attribute2));
          }
        }
      }
    }
  };
}

function ObjectAreEquals(obj1, obj2) {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }

  for (const [property, value] of Object.entries(obj1)) {
    if (!obj2.hasOwnProperty(property)) {
      return false;
    }

    if (value !== obj2[property]) {
      return false;
    }
  }

  return true;
}
