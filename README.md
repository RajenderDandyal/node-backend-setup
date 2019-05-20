## Main concepts for ssr react
 * bundle.js :- separate js bundle for client and server. Because We may have api keys in server we dont want to expose them. Also server bundle.js is heavier than client as it include server logic. And react-router, redux, axios have different method to run on server and client browser. 
  * client entry: src/client/client.js -- bundle.js in public folder by webpack
  * server entry: src/index.js -- bundle.js in build folder by webpack
  * React-router: different routing setup for client and server.
 * BrowserRouter -- for client bundle -- client.js
 * StaticRouter - for server bundle -- src/helper/renderer.js
 * Redux-store: different setup for client and server
 * Client-store -- included in bundle.js --- client.js
 * Server-store -- included in server bundle.js -- helper/createStore.js
 * Axios: Instances are different for server and client -- 
 * Client axiosInstance -- base url-- /api client.js
 * Server axiosInstance -- base url-- /your-backend-api.com createStore.js
 
 ## How loaddata function works
 * To fetch data before render on server -- use loadData function, It takes store argument from index.js when ever a request comes. Then It dispatch action(same actions are used both on server and client side). After load data is complete then page will render on server and send response to client.
 * Now before rendering page on server we add the store on html- script tag on window.INITIAL_STATE. From this we will update our store on client side. To match the store and html of both sides.
 ## StaticRouter
 * for server side only.
 * It passes a staticContext prop to every component to update the context object passed to it.
 *  staticContext.notFound = true; is set inside NotFoundPage and then in index.js we checked this context again to redirect or set status code 404.
 * when ever we use <Redirect to="" /> this dosent work on server. Instead StaticRouter creates a property(url: redirect to path) in context object, which we check inside index.js to redirect the user to context.url path.
 
 ## hoc requireAuth(Component) src/client/components/hocs/requireAuth.js
* This hoc checks the auth state inside store and reply corespondingly as per auth state.
* Used for protected routes on both client and server.

## Auth with cookies
* Simple token auth dont work with ssr. Because if user first time asks for protected route, by entering url in browser. Then there is no way we can add token to browser url request.
* Authentication of all the request from client both, initial page load request and followup ajax request are done with cookies.
* Cookies workes on per domain basis, the domain which issue cookie.
* Initial page load request on protected route:-- Browser will attach the cookie to request. On server with separate instance of axios for server we detach that cookie from req and attach to axios instance for server. With base url to backend api.
* base url for server is "your-backend-api.com" and for alient is '/api' means the render server.
* Then we pass that axios instance(diff for client and server) to thunk using thunk.withExtraArgument(axiosInstance), then inside every action we make request with this instance('/api' for client, "your-backend-api.com" for server) to backend api to get protected resources. Hence our initial page load request succeed.
* Followup requests from Browser:-- all the ajax request from client inside actions are made to render server not to backend api serer.
* On actions we are making request to /api (client side), which are then proxied to backend api on render server.

## index.js
* entry point for server side code
* app.get("*") send all routes to react-router.
* all other concepts are explained inside index.js line by line
 
 


