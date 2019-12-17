 import { Location } from '@angular/common';

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

 //获取浏览框中的服务器地址
 export function extractHostname(url: string): string {
    var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
    if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
      return match[2];
    }
    return ""
}

var domain_name = extractHostname(location.toLocaleString());

export const environment = {
  production: false,
  api_url: 'http://'+ domain_name +':8088/api',
  scratch_url:'http://'+domain_name+':8601'
};
