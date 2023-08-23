import { backEndDomain } from '../apiserver'
import axios from "axios";
const jwt = localStorage.getItem('UserToken')
const TenantId = localStorage.getItem('TenantId');


export const fileHandleing = async (data) => {
    try {
        let config = {
            method: 'post',
            url: `http://15.207.50.230:3000/webapi/sourcing/fileHandleing`,
            data: data,
            headers: {
                'Accept': 'application/json',
                'token': jwt,
                'Content-Type': 'multipart/form-data',
            },
        }
        let res = await axios(config);
        console.log('ds', res)

        return res.data
    } catch (err) {
        console.error(err)
    }
}
export const statuschange = async (data) => {
    try {
        let config = {
            method: 'put',
            url: `https://${backEndDomain}/webapi/webAISourceData/statuschange`,
            data: data,
            headers: {
                'Accept': 'application/json',
                'token': jwt,
                'Content-Type': 'application/json',
            },
        }
        let res = await axios(config);
        console.log('ds', res)

        return res.data
    } catch (err) {
        console.error(err)
    }
}

export const Deletefiles = async (data) => {
    try {
        let config = {
            method: 'delete',
            url: `http://15.207.50.230:3000/webapi/sourcing/filedelete`,
            data: data,
            headers: {
                'Accept': 'application/json',
                'token': jwt,
            },
        }
        let res = await axios(config);
        console.log('ds', res)

        return res.data
    } catch (err) {
        console.error(err)
    }
}

export const aiDataTable = async (type) => {
    try {
        let config = {
            method: 'get',
            url: `https://${backEndDomain}/webapi/webAISourceData/viewInputList?tenantId=${TenantId}&type=${type} `,  //http://15.207.50.230:3001/webapi/webAISourceData/viewInputList?tenantId=GAINWELL_01
            headers: {
                'Content-type': 'application/json',
                'token': jwt
            }
        }
        let res = await axios(config)

        return res.data
    } catch (err) {
        console.error(err)
    }
}

export const declineReasons = async (id) => {
    try {
        let config = {
            method: 'get',
            url: `https://${backEndDomain}/webapi/webAISourceData/reason?tenantId=${TenantId}`,  //http://15.207.50.230:3001/webapi/webAISourceData/reason?tenantId=GAINWELL_01
            headers: {
                'Content-type': 'application/json',
                'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiJVU0VSMDMwIiwiVXNlck5hbWUiOiJqZXkiLCJFbWFpbCI6ImpleTRAZ21haWwuY29tIiwiUHJpbWF5TnVtYmVyIjoiOTg3OTg3NTY2MiIsIlR5cGUiOiJVc2VyIiwiaWF0IjoxNjcyNzQyMTgxfQ.JoooP6oxx2xKgeR97rZ-1kMO0aRzqZT01dAsrHV5AC8'
            }
        }
        if (id) {
            let url = config.url + '&sourceId=' + id
            config.url = url
        }
        let res = await axios(config);
        return res.data
    } catch (err) {
        console.error(err)
    }
}

export const decline = async (data) => {
    try {
        let config = {
            method: 'post',
            url: `https://${backEndDomain}/webapi/webAISourceData/decline `,  //http://15.207.50.230:3001/webapi/webAISourceData/decline
            headers: {
                'Content-type': 'application/json',
                'token': jwt
            },
            data: data
        }
        let res = await axios(config);
        return res.data
    } catch (err) {
        console.error(err);
    }
}

export const filterNonIOTInput = async (data) => {
    try {
        let config = {
            method: 'post',
            url: `https://${backEndDomain}/webapi/webAISourceData/filterNonIOTInput `,  //http://15.207.50.230:3001/webapi/webAISourceData/filterNonIOTInput
            headers: {
                'Content-type': 'application/json',
                'token': jwt
            },
            data: data
        }
        let res = await axios(config);
        return res.data
    } catch (err) {
        console.error(err);
    }
}

export const filterIOTInput = async (data) => {
    try {
        let config = {
            method: 'post',
            url: `https://${backEndDomain}/webapi/webAISourceData/filterIOTInput `,  //http://15.207.50.230:3001/webapi/webAISourceData/filterIOTInput
            headers: {
                'Content-type': 'application/json',
                'token': jwt
            },
            data: data
        }
        let res = await axios(config);
        return res.data
    } catch (err) {
        console.error(err);
    }
}

