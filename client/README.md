# LMS Frontend

### Setup instruction

1. Clone the project

```
   git clone https://github.com/RudrakshaSingh/pwLearningManagementSystem-LMS.git
```

2. Move into the directory

```client

```

3. install dependencies

```
    npm i
```

4. run the server

```
    npm run dev
```

### Setup instructions for tailwind

[Tail wind official instruction doc](https://tailwindcss.com/docs/installation)

1. Install tailwindcss

```
    npm install -D tailwindcss postcss autoprefixer
```

2. Create tailwind config file

```
    npx tailwindcss init
```

3. Add file extensions to tailwind config file in the contents property

```
    "./src/**/*.{html,js,jsx,ts,tsx}", "./index.html",

```

4. Add the tailwind directives at the top of the `index.css` file

```
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
```

5. Add the following details in the plugin property of tainwind config

```
    [require("daisyui"), require("@tailwindcss/line-clamp")]
```

### Adding plugins and dependencies

```
npm install @reduxjs/toolkit react-redux react-router-dom react-icons react-chartjs-2 chart.js daisyui axi
os react-hot-toast @tailwindcss/line-clamp
```

### Configure auto import sort esline

1. Install simple import sore

```
    npm i -D eslint-plugin-simple-import-sort
```

2. Add rule in `.eslint.cjs`

```
    'simple-import-sort/imports': 'error'
```

3. add simple-import sort plugin in `.eslint.cjs`

```
    plugins: [..., 'simple-import-sort']
```

4. add rule

```
rules: {
        "simple-import-sort/imports": "error",
}
```

5. To enable auto import sort on file save in vscode

    - Open `settings.json`
    - add the following config

```
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    }
```

### Redux toolkit

folder Redux -> folder Slices -file authSlice.js - file store.js

==store.js
configurestore
reducer
devtools for production

const store = configureStore({
reducer: {
auth: authSliceReducer,
},
devTools: true,
});

app.jsx make provider component from react-redux give store to provider

==authSlice.js -for authentication
createSlice({name:
initialstate,
reducers
})
initial state

### Axios instance

for dedicated axios instance to make same configuration for all requests

axiosInstance.js

```
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;
//you can google axios instance defaults

export default axiosInstance;
```
