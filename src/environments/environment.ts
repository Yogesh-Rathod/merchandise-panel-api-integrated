// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  api_url: 'http://192.168.250.224:8080',
  crm_url: 'http://192.168.250.222:9081/crm',
  crm: {
    itemsPerPage: 5,
  },
};