export const approve = async (data) => {
    try {
        let config = {
            method: 'put',
            url: `https://${backEndDomain}/webapi/webAISourceData/StatusApproved `,  //http://15.207.50.230:3001/webapi/webAISourceData/approve
            headers: {
                'Content-type': 'application/json',
                'token': jwt
            },
            data: data
        }
        let res = await axios(config);
        return res.data
    } catch (err) {
        console.error(err);
    }
}

export const getCode = async (id) => {
    try {
        let config = {
            method: "get",
            url: `https://${backEndDomain}/webapi/webAISourceData/viewcodedata?sourceId=${id}`, //http://15.207.50.230:3001/webapi/webAISourceData/addBomdata
            headers: {
                "Content-type": "application/json",
                token: jwt,
            },
        };
        let res = await axios(config);

        return res.data;
    } catch (err) {
        console.error(err);
    }
};

export const createNonIotData = async (data) => {
    try {
        let config = {
            method: 'post',
            url: `https://${backEndDomain}/webapi/webAISourceData/NonIOTInput `,  //http://15.207.50.230:3001/webapi/webAISourceData/NonIOTInput
            headers: {
                'Content-type': 'application/json',
                'token': jwt
            },
            data: data
        }
        let res = await axios(config);
        return res.data
    } catch (err) {
        console.error(err);
        let { code, message } = err.response.data;
        if (code === 422) {
            alert(message)
        }
    }
}

export const createIotData = async (data) => {
    try {
        let config = {
            method: 'post',
            url: `https://${backEndDomain}/webapi/webAISourceData/IOTInput `,  //http://15.207.50.230:3001/webapi/webAISourceData/IOTInput
            headers: {
                'Content-type': 'application/json',
                'token': jwt
            },
            data: data
        }
        let res = await axios(config);
        return res.data
    } catch (err) {
        console.error(err);
        alert(err.message)
    }
}
export const updateIotData = async (data) => {
    try {
        let config = {
            method: 'post',
            url: `https://${backEndDomain}/webapi/webAISourceData/updateIOTInput `,  //http://15.207.50.230:3001/webapi/webAISourceData/IOTInput
            headers: {
                'Content-type': 'application/json',
                'token': jwt
            },
            data: data
        }
        let res = await axios(config);
        return res.data
    } catch (err) {
        console.error(err);
    }
}
export const updateNonIotData = async (data) => {
    try {
        let config = {
            method: 'post',
            url: `https://${backEndDomain}/webapi/webAISourceData/updateNonIOTInput `,  //http://15.207.50.230:3001/webapi/webAISourceData/NonIOTInput
            headers: {
                'Content-type': 'application/json',
                'token': jwt
            },
            data: data
        }
        let res = await axios(config);
        return res.data
    } catch (err) {
        console.error(err);
    }
}

export const aiResolutionPath = async (data) => {
    try {
        let config = {
            method: 'post',
            url: `https://${backEndDomain}/webapi/webAISourceData/Resolutionpath `,  //http://15.207.50.230:3001/webapi/webAISourceData/viewInputList?tenantId=GAINWELL_01
            data: data,
            headers: {
                'Content-type': 'application/json',
                'token': jwt
            }
        }
        let res = await axios(config)
        console.log("cc", res)
        // return res.data
    } catch (err) {
        console.error(err)
    }
};

export const smcscodelist = async (data) => {
    let body = {
        "SMCSComponentDescription": data
    }
    try {
        let config = {
            method: 'post',
            url: `https://${backEndDomain}/webapi/webuserInput/webSMCSComponent `,  //http://15.207.50.230:3001/webapi/webAISourceData/viewInputList?tenantId=GAINWELL_01
            data: body,
            headers: {
                'Content-type': 'application/json',
                'token': jwt
            }
        }
        let res = await axios(config)
        console.log("cc", res)
        return res.data
    } catch (err) {
        console.error(err)
    }
};


export const problemcodelist = async (data) => {
    let body = {
        "problemCodeDescription": data
    }
    try {
        let config = {
            method: 'post',
            url: `https://${backEndDomain}/webapi/webuserInput/webproblemCode `,  //http://15.207.50.230:3001/webapi/webAISourceData/viewInputList?tenantId=GAINWELL_01
            data: body,
            headers: {
                'Content-type': 'application/json',
                'token': jwt
            }
        }
        let res = await axios(config)
        return res.data
    } catch (err) {
        console.error(err)
    }
};




