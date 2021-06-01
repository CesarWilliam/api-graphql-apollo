const { mergeTypeDefs } = require('@graphql-tools/merge');
const { loadFilesSync } = require('@graphql-tools/load-files');
const path = require('path');

const typesArray = loadFilesSync(path.join(__dirname, 'modules', '**', '*.gql'));
const typeDefs = mergeTypeDefs(typesArray);

module.exports = typeDefs;