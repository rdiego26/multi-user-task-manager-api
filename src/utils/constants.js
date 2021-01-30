/**
 * Object with configurations
 * @type {{db: {host: (*|string), username: (*|string), password: (*|string), database: (*|string), port: (*|number)}, app: {name: string, limitItemsPerPage: (*|number), defaultPagePagination: number}, humio: {ingestToken: *, dataSpaceId: (*|string)}, server: {port: number}}}
 */
const constants = {

  db: {
    host: process.env.DB_HOST || 'postgres',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'db',
    port: process.env.DB_PORT || 5432,
  },

  app: {
    name: 'Task Manager API',
    limitItemsPerPage: process.env.LIMIT_ITEMS_PER_PAGE || 30,
    defaultPagePagination: 0,
  },

  humio: {
    ingestToken: process.env.HUMIO_INGEST_TOKEN,
    dataSpaceId: process.env.HUMIO_DATASPACE_ID || 'sandbox'
  },

  server: {
    port: 3000,
  },

};

module.exports = constants;