export const modellist = async (data) => {
    try {
        let config = {
            method: 'get',
            url: `https://${backEndDomain}/webapi/webAISourceData/modellist?tenantId=${TenantId}&model=${data} `,  //http://15.207.50.230:3001/webapi/webAISourceData/modellist?tenantId=GAINWELL_01&model=G
            headers: {
                'Content-type': 'application/json',
                'token': jwt
            }
        }
        let res = await axios(config)

        return res.data
    } catch (err) {
        console.error(err)
    }
}

export const prefixlist = async (data) => {
    try {
        let config = {
            method: 'get',
            url: `https://${backEndDomain}/webapi/webAISourceData/prefixlist?tenantId=${TenantId}&model=${data} `,  //http://15.207.50.230:3001/webapi/webAISourceData/prefixlist?tenantId=GAINWELL_01&model=G3306
            headers: {
                'Content-type': 'application/json',
                'token': jwt
            }
        }
        let res = await axios(config)

        return res.data
    } catch (err) {
        console.error(err)
    }
}

export const generalResolution = async (data) => {
    try {
        let config = {
            method: 'post',
            url: `https://${backEndDomain}/webapi/webAISourceData/generalResolution`, //http://15.207.50.230:3001/webapi/webAISourceData/generalResolution
            data: data,
            headers: {
                'Content-type': 'application/json',
                'token': jwt
            }
        }
        let res = await axios(config)

        return res.data
    } catch (err) {
        console.error(err)
    }
}

export const addinfodata = async (data) => {
    try {
        let config = {
            method: 'post',
            url: `https://${backEndDomain}/webapi/webAISourceData/addinfodata`, //http://15.207.50.230:3001/webapi/webAISourceData/addinfodata
            data: data,
            headers: {
                'Content-type': 'application/json',
                'token': jwt
            }
        }
        let res = await axios(config)

        return res.data
    } catch (err) {
        console.error(err)
    }
}

export const addinfostepdata = async (data) => {
    try {
        let config = {
            method: 'post',
            url: `https://${backEndDomain}/webapi/webAISourceData/addinfostepdata`, //http://15.207.50.230:3001/webapi/webAISourceData/addinfostepdata
            data: data,
            headers: {
                'Content-type': 'application/json',
                'token': jwt
            }
        }
        let res = await axios(config)

        return res.data
    } catch (err) {
        console.error(err)
    }
}

export const addinfosubstepdata = async (data) => {
    try {
        let config = {
            method: 'post',
            url: `https://${backEndDomain}/webapi/webAISourceData/addinfosubstepdata`, //http://15.207.50.230:3001/webapi/webAISourceData/addinfosubstepdata
            data: data,
            headers: {
                'Content-type': 'application/json',
                'token': jwt
            }
        }
        let res = await axios(config)

        return res.data
    } catch (err) {
        console.error(err)
    }
}

export const submit = async (data) => {
    try {
        let config = {
            method: 'put',
            url: `https://${backEndDomain}/webapi/webAISourceData/Submit`, //http://15.207.50.230:3001/webapi/webAISourceData/addBomdata
            data: data,
            headers: {
                'Content-type': 'application/json',
                'token': jwt
            }
        }
        let res = await axios(config)

        return res.data
    } catch (err) {
        console.error(err)
    }
}

export const addBomdata = async (data) => {
    try {
        let config = {
            method: 'post',
            url: `https://${backEndDomain}/webapi/webAISourceData/addBomdata`, //http://15.207.50.230:3001/webapi/webAISourceData/addBomdata
            data: data,
            headers: {
                'Content-type': 'application/json',
                'token': jwt
            }
        }
        let res = await axios(config)

        return res.data
    } catch (err) {
        console.error(err)
    }
}

export const updateBomdata = async (data) => {
    try {
        let config = {
            method: 'put',
            url: `https://${backEndDomain}/webapi/webAISourceData/updatebomdata`, //http://15.207.50.230:3001/webapi/webAISourceData/addBomdata
            data: data,
            headers: {
                'Content-type': 'application/json',
                'token': jwt
            }
        }
        let res = await axios(config)

        return res.data
    } catch (err) {
        console.error(err)
    }
}

export const updateAPI = async (apiname, data) => {
    try {
        let config = {
            method: 'put',
            url: `https://${backEndDomain}/webapi/webAISourceData/${apiname}`, //http://15.207.50.230:3001/webapi/webAISourceData/addBomdata
            data: data,
            headers: {
                'Content-type': 'application/json',
                'token': jwt
            }
        }
        let res = await axios(config)

        return res.data
    } catch (err) {
        console.error(err)
    }
}