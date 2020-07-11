import axios from 'axios'
const server = function (config, data) {
  axios.defaults.baseURL = config.baseUrl
  axios.defaults.headers.common.Authorization = config.token
  let server = {}
  server = setBaseServerMethod(server)
  const paths = data.paths
  Object.entries(paths).forEach(([pathKey, pathValue]) => {
    Object.entries(pathValue).forEach(([method, methodValue]) => {
      const parameters = pathValue[method].parameters ? pathValue[method].parameters : []
      const pathParameters = parameters.filter(param => param.in === 'path')
      const queryParameters = parameters.filter(param => param.in === 'query')
      let dataModel = null
      if (methodValue.requestBody) {
        const schema =
          methodValue.requestBody.content['text/json'].schema.$ref
        dataModel = retrieveDataModel(schema, data)
      }
      const methodName = generateMethodName(methodValue, pathKey, method)
      server[methodName] = function (payload) {
        const query = this.generateQueryModel(queryParameters, payload)
        const data = this.generateDataModel(dataModel, payload)
        const currentPath = this.generateUrl(pathKey, pathParameters, payload)
        return axios.request({
          url: currentPath,
          method: method,
          data: data,
          params: query
        })
      }
    })
  })
  return server
}
const setBaseServerMethod = function (server) {
  server.generateQueryModel = function generateQueryModel (queryParameters, payload) {
    const query = {}
    queryParameters.forEach(pathQuery => {
      query[pathQuery.name] = payload[pathQuery.name]
      delete payload[pathQuery.name]
    })
    return query
  }
  server.generateDataModel = function generateDataModel (dataDto, payload) {
    const dataModel = {}
    dataDto && Object.keys(dataDto).forEach(property => {
      dataModel[property] = payload[property]
      delete payload[property]
    })
    return dataModel
  }
  server.generateUrl = function generateUrl (path, pathParameters, payload) {
    let currentPath = path
    pathParameters.forEach(pathParam => {
      currentPath = currentPath.replace(`{${pathParam.name}}`, payload[pathParam.name])
      delete payload[pathParam.name]
    })
    return currentPath
  }
  return server
}
const retrieveDataModel = function (schema, result) {
  const path = schema.slice(2)
  const validPath = path.replace(/\//g, '.')
  const data = getNestedJsonValue(result, validPath)
  return data.properties
}
const generateMethodName = function (methodValue, currentPath, method) {
  const operationId = methodValue.operationId
  let methodName = null
  if (operationId) {
    methodName = operationId
  } else {
    const tagName = capitalizeFirstLetter(methodValue.tags[0])
    const pathNameArray = currentPath.slice(1).split('/')
    let validPathName = ''
    pathNameArray.forEach((pathName, index) => {
      const name = pathName.replace('{', '').replace('}', '')
      validPathName += capitalizeFirstLetter(name)
    })
    methodName = method.toLowerCase() + tagName + validPathName
  }
  return methodName
}
const capitalizeFirstLetter = function (name) {
  const capitalizedFirstLetterName = name.charAt(0).toUpperCase() +
  name.slice(1).toLowerCase()
  return capitalizedFirstLetterName
}
const getNestedJsonValue = function (result, path) {
  const parts = path.split('.')
  if (parts.length > 1) {
    return getNestedJsonValue(result[parts[0]], parts.splice(1).join('.'))
  } else {
    return result[parts[0]]
  }
}
export default server
