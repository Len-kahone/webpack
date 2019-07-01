import "./css/index.css"
import "./less/index.less"
import "./scss/index.scss"
import "bootstrap/dist/css/bootstrap.css"
import bb from "./b"

import axios from  "axios"

axios.get("/api/getUserInfo").then(res=>console.log(res))