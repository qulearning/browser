// game filters removed — Games page was removed so derived filters are unnecessary

export const CONFIG = {
  bUrl: '/seal/',
  ws: `${location.protocol === 'https:' ? 'wss:' : 'ws:'}//${location.host}/wisp/`,
  transport: '/libcurl/index.mjs',
  baremod: '/baremod/index.mjs',
  unsupported: [],
  filter: [
    { url: 'neal.fun', type: 'scr' },
    { url: 'geforcenow.com', type: 'scr' },
    { url: 'spotify.com', type: 'scr' },
  ],
};
